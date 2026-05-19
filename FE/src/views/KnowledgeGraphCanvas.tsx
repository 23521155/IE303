'use client';
import { useEffect, useState } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    Handle,
    Position,
    useReactFlow,
    type Node,
    type Edge,
    type OnNodesChange,
    type OnEdgesChange,
    type NodeProps,
} from '@xyflow/react';

// Fits view once nodes are measured (custom nodes need a DOM paint cycle first)
function AutoFitView({ nodeCount }: { nodeCount: number }) {
    const { fitView } = useReactFlow();
    useEffect(() => {
        if (nodeCount === 0) return;
        const t = setTimeout(() => fitView({ padding: 0.18, duration: 300 }), 80);
        return () => clearTimeout(t);
    }, [nodeCount, fitView]);
    return null;
}

function getMasteryColor(score: number, attempts: number): string {
    if (attempts === 0) return '#6b7280';
    if (score >= 80) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
}

function KnowledgeCircleNode({ id, data, selected }: NodeProps) {
    const [hovered, setHovered] = useState(false);
    const { setNodes } = useReactFlow();
    const mastery   = data.mastery   as number;
    const attempts  = data.attempts  as number;
    const size      = (data.size as number) ?? 44;
    const color     = getMasteryColor(mastery, attempts);
    const fontSize  = size < 40 ? '8px' : size < 48 ? '9px' : '10px';
    const prereqFor = (data.prereqForNames as string[]) ?? [];
    const prereqOf  = (data.prereqOfNames  as string[]) ?? [];
    const hasTooltip = prereqFor.length > 0 || prereqOf.length > 0;

    const handleMouseEnter = () => {
        setHovered(true);
        setNodes((nds) => nds.map((n) => n.id === id ? { ...n, zIndex: 9999 } : n));
    };
    const handleMouseLeave = () => {
        setHovered(false);
        setNodes((nds) => nds.map((n) => n.id === id ? { ...n, zIndex: 0 } : n));
    };

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ opacity: 0, width: 1, height: 1, minWidth: 1, minHeight: 1, border: 'none' }}
                isConnectable={false}
            />
            <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: 84, position: 'relative' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Hover tooltip */}
                {hovered && hasTooltip && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 'calc(100% + 8px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(15,23,42,0.95)',
                            color: '#f1f5f9',
                            borderRadius: 8,
                            padding: '8px 11px',
                            minWidth: 160,
                            maxWidth: 240,
                            zIndex: 9999,
                            pointerEvents: 'none',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
                            fontSize: 10,
                            lineHeight: 1.5,
                            whiteSpace: 'normal',
                            textAlign: 'left',
                        }}
                    >
                        {prereqFor.length > 0 && (
                            <div style={{ marginBottom: prereqOf.length > 0 ? 6 : 0 }}>
                                <div style={{ color: '#a5b4fc', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>
                                    Điều kiện của
                                </div>
                                <div style={{ color: '#e2e8f0' }}>{prereqFor.join(' · ')}</div>
                            </div>
                        )}
                        {prereqOf.length > 0 && (
                            <div>
                                <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>
                                    Bị ảnh hưởng bởi
                                </div>
                                <div style={{ color: '#e2e8f0' }}>{prereqOf.join(' · ')}</div>
                            </div>
                        )}
                    </div>
                )}

                {/* Circle */}
                <div
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        background: color,
                        border: selected ? `2.5px solid rgba(0,0,0,0.45)` : `1.5px solid rgba(255,255,255,0.4)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize,
                        fontWeight: 700,
                        color: '#fff',
                        boxShadow: selected
                            ? `0 0 0 3px ${color}33, 0 3px 14px ${color}66`
                            : `0 2px 8px ${color}55, 0 1px 3px rgba(0,0,0,0.08)`,
                        transition: 'all 0.15s',
                        cursor: 'pointer',
                        flexShrink: 0,
                    }}
                >
                    {attempts > 0 ? `${Math.round(mastery)}%` : '—'}
                </div>

                {/* Label */}
                <div
                    style={{
                        fontSize: '8.5px',
                        fontWeight: 500,
                        color: '#1f2937',
                        textAlign: 'center',
                        width: '100%',
                        lineHeight: 1.25,
                        wordBreak: 'break-word',
                        opacity: 0.85,
                    }}
                >
                    {data.label as string}
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ opacity: 0, width: 1, height: 1, minWidth: 1, minHeight: 1, border: 'none' }}
                isConnectable={false}
            />
        </>
    );
}

const nodeTypes = { knowledge: KnowledgeCircleNode };

interface KnowledgeGraphCanvasProps {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onNodeClick: (event: React.MouseEvent, node: Node) => void;
}

export default function KnowledgeGraphCanvas({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
}: KnowledgeGraphCanvasProps) {
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            nodesConnectable={false}
            minZoom={0.06}
            maxZoom={2.5}
            style={{ background: '#ffffff' }}
        >
            <AutoFitView nodeCount={nodes.length} />
            <Background gap={28} size={0.8} color="#e5e7eb" />
            <Controls />
            <MiniMap
                nodeColor={(n) => {
                    const d = n.data as { mastery: number; attempts: number };
                    return getMasteryColor(d.mastery ?? 0, d.attempts ?? 0);
                }}
                style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
                maskColor="rgba(0,0,0,0.04)"
                nodeStrokeWidth={0}
            />
        </ReactFlow>
    );
}
