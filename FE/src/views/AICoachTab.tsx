'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
    useNodesState,
    useEdgesState,
    MarkerType,
    type Node,
    type Edge,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';

const KnowledgeGraphCanvas = dynamic(() => import('./KnowledgeGraphCanvas'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
            Loading graph…
        </div>
    ),
});
import {
    BrainCircuit,
    TrendingUp,
    TrendingDown,
    Target,
    ChevronRight,
    BarChart2,
    X,
    Loader2, Save,
    RotateCcw
} from 'lucide-react';
import Link from 'next/link';
import { BE_URL } from '../utils/constans';
import {AnalysisIcon} from "@/src/components/svg-icon/analysis";
import { CreateIcon } from '@/src/components/svg-icon/create';
import { PathIcon } from '@hugeicons/core-free-icons';
import { PathLearnIcon } from '@/src/components/svg-icon/path';

// ─── Shared types ──────────────────────────────────────────────────────────────

type AttemptListItem = {
    id: string;
    examId: string;
    examTitle: Record<string, string> | null;
    score: number;
    totalCorrect: number;
    questionCount: number;
    timeSpentSeconds: number;
    createdAt: string;
};

interface AICoachTabProps {
    t: any;
    lang: string;
    userId: string | null;
    completedCount: number;
    totalPracticeSeconds: number;
    recentAttempts: AttemptListItem[];
    summaryLoading: boolean;
}

// ─── API DTOs ─────────────────────────────────────────────────────────────────

interface NodeDTO {
    id: string;
    name: string;
    masteryScore: number;
    errorRate: number;
    totalAttempts: number;
    categoryName: string;
}

interface EdgeDTO {
    from: string;
    to: string;
    relation: string;
}

interface AnalysisData {
    nodes: NodeDTO[];
    edges: EdgeDTO[];
}

interface LearningPathResponse {
    learningPath: string;
    weakTopics: string[];
    prerequisitesToReview: string[];
    daysRemaining: number;
}

// ─── Graph helpers ────────────────────────────────────────────────────────────

function getMasteryColor(score: number, attempts: number): string {
    if (attempts === 0) return '#6b7280';
    if (score >= 80) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
}

// ─── Graph layout & builders ─────────────────────────────────────────────────

const NODE_W = 84;
const NODE_H = 88;
const LAYOUT_STORAGE_KEY = 'aicoach-graph-layout-v1';
const LEARNING_PATH_STORAGE_KEY = 'aicoach-path-v1';

type SavedPositions = Record<string, { x: number; y: number }>;

interface CachedPath {
    pathData: LearningPathResponse;
    daysRemaining: number;
    generatedAt: string; // ISO timestamp
}

function loadCachedPath(userId: string): CachedPath | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(`${LEARNING_PATH_STORAGE_KEY}-${userId}`);
        return raw ? (JSON.parse(raw) as CachedPath) : null;
    } catch {
        return null;
    }
}

function saveCachedPath(userId: string, data: LearningPathResponse, days: number): void {
    try {
        const entry: CachedPath = {
            pathData: data,
            daysRemaining: days,
            generatedAt: new Date().toISOString(),
        };
        localStorage.setItem(`${LEARNING_PATH_STORAGE_KEY}-${userId}`, JSON.stringify(entry));
    } catch {
        // quota exceeded — ignore
    }
}

function clearCachedPath(userId: string): void {
    try { localStorage.removeItem(`${LEARNING_PATH_STORAGE_KEY}-${userId}`); } catch {}
}

function loadSavedPositions(userId: string | null): SavedPositions | null {
    if (typeof window === 'undefined' || !userId) return null;
    try {
        const raw = localStorage.getItem(`${LAYOUT_STORAGE_KEY}-${userId}`);
        return raw ? (JSON.parse(raw) as SavedPositions) : null;
    } catch {
        return null;
    }
}

function saveLayoutPositions(userId: string, nodes: Node[]): void {
    const map: SavedPositions = {};
    nodes.forEach((n) => { map[n.id] = { x: n.position.x, y: n.position.y }; });
    try {
        localStorage.setItem(`${LAYOUT_STORAGE_KEY}-${userId}`, JSON.stringify(map));
    } catch {
        // quota exceeded — ignore
    }
}

function clearLayoutPositions(userId: string): void {
    try { localStorage.removeItem(`${LAYOUT_STORAGE_KEY}-${userId}`); } catch {}
}

function buildFlowNodes(
    nodes: NodeDTO[],
    edges: EdgeDTO[],
    savedPositions: SavedPositions | null,
): { flowNodes: Node[] } {
    // Degree (for node size)
    const adj = new Map<string, Set<string>>();
    nodes.forEach((n) => adj.set(n.id, new Set()));
    edges.forEach((e) => {
        adj.get(e.from)?.add(e.to);
        adj.get(e.to)?.add(e.from);
    });
    const degrees = new Map<string, number>();
    nodes.forEach((n) => degrees.set(n.id, adj.get(n.id)?.size ?? 0));

    // Prereq maps for hover tooltip
    const idToName = new Map(nodes.map((n) => [n.id, n.name]));
    const prereqFor = new Map<string, string[]>();
    const prereqOf  = new Map<string, string[]>();
    edges.forEach((e) => {
        if (e.relation !== 'PREREQUISITE') return;
        if (!prereqFor.has(e.from)) prereqFor.set(e.from, []);
        prereqFor.get(e.from)!.push(idToName.get(e.to) ?? e.to);
        if (!prereqOf.has(e.to)) prereqOf.set(e.to, []);
        prereqOf.get(e.to)!.push(idToName.get(e.from) ?? e.from);
    });

    // Dagre LR — only PREREQUISITE edges define the tree structure.
    // RELATED edges are semantic overlay (dashed lines) — they shouldn't pull node positions.
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 180, marginx: 60, marginy: 60, ranker: 'network-simplex' });
    g.setDefaultEdgeLabel(() => ({}));
    nodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
    edges.forEach((e) => {
        if (e.relation === 'PREREQUISITE') g.setEdge(e.from, e.to);
    });
    dagre.layout(g);

    const positions = new Map<string, { x: number; y: number }>();
    nodes.forEach((n) => {
        const dn = g.node(n.id);
        positions.set(n.id, dn ? { x: dn.x - NODE_W / 2, y: dn.y - NODE_H / 2 } : { x: 0, y: 0 });
    });

    const flowNodes: Node[] = nodes.map((n) => {
        const deg  = degrees.get(n.id) ?? 0;
        const size = Math.round(Math.max(34, Math.min(54, 34 + deg * 2.2)));
        const saved = savedPositions?.[n.id];
        const pos = saved ?? positions.get(n.id) ?? { x: 0, y: 0 };
        return {
            id: n.id,
            type: 'knowledge',
            position: pos,
            data: {
                label: n.name,
                mastery: n.masteryScore,
                attempts: n.totalAttempts,
                errorRate: n.errorRate,
                size,
                prereqForNames: prereqFor.get(n.id) ?? [],
                prereqOfNames:  prereqOf.get(n.id)  ?? [],
                dto: n,
            },
            width: NODE_W,
            height: NODE_H,
        } as Node;
    });

    return { flowNodes };
}

function buildFlowEdges(dtos: EdgeDTO[]): Edge[] {
    return dtos.map((e, i) => {
        const isPrereq = e.relation === 'PREREQUISITE';
        return {
            id: `e-${i}`,
            source: e.from,
            target: e.to,
            style: {
                stroke: isPrereq ? '#6366f1' : '#94a3b8',
                strokeWidth: isPrereq ? 1.2 : 1,
                opacity: isPrereq ? 0.75 : 0.5,
                strokeDasharray: isPrereq ? undefined : '5 4',
            },
            markerEnd: isPrereq
                ? { type: MarkerType.ArrowClosed, color: '#6366f1', width: 10, height: 10 }
                : undefined,
        };
    });
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
    const pct = Math.min(Math.max(value, 0), 100);
    return (
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}

function LoadingState({ t }: { t: any }) {
    return <p className="text-sm text-muted-foreground py-8 text-center">{t.loading}</p>;
}

function EmptyState({ lang, t }: { lang: string; t: any }) {
    return (
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden">
            <div className="px-5 py-4 bg-primary/[0.06] dark:bg-primary/[0.1] border-b border-primary/10 dark:border-primary/[0.12] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 dark:bg-primary/20 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm font-semibold text-secondary dark:text-foreground">
                    {lang === 'ja' ? '受験履歴がありません' : lang === 'en' ? 'No exam history yet' : 'Chưa có lịch sử thi'}
                </p>
            </div>
            <div className="px-5 py-4">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {lang === 'en'
                        ? 'Complete your first exam to unlock your AI Coach analysis.'
                        : lang === 'ja'
                        ? '最初の試験を受けてAIコーチの分析を解放しましょう。'
                        : 'Hoàn thành bài thi đầu tiên để mở khóa phân tích AI Coach.'}
                </p>
                <Link
                    href={`/${lang}/exams`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                    {t.exploreExams ?? 'Khám phá đề thi'} <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

// ─── Node detail panel ────────────────────────────────────────────────────────

interface NodeDetailPanelProps {
    node: NodeDTO;
    explainText: string;
    explainLoading: boolean;
    explainStreaming: boolean;
    onExplain: () => void;
    onClose: () => void;
    lang: string;
}

function NodeDetailPanel({ node, explainText, explainLoading, explainStreaming, onExplain, onClose, lang }: NodeDetailPanelProps) {
    const color = getMasteryColor(node.masteryScore, node.totalAttempts);
    const busy = explainLoading || explainStreaming;

    const [displayText, setDisplayText] = useState('');
    const targetRef = useRef('');
    const cursorRef = useRef(0);
    const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Reset typewriter when switching nodes
    useEffect(() => {
        cursorRef.current = 0;
        targetRef.current = '';
        setDisplayText('');
        if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; }
    }, [node.id]);

    // Typewriter effect — reveals text at ~300 chars/s
    useEffect(() => {
        targetRef.current = explainText;
        if (!explainText) {
            cursorRef.current = 0;
            setDisplayText('');
            return;
        }
        const tick = () => {
            if (cursorRef.current >= targetRef.current.length) {
                animRef.current = null;
                return;
            }
            cursorRef.current = Math.min(cursorRef.current + 5, targetRef.current.length);
            setDisplayText(targetRef.current.slice(0, cursorRef.current));
            animRef.current = setTimeout(tick, 16);
        };
        tick();
        return () => {
            if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; }
        };
    }, [explainText]);

    const isTyping = displayText.length < explainText.length;

    return (
        <div className="w-72 border border-[rgba(0,0,0,0.08)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] rounded-xl p-4 shrink-0 space-y-4 overflow-y-auto max-h-[600px]">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-0.5 truncate">
                        {node.categoryName}
                    </p>
                    <p className="text-sm font-semibold text-foreground leading-snug">{node.name}</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded hover:bg-muted transition-colors shrink-0"
                >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
            </div>

            {/* Mastery bar */}
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                        {lang === 'en' ? 'Mastery' : 'Thành thạo'}
                    </span>
                    <span className="font-mono text-xs font-medium" style={{ color }}>
                        {node.totalAttempts === 0 ? '—' : `${Math.round(node.masteryScore)}%`}
                    </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all"
                        style={{
                            width: `${node.totalAttempts === 0 ? 0 : node.masteryScore}%`,
                            background: color,
                        }}
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                    {node.totalAttempts === 0
                        ? lang === 'en'
                            ? 'No attempts yet'
                            : 'Chưa làm bài'
                        : `${node.totalAttempts} ${lang === 'en' ? 'attempts' : 'lần thử'} · ${Math.round(node.errorRate)}% ${lang === 'en' ? 'error rate' : 'tỷ lệ sai'}`}
                </p>
            </div>

            {/* Explain button */}
            <button
                type="button"
                onClick={onExplain}
                disabled={busy}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium disabled:opacity-50"
            >
                {busy ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                    <BrainCircuit className="w-3.5 h-3.5" />
                )}
                {lang === 'en' ? 'AI Explain' : 'AI Giải thích'}
            </button>

            {/* Streaming explanation */}
            {(explainText || explainLoading) && (
                <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-1.5">
                        {lang === 'en' ? 'Analysis' : 'Phân tích'}
                    </p>
                    {explainLoading && !explainText ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="w-3 h-3 animate-spin shrink-0" />
                            <span>{lang === 'en' ? 'Analyzing…' : 'Đang phân tích…'}</span>
                        </div>
                    ) : (
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                            {displayText}
                            {(explainStreaming || isTyping) && (
                                <span className="inline-block w-0.5 h-3.5 bg-primary animate-pulse ml-0.5 align-middle" />
                            )}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── AICoachGraphTab ──────────────────────────────────────────────────────────

export function AICoachGraphTab({
    t,
    lang,
    userId,
    summaryLoading,
}: AICoachTabProps) {
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [graphLoading, setGraphLoading] = useState(false);
    const [graphError, setGraphError] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<NodeDTO | null>(null);
    const [explainText, setExplainText] = useState('');
    const [explainLoading, setExplainLoading] = useState(false);
    const [explainStreaming, setExplainStreaming] = useState(false);
    const explainAbortRef = useRef<AbortController | null>(null);

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [savedToast, setSavedToast] = useState<string | null>(null);
    const [hasInitialized, setHasInitialized] = useState(false);

    const fetchAnalysis = useCallback(() => {
        if (!userId) return;
        setGraphLoading(true);
        setGraphError(null);
        fetch(`${BE_URL}/api/coach/${userId}/analysis`, { credentials: 'include' })
            .then(async (res) => {
                if (!res.ok) throw new Error(String(res.status));
                const json = await res.json();
                return (json?.data ?? json) as AnalysisData;
            })
            .then((data) => {
                setAnalysis(data);
                const saved = loadSavedPositions(userId);
                const { flowNodes } = buildFlowNodes(data.nodes, data.edges, saved);
                setNodes(flowNodes);
                setEdges(buildFlowEdges(data.edges));
            })
            .catch(() => setGraphError('failed'))
            .finally(() => setGraphLoading(false));
    }, [userId, setNodes, setEdges]);

    // On mount, check whether the user has drawn the graph before — if yes, auto-load.
    useEffect(() => {
        if (!userId) return;
        const initFlag = typeof window !== 'undefined'
            ? localStorage.getItem(`aicoach-graph-initialized-${userId}`) === '1'
            : false;
        if (initFlag) {
            setHasInitialized(true);
            fetchAnalysis();
        }
    }, [userId, fetchAnalysis]);

    const handleDrawGraph = useCallback(() => {
        if (!userId) return;
        try { localStorage.setItem(`aicoach-graph-initialized-${userId}`, '1'); } catch {}
        setHasInitialized(true);
        fetchAnalysis();
    }, [userId, fetchAnalysis]);

    const handleSaveLayout = useCallback(() => {
        if (!userId) return;
        saveLayoutPositions(userId, nodes);
        setSavedToast(lang === 'en' ? 'Layout saved' : 'Đã lưu layout');
        setTimeout(() => setSavedToast(null), 1800);
    }, [userId, nodes, lang]);

    const handleResetLayout = useCallback(() => {
        if (!userId || !analysis) return;
        clearLayoutPositions(userId);
        const { flowNodes } = buildFlowNodes(analysis.nodes, analysis.edges, null);
        setNodes(flowNodes);
        setSavedToast(lang === 'en' ? 'Layout reset' : 'Đã reset layout');
        setTimeout(() => setSavedToast(null), 1800);
    }, [userId, analysis, setNodes, lang]);

    const handleNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
            explainAbortRef.current?.abort();
            explainAbortRef.current = null;
            const dto = (node.data as { dto: NodeDTO }).dto;
            setSelectedNode(dto);
            setExplainText('');
            setExplainLoading(false);
            setExplainStreaming(false);
        },
        [],
    );

    const handleExplain = useCallback(async () => {
        if (!selectedNode || !userId) return;

        explainAbortRef.current?.abort();
        const controller = new AbortController();
        explainAbortRef.current = controller;

        setExplainText('');
        setExplainLoading(true);
        setExplainStreaming(true);

        try {
            const res = await fetch(
                `${BE_URL}/api/coach/node/${selectedNode.id}/explain/stream?userId=${userId}`,
                { credentials: 'include', signal: controller.signal },
            );

            if (!res.ok || !res.body) throw new Error(String(res.status));

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // Parse SSE lines: split on newline, handle multi-line data events
                while (true) {
                    const idx = buffer.indexOf('\n');
                    if (idx === -1) break;
                    const line = buffer.slice(0, idx);
                    buffer = buffer.slice(idx + 1);
                    if (line.startsWith('data: ')) {
                        const chunk = line.slice(6);
                        setExplainLoading(false);
                        setExplainText((prev) => prev + chunk);
                    }
                }
            }
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                // silently fail — user can retry
            }
        } finally {
            setExplainLoading(false);
            setExplainStreaming(false);
        }
    }, [selectedNode, userId]);

    if (!userId || summaryLoading || graphLoading) {
        return <LoadingState t={t} />;
    }

    if (graphError) {
        return (
            <div className="border border-border/60 rounded-lg p-6 text-center text-sm text-destructive">
                {lang === 'en' ? 'Failed to load knowledge graph.' : 'Không thể tải knowledge graph.'}
            </div>
        );
    }

    // First-time visit: don't auto-render. Show "Draw Graph" button.
    if (!hasInitialized && !analysis) {
        return (
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden">
                <div className="px-5 py-4 bg-primary/[0.06] dark:bg-primary/[0.1] border-b border-primary/10 dark:border-primary/[0.12] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 dark:bg-primary/20 flex items-center justify-center shrink-0">
                        <BarChart2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-secondary dark:text-foreground">
                        {lang === 'en' ? 'Generate your knowledge graph' : 'Tạo Knowledge Graph của bạn'}
                    </p>
                </div>
                <div className="px-5 py-5 flex flex-col items-center text-center">
                    <p className="text-sm text-muted-foreground max-w-md mb-5 leading-relaxed">
                        {lang === 'en'
                            ? 'Analyze your exam history to visualize mastery across topics. The graph builds once — afterwards it loads automatically.'
                            : 'Phân tích lịch sử làm bài để vẽ bản đồ mastery theo chủ đề. Sau lần đầu, graph sẽ tự load mỗi lần truy cập.'}
                    </p>
                    <button
                        type="button"
                        onClick={handleDrawGraph}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                        <BrainCircuit className="w-4 h-4" />
                        {lang === 'en' ? 'Draw Graph' : 'Vẽ Graph'}
                    </button>
                </div>
            </div>
        );
    }

    const NODE_LEGEND = [
        { color: '#22c55e', label: lang === 'en' ? '≥80% Mastered' : '≥80% Thành thạo' },
        { color: '#f59e0b', label: lang === 'en' ? '40–79% Learning' : '40–79% Đang học' },
        { color: '#ef4444', label: lang === 'en' ? '<40% Weak' : '<40% Yếu' },
        { color: '#6b7280', label: lang === 'en' ? 'Not attempted' : 'Chưa làm' },
    ];

    return (
        <div>
            {/* ── Toolbar ── */}
            <div className="sticky top-[100px] z-20 px-4 lg:px-6 py-2 bg-[#fef8f4] dark:bg-muted/[0.08] border-b border-border">
                <div className="flex items-center justify-between gap-3">
                    {/* Left: legend — wraps on small screens */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 min-w-0">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <svg width="20" height="8" viewBox="0 0 26 10">
                                    <line x1="0" y1="5" x2="18" y2="5" stroke="#6366f1" strokeWidth="1.5" />
                                    <polygon points="18,2 26,5 18,8" fill="#6366f1" />
                                </svg>
                                <span className="text-xs text-muted-foreground">{lang === 'en' ? 'Prerequisite' : 'Tiên quyết'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg width="18" height="8" viewBox="0 0 24 10">
                                    <line x1="0" y1="5" x2="24" y2="5" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
                                </svg>
                                <span className="text-xs text-muted-foreground">{lang === 'en' ? 'Related' : 'Liên quan'}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {NODE_LEGEND.map(({ color, label }) => (
                                <div key={color} className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                                    <span className="text-xs text-muted-foreground">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right: stats + actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {savedToast && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{savedToast}</span>
                        )}
                        <span className="hidden sm:block font-mono text-[0.65rem] text-muted-foreground tabular-nums">
                            {analysis?.nodes.length ?? 0} · {analysis?.edges.length ?? 0}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={fetchAnalysis}
                                className="cursor-pointer flex items-center gap-1 h-7 px-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-md bg-background/70 hover:bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
                            >
                                <AnalysisIcon className="w-3 h-3" />
                                <span className="hidden md:inline">{lang === 'en' ? 'Re-analyze' : 'Phân tích lại'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveLayout}
                                className="cursor-pointer flex items-center gap-1 h-7 px-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-md bg-background/70 hover:bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
                            >
                                <Save className="w-3 h-3" />
                                <span className="hidden md:inline">{lang === 'en' ? 'Save' : 'Lưu'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleResetLayout}
                                className="cursor-pointer flex items-center gap-1 h-7 px-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-md bg-background/70 hover:bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
                            >
                                <RotateCcw className="w-3 h-3" />
                                <span className="hidden md:inline">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-4 px-4 lg:px-6 py-4">

                {/* Graph + detail panel */}
                <div className="flex gap-4 items-start">
                    {/* React Flow canvas */}
                    <div
                        className="flex-1 border border-border/60 rounded-lg"
                        style={{ height: 600, position: 'relative' }}
                    >
                        <KnowledgeGraphCanvas
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onNodeClick={handleNodeClick}
                        />
                    </div>

                    {/* Node detail panel */}
                    {selectedNode && (
                        <NodeDetailPanel
                            node={selectedNode}
                            explainText={explainText}
                            explainLoading={explainLoading}
                            explainStreaming={explainStreaming}
                            onExplain={handleExplain}
                            onClose={() => {
                                explainAbortRef.current?.abort();
                                explainAbortRef.current = null;
                                setSelectedNode(null);
                                setExplainText('');
                                setExplainLoading(false);
                                setExplainStreaming(false);
                            }}
                            lang={lang}
                        />
                    )}
                </div>
            </div>
        </div>

    );
}

// ─── AICoachPathTab ───────────────────────────────────────────────────────────

export function AICoachPathTab({ t, lang, userId, summaryLoading }: AICoachTabProps) {
    const [daysRemaining, setDaysRemaining] = useState(14);
    const [pathData, setPathData] = useState<LearningPathResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedAt, setGeneratedAt] = useState<string | null>(null);
    const [fromCache, setFromCache] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        if (!userId) return;
        const cached = loadCachedPath(userId);
        if (cached) {
            setPathData(cached.pathData);
            setDaysRemaining(cached.daysRemaining);
            setGeneratedAt(cached.generatedAt);
            setFromCache(true);
        }
    }, [userId]);

    // Typewriter — skip animation when loading from cache
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const targetRef = useRef('');
    const cursorRef = useRef(0);
    const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const text = pathData?.learningPath ?? '';
        targetRef.current = text;
        cursorRef.current = 0;
        if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; }
        if (!text) { setDisplayText(''); setIsTyping(false); return; }
        // Skip typewriter for cached data — show immediately
        if (fromCache) {
            setDisplayText(text);
            setIsTyping(false);
            return;
        }
        setDisplayText('');
        setIsTyping(true);
        const tick = () => {
            if (cursorRef.current >= targetRef.current.length) {
                animRef.current = null;
                setIsTyping(false);
                return;
            }
            cursorRef.current = Math.min(cursorRef.current + 5, targetRef.current.length);
            setDisplayText(targetRef.current.slice(0, cursorRef.current));
            animRef.current = setTimeout(tick, 16);
        };
        tick();
        return () => { if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; } };
    }, [pathData?.learningPath, fromCache]);

    const generate = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        setPathData(null);
        setFromCache(false);
        try {
            const res = await fetch(
                `${BE_URL}/api/coach/${userId}/learning-path?daysRemaining=${daysRemaining}`,
                { credentials: 'include' },
            );
            if (!res.ok) throw new Error(String(res.status));
            const json = await res.json();
            const data = (json?.data ?? json) as LearningPathResponse;
            setPathData(data);
            setGeneratedAt(new Date().toISOString());
            saveCachedPath(userId, data, daysRemaining);
        } catch {
            setError('failed');
        } finally {
            setLoading(false);
        }
    }, [userId, daysRemaining]);

    if (summaryLoading || !userId) return <LoadingState t={t} />;

    const lbl = (vi: string, en: string, ja: string) =>
        lang === 'en' ? en : lang === 'ja' ? ja : vi;

    const localeTag = { vi: 'vi-VN', ja: 'ja-JP' }[lang] ?? 'en-US';
    const weakTopics = pathData?.weakTopics ?? [];
    const prerequisites = pathData?.prerequisitesToReview ?? [];

    const cacheLabel = generatedAt
        ? new Date(generatedAt).toLocaleString(localeTag, {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
          })
        : null;

    return (
        <div className="space-y-6">
            {/* ── Controls ── */}
            <div className="flex items-center gap-4 flex-wrap border border-border/60 rounded-xl px-5 py-3.5 bg-muted/[0.2] dark:bg-muted/[0.06]">
                <div className="flex items-center gap-3">
                    <label className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground shrink-0 whitespace-nowrap">
                        {lbl('Ngày còn lại', 'Days Remaining', '残り日数')}
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={365}
                        value={daysRemaining}
                        onChange={(e) =>
                            setDaysRemaining(Math.max(1, Math.min(365, Number(e.target.value))))
                        }
                        className="w-20 h-8 px-2 text-sm border border-border/60 rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 tabular-nums"
                    />
                </div>
                <button
                    type="button"
                    onClick={generate}
                    disabled={loading}
                    className="flex cursor-pointer items-center gap-1 h-8 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        <CreateIcon className="w-3.5 h-3.5" />
                    )}
                    {fromCache
                        ? lbl('Tạo lại', 'Regenerate', '再生成')
                        : lbl('Tạo lộ trình', 'Generate', 'パスを生成')}
                </button>
                {fromCache && pathData && (
                    <button
                        type="button"
                        onClick={() => {
                            clearCachedPath(userId);
                            setPathData(null);
                            setGeneratedAt(null);
                            setFromCache(false);
                            setDisplayText('');
                        }}
                        className="flex items-center gap-1.5 h-8 px-3 rounded-md text-sm text-muted-foreground border border-border/60 hover:text-destructive hover:border-destructive/40 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                        {lbl('Xoá cache', 'Clear', 'キャッシュ削除')}
                    </button>
                )}
                {cacheLabel && (
                    <span className="font-mono text-[0.65rem] text-muted-foreground/70 tabular-nums">
                        {lbl('Cập nhật', 'Updated', '更新')} {cacheLabel}
                    </span>
                )}
            </div>

            {/* ── Error ── */}
            {error && (
                <div className="border border-destructive/40 rounded-lg p-4 text-sm text-destructive">
                    {lbl(
                        'Không thể tải lộ trình học.',
                        'Failed to load learning path.',
                        '学習パスの読み込みに失敗しました。',
                    )}
                </div>
            )}

            {/* ── Loading ── */}
            {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lbl('AI đang tạo lộ trình…', 'AI is generating your path…', 'AIがパスを生成中…')}</span>
                </div>
            )}

            {/* ── Results ── */}
            {!loading && pathData && (
                <>
                    {weakTopics.length === 0 ? (
                        <div className="border border-border/60 rounded-lg p-6 flex items-start gap-3">
                            <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground">
                                {lbl(
                                    'Xuất sắc! Không có chủ đề yếu nào. Hãy thử các đề thi khó hơn.',
                                    'Excellent! No weak topics found. Challenge yourself with harder exam sets.',
                                    '素晴らしい！弱点トピックはありません。より難しい試験に挑戦してください。',
                                )}
                            </p>
                        </div>
                    ) : (
                        <>
                            <section>
                                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                                    {lbl('Chủ đề yếu', 'Weak Topics', '弱点トピック')}
                                    <span className="ml-1.5 text-destructive">
                                        ({weakTopics.length})
                                    </span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {weakTopics.map((topic) => (
                                        <span
                                            key={topic}
                                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {prerequisites.length > 0 && (
                                <section>
                                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                                        {lbl('Tiên quyết cần ôn', 'Prerequisites to Review', '復習すべき前提条件')}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {prerequisites.map((topic) => (
                                            <span
                                                key={topic}
                                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section>
                                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                                    {lbl('Lộ trình học AI', 'AI Study Plan', 'AI学習プラン')}
                                    <span className="ml-1.5 normal-case font-normal text-muted-foreground/60">
                                        — {pathData.daysRemaining} {lbl('ngày', 'days', '日')}
                                    </span>
                                </p>
                                <div className="rounded-xl p-5 bg-primary/[0.04] dark:bg-primary/[0.07] border border-primary/15 dark:border-primary/20">
                                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                        {displayText}
                                        {isTyping && (
                                            <span className="inline-block w-0.5 h-3.5 bg-primary animate-pulse ml-0.5 align-middle" />
                                        )}
                                    </p>
                                </div>
                            </section>
                        </>
                    )}
                </>
            )}

            {/* ── Initial CTA ── */}
            {!loading && !pathData && !error && (
                <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden">
                    <div className="px-5 py-4 bg-primary/[0.06] dark:bg-primary/[0.1] border-b border-primary/10 dark:border-primary/[0.12] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/15 dark:bg-primary/20 flex items-center justify-center shrink-0">
                            <PathLearnIcon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-secondary dark:text-foreground">
                            {lbl('Lộ trình học cá nhân hóa', 'Personalized Study Plan', '個人学習プラン')}
                        </p>
                    </div>
                    <div className="px-5 py-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {lbl(
                                'AI phân tích điểm yếu và đề xuất lộ trình phù hợp với số ngày còn lại của bạn.',
                                'AI analyzes your weak topics and builds a study plan tailored to your remaining days.',
                                'AIが弱点を分析し、残り日数に合わせた学習プランを作成します。',
                            )}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── AICoachInsightTab ────────────────────────────────────────────────────────

export function AICoachInsightTab({
    t,
    lang,
    completedCount,
    totalPracticeSeconds,
    recentAttempts,
    summaryLoading,
}: AICoachTabProps) {
    if (summaryLoading) return <LoadingState t={t} />;

    const hasData = completedCount > 0 && recentAttempts.length > 0;

    const avgAccuracy = hasData
        ? Math.round(
              recentAttempts.reduce(
                  (sum, a) =>
                      sum + (a.questionCount > 0 ? (a.totalCorrect / a.questionCount) * 100 : 0),
                  0,
              ) / recentAttempts.length,
          )
        : 0;

    const trendDelta =
        hasData && recentAttempts.length >= 2
            ? (() => {
                  const oldest = recentAttempts[recentAttempts.length - 1];
                  const newest = recentAttempts[0];
                  const oldAcc =
                      oldest.questionCount > 0
                          ? (oldest.totalCorrect / oldest.questionCount) * 100
                          : 0;
                  const newAcc =
                      newest.questionCount > 0
                          ? (newest.totalCorrect / newest.questionCount) * 100
                          : 0;
                  return Math.round(newAcc - oldAcc);
              })()
            : null;

    const totalHours = Math.round((totalPracticeSeconds / 3600) * 10) / 10;

    return (
        <div className="space-y-8">
            {!hasData ? (
                <EmptyState lang={lang} t={t} />
            ) : (
                <>
                    {/* ── Performance ── */}
                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'Performance' : lang === 'ja' ? 'パフォーマンス' : 'Hiệu suất'}
                        </p>
                        <div className="border border-[rgba(0,0,0,0.08)] dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a]">
                            {/* Accuracy + trend */}
                            <div className="px-5 py-4 border-b border-border/40">
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="text-sm text-foreground">
                                        {lang === 'en' ? 'Average accuracy' : lang === 'ja' ? '平均正答率' : 'Độ chính xác'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                                            {avgAccuracy}%
                                        </span>
                                        {trendDelta !== null && (
                                            <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md ${
                                                trendDelta >= 0
                                                    ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40'
                                                    : 'text-destructive bg-destructive/10'
                                            }`}>
                                                {trendDelta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                {trendDelta >= 0 ? '+' : ''}{trendDelta}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <ProgressBar value={avgAccuracy} />
                            </div>
                            {/* Stats grid */}
                            <div className="grid grid-cols-2 divide-x divide-border/40">
                                <div className="px-5 py-4">
                                    <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">
                                        {t.completedExams ?? 'Completed'}
                                    </p>
                                    <p className="text-2xl font-bold tabular-nums text-secondary dark:text-foreground leading-none">
                                        {completedCount}
                                    </p>
                                </div>
                                <div className="px-5 py-4">
                                    <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">
                                        {lang === 'en' ? 'Study Time' : lang === 'ja' ? '学習時間' : 'Thời gian học'}
                                    </p>
                                    <p className="text-2xl font-bold tabular-nums text-secondary dark:text-foreground leading-none">
                                        {totalHours}h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Recent attempts ── */}
                    {recentAttempts.length > 0 && (
                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'Recent Attempts' : lang === 'ja' ? '最近の受験' : 'Lần thi gần đây'}
                        </p>
                        <div className="border border-[rgba(0,0,0,0.08)] dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a] divide-y divide-border/40">
                            {recentAttempts.slice(0, 5).map((attempt) => {
                                const acc = attempt.questionCount > 0
                                    ? Math.round((attempt.totalCorrect / attempt.questionCount) * 100)
                                    : 0;
                                const title = attempt.examTitle?.[lang] ?? attempt.examTitle?.vi ?? attempt.examTitle?.en ?? 'Exam';
                                const dateStr = new Date(attempt.createdAt).toLocaleDateString(
                                    lang === 'vi' ? 'vi-VN' : lang === 'ja' ? 'ja-JP' : 'en-US',
                                    { month: 'short', day: 'numeric' },
                                );
                                return (
                                    <div key={attempt.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                                        <p className="text-sm text-foreground truncate min-w-0">{title}</p>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className={`font-mono text-sm font-semibold tabular-nums ${
                                                acc >= 70
                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                    : acc >= 40
                                                    ? 'text-amber-600 dark:text-amber-400'
                                                    : 'text-destructive'
                                            }`}>{acc}%</span>
                                            <span className="text-xs text-muted-foreground tabular-nums">{dateStr}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    )}

                </>
            )}
        </div>
    );
}
