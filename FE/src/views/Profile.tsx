'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    LogOut,
    User,
    History,
    BrainCircuit,
    Home,
    PanelLeft,
    BarChart2,
    Map,
    Lightbulb,
    ChevronRight,
    ChevronsUpDown,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useMe } from '@/src/hooks/useMe';
import { BE_URL } from '../utils/constans';
import { logoutAction } from '@/src/actions/authActions';
import { ProfileTab } from './ProfileTab';
import { HistoryTab } from './HistoryTab';
import { AICoachGraphTab, AICoachPathTab, AICoachInsightTab } from './AICoachTab';
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarInset,
    useSidebar,
} from '@/components/animate-ui/components/radix/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/src/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';

// ─── Types ───────────────────────────────────────────────────────────────────

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

type ProfileSummary = {
    completedCount: number;
    totalPracticeSeconds: number;
    recentAttempts: AttemptListItem[];
};

type ProfileApiUser = {
    id: number;
    name: string;
    phoneNumber?: string | null;
    currentStatus?: string | null;
    email?: string | null;
    createdAt?: string | null;
};

type TabId = 'profile' | 'history' | 'coach/graph' | 'coach/path' | 'coach/insight';

// ─── Config ──────────────────────────────────────────────────────────────────

const COACH_SUB: { id: TabId; icon: React.ElementType; label: string }[] = [
    { id: 'coach/graph', icon: BarChart2, label: 'Graph' },
    { id: 'coach/path', icon: Map, label: 'Path' },
    { id: 'coach/insight', icon: Lightbulb, label: 'Insight' },
];

const NAV_ITEMS: { id: TabId; icon: React.ElementType; label: string }[] = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'history', icon: History, label: 'History' },
];

const TAB_VARIANTS = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
};

const TAB_TRANSITION = { duration: 0.15, ease: 'easeOut' } as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function avatarFromName(name: string) {
    const seed = encodeURIComponent(name.trim() || '?');
    return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

function getInitials(name: string) {
    return name
        .trim()
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function formatPracticeHours(totalSeconds: number) {
    return `${Math.round((totalSeconds / 3600) * 10) / 10}h`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function LogoTrigger() {
    const { toggleSidebar } = useSidebar();
    return (
        <>
            <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:hidden">
                <Image
                    src="/itShikenLogo.png"
                    alt="ITShiken"
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain dark:hidden"
                />
                <Image
                    src="/itShikenLogo-darkMode.png"
                    alt="ITShiken"
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain hidden dark:block"
                />
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors cursor-pointer shrink-0"
                    aria-label="Toggle sidebar"
                >
                    <PanelLeft className="w-4 h-4 text-sidebar-foreground/60" />
                </button>
            </div>
            <button
                type="button"
                onClick={toggleSidebar}
                className="relative hidden group-data-[collapsible=icon]:flex items-center justify-center cursor-pointer rounded-md group/logo-collapsed"
                aria-label="Toggle sidebar"
            >
                <Image
                    src="/is.png"
                    alt="ITShiken"
                    width={20}
                    height={20}
                    className="object-contain transition-opacity duration-200 group-hover/logo-collapsed:opacity-0"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/logo-collapsed:opacity-100 transition-opacity duration-200">
                    <PanelLeft className="w-4 h-4 text-sidebar-foreground" />
                </div>
            </button>
        </>
    );
}

function Breadcrumb({ activeTab, setActiveTab }: { activeTab: TabId; setActiveTab: (t: TabId) => void }) {
    const isCoach = activeTab.startsWith('coach/');
    const badge = {
        'coach/graph': 'Graph',
        'coach/path': 'Path',
        'coach/insight': 'Insight',
        history: 'History',
        profile: 'Profile',
    }[activeTab];

    return (
        <div>
            {isCoach && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('coach/graph')}
                        className="hover:text-foreground transition-colors duration-150 cursor-pointer"
                    >
                        AI Coach
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
                    <span className="text-foreground/70">{badge}</span>
                </div>
            )}
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mb-2">
                {badge}
            </div>
            <h2 className="text-xl font-bold tracking-tight text-secondary dark:text-foreground">
                {isCoach ? 'AI Coach' : badge}
            </h2>
        </div>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function Profile({ t, lang }: { t: any; lang: string }) {
    const params = useParams<{ lang?: string; id?: string | string[] }>();
    const router = useRouter();
    const { setUser } = useMe();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    const [activeTab, setActiveTab] = useState<TabId>('profile');
    const [summary, setSummary] = useState<ProfileSummary | null>(null);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [summaryError, setSummaryError] = useState<string | null>(null);
    const [profileUser, setProfileUser] = useState<ProfileApiUser | null>(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);

    const isMyProfile = !id || id === 'me';
    const numericUserId = typeof id === 'string' && /^\d+$/.test(id) ? Number.parseInt(id, 10) : null;

    // Load profile user
    useEffect(() => {
        let cancelled = false;
        async function load() {
            setProfileLoading(true);
            setProfileError(null);
            try {
                if (isMyProfile) {
                    const res = await fetch(`${BE_URL}/api/users/me`, { credentials: 'include' });
                    const json = (await res.json().catch(() => ({}))) as { data?: ProfileApiUser };
                    if (cancelled) return;
                    if (res.status === 401) {
                        setProfileUser(null);
                        setProfileError('unauthorized');
                        return;
                    }
                    if (!res.ok) throw new Error(String(res.status));
                    setProfileUser(json.data ?? null);
                    if (json.data) setUser(json.data);
                    return;
                }
                if (numericUserId === null) {
                    setProfileUser(null);
                    setProfileError('invalid-id');
                    return;
                }
                const res = await fetch(`${BE_URL}/api/users/${numericUserId}`, { credentials: 'include' });
                const json = (await res.json().catch(() => ({}))) as { data?: ProfileApiUser };
                if (cancelled) return;
                if (!res.ok) throw new Error(String(res.status));
                setProfileUser(json.data ?? null);
            } catch {
                if (!cancelled) {
                    setProfileError('failed');
                    setProfileUser(null);
                }
            } finally {
                if (!cancelled) setProfileLoading(false);
            }
        }
        void load();
        return () => {
            cancelled = true;
        };
    }, [isMyProfile, id, numericUserId, setUser]);

    // Load summary
    useEffect(() => {
        let cancelled = false;
        const path = isMyProfile
            ? '/api/attempts/me/summary'
            : `/api/attempts/users/${encodeURIComponent(id!)}/summary`;
        async function load() {
            setSummaryLoading(true);
            setSummaryError(null);
            try {
                const res = await fetch(`${BE_URL}${path}`, { credentials: 'include' });
                if (cancelled) return;
                if (isMyProfile && res.status === 401) {
                    setSummary({ completedCount: 0, totalPracticeSeconds: 0, recentAttempts: [] });
                    return;
                }
                if (!res.ok) throw new Error(String(res.status));
                const json = await res.json();
                setSummary(json.data ?? json);
            } catch {
                if (!cancelled) {
                    setSummaryError('failed');
                    setSummary({ completedCount: 0, totalPracticeSeconds: 0, recentAttempts: [] });
                }
            } finally {
                if (!cancelled) setSummaryLoading(false);
            }
        }
        void load();
        return () => {
            cancelled = true;
        };
    }, [isMyProfile, id]);

    // Derived display values
    const localeTag = { vi: 'vi-VN', ja: 'ja-JP' }[lang] ?? 'en-US';
    const displayName = profileLoading ? '…' : profileUser?.name ?? '—';
    const displayEmail = profileLoading ? '…' : profileUser?.email?.trim() || (isMyProfile ? '—' : '');
    const displayPhone = profileLoading ? '…' : profileUser?.phoneNumber?.trim() || (isMyProfile ? '—' : '');
    const joinedStr = profileLoading
        ? '…'
        : profileUser?.createdAt
        ? new Date(profileUser.createdAt).toLocaleDateString(localeTag)
        : '—';
    const avatarSrc = avatarFromName(profileLoading && !profileUser ? '?' : profileUser?.name?.trim() || '?');
    const recentAttempts = summary?.recentAttempts ?? [];
    const hoursDisplay = formatPracticeHours(summary?.totalPracticeSeconds ?? 0);

    const handleLogout = async () => {
        await logoutAction();
        setUser(null);
        router.push(`/${lang}/`);
    };

    // Tab content config — maps tab id → rendered element
    const coachTabProps = {
        t,
        lang,
        completedCount: summary?.completedCount ?? 0,
        totalPracticeSeconds: summary?.totalPracticeSeconds ?? 0,
        recentAttempts,
        summaryLoading,
    };

    const TAB_CONTENT: Record<TabId, React.ReactNode> = {
        profile: (
            <ProfileTab
                t={t}
                lang={lang}
                profileUser={profileUser}
                profileLoading={profileLoading}
                profileError={profileError}
                displayName={displayName}
                displayEmail={displayEmail}
                displayPhone={displayPhone}
                joinedStr={joinedStr}
                isMyProfile={isMyProfile}
                completedCount={summary?.completedCount ?? 0}
                hoursDisplay={hoursDisplay}
                avatarSrc={avatarSrc}
            />
        ),
        history: (
            <HistoryTab
                t={t}
                lang={lang}
                recentAttempts={recentAttempts}
                summaryLoading={summaryLoading}
                summaryError={summaryError}
                isMyProfile={isMyProfile}
            />
        ),
        'coach/graph': <AICoachGraphTab {...coachTabProps} />,
        'coach/path': <AICoachPathTab {...coachTabProps} />,
        'coach/insight': <AICoachInsightTab {...coachTabProps} />,
    };

    // Dropdown items config
    const DROPDOWN_LINKS = [
        { href: `/${lang}/`, icon: Home, label: t.home ?? 'Home', show: true },
        { href: `/${lang}/settings`, icon: Settings, label: t.settings ?? 'Settings', show: isMyProfile },
    ];

    return (
        <SidebarProvider defaultOpen>
            <Sidebar
                collapsible="icon"
                className="border-r border-sidebar-border"
                innerClassName="bg-[#fef8f4] dark:bg-[oklch(0.17_0.005_256)]"
            >
                <SidebarHeader className="border-b border-sidebar-border group-data-[collapsible=icon]:px-2">
                    <LogoTrigger />
                </SidebarHeader>

                <SidebarContent className="pt-3 px-2">
                    <SidebarMenu>
                        {/* Flat nav items */}
                        {NAV_ITEMS.map(({ id: navId, icon: Icon, label }) => (
                            <SidebarMenuItem key={navId}>
                                <SidebarMenuButton
                                    isActive={activeTab === navId}
                                    tooltip={label}
                                    onClick={() => setActiveTab(navId)}
                                    className="cursor-pointer"
                                >
                                    <Icon className="shrink-0" />
                                    <span>{label}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                        {/* AI Coach collapsible */}
                        <Collapsible asChild className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        isActive={activeTab.startsWith('coach/')}
                                        tooltip="AI Coach"
                                        className="cursor-pointer"
                                    >
                                        <BrainCircuit className="shrink-0" />
                                        <span>AI Coach</span>
                                        <ChevronRight className="ml-auto shrink-0 transition-transform duration-300 [[data-state=open]_&]:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {COACH_SUB.map(({ id: subId, icon: Icon, label }) => (
                                            <SidebarMenuSubItem key={subId}>
                                                <SidebarMenuSubButton asChild isActive={activeTab === subId}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveTab(subId)}
                                                        className="cursor-pointer w-full"
                                                    >
                                                        <Icon className="w-3.5 h-3.5 shrink-0" />
                                                        <span>{label}</span>
                                                    </button>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter className="border-t border-sidebar-border">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg shrink-0">
                                            <AvatarImage src={avatarSrc} alt={displayName} />
                                            <AvatarFallback className="rounded-lg bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                                                {getInitials(profileLoading ? '?' : profileUser?.name ?? '?')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                            <span className="truncate font-semibold text-sidebar-foreground">
                                                {displayName}
                                            </span>
                                            <span className="truncate text-xs text-sidebar-foreground/50">
                                                {displayEmail && displayEmail !== '—'
                                                    ? displayEmail
                                                    : t.profileMember ?? 'Member'}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4 text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden shrink-0" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="right"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuGroup>
                                        {DROPDOWN_LINKS.filter(({ show }) => show).map(
                                            ({ href, icon: Icon, label }) => (
                                                <DropdownMenuItem key={href} asChild>
                                                    <Link href={href}>
                                                        <Icon className="mr-2 h-4 w-4" />
                                                        {label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ),
                                        )}
                                    </DropdownMenuGroup>
                                    {isMyProfile && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={handleLogout}
                                                className="text-destructive focus:text-destructive cursor-pointer"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                {t.logout ?? 'Logout'}
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>

                <SidebarRail />
            </Sidebar>

            <SidebarInset className="dark:bg-background overflow-y-auto">
                <div className="p-8 lg:p-12">
                    <Breadcrumb activeTab={activeTab} setActiveTab={setActiveTab} />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={TAB_VARIANTS}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={TAB_TRANSITION}
                        >
                            {TAB_CONTENT[activeTab]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
