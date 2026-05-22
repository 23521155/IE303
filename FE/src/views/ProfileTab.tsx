'use client';
import React from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type ProfileApiUser = {
    id: number;
    name: string;
    phoneNumber?: string | null;
    currentStatus?: string | null;
    email?: string | null;
    createdAt?: string | null;
};

interface ProfileTabProps {
    t: any;
    lang: string;
    profileUser: ProfileApiUser | null;
    profileLoading: boolean;
    profileError: string | null;
    displayName: string;
    displayEmail: string;
    displayPhone: string;
    joinedStr: string;
    isMyProfile: boolean;
    completedCount: number;
    hoursDisplay: string;
    avatarSrc: string;
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="px-5 py-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
            <p className="text-sm text-foreground">{value}</p>
        </div>
    );
}

export function ProfileTab({
    t,
    lang,
    profileUser,
    profileLoading,
    profileError,
    displayName,
    displayEmail,
    displayPhone,
    joinedStr,
    isMyProfile,
    completedCount,
    hoursDisplay,
    avatarSrc,
}: ProfileTabProps) {
    return (
        <div className="space-y-8">
            {/* ── Identity ── */}
            <div className="flex items-start gap-5">
                <div className="w-[72px] h-[72px] rounded-xl overflow-hidden border border-border/60 ring-2 ring-primary/15 shrink-0">
                    {profileLoading && !profileUser ? (
                        <div className="w-full h-full bg-muted animate-pulse" />
                    ) : (
                        <ImageWithFallback
                            src={avatarSrc}
                            alt={displayName}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide mb-2">
                        {t.profileMember ?? 'Member'}
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-secondary dark:text-foreground leading-tight truncate">
                        {displayName}
                    </h2>
                    {displayEmail && displayEmail !== '—' && (
                        <p className="text-sm text-muted-foreground mt-0.5 truncate">{displayEmail}</p>
                    )}
                </div>
                {isMyProfile && (
                    <Link
                        href={`/${lang}/settings`}
                        className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-md px-2.5 py-1.5 hover:bg-muted/40 transition-colors mt-0.5"
                    >
                        <Settings className="w-3.5 h-3.5" />
                        {t.settings ?? 'Settings'}
                    </Link>
                )}
            </div>

            {/* ── Stats ── */}
            <div className="border border-[rgba(0,0,0,0.08)] dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a]">
                <div className="grid grid-cols-3 divide-x divide-border/40">
                    <div className="px-5 py-4">
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">
                            {t.completedExams ?? 'Exams'}
                        </p>
                        <p className="text-2xl font-bold tabular-nums text-secondary dark:text-foreground leading-none">
                            {completedCount}
                        </p>
                    </div>
                    <div className="px-5 py-4">
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">
                            {t.studyHours ?? 'Study'}
                        </p>
                        <p className="text-2xl font-bold tabular-nums text-secondary dark:text-foreground leading-none">
                            {hoursDisplay}
                        </p>
                    </div>
                    <div className="px-5 py-4">
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-2">
                            {t.joined ?? 'Joined'}
                        </p>
                        <p className="text-base font-semibold text-secondary dark:text-foreground leading-none">
                            {joinedStr}
                        </p>
                    </div>
                </div>
            </div>

            {/* Error states */}
            {profileError === 'invalid-id' && (
                <p className="text-sm text-amber-600 dark:text-amber-500">{t.profileInvalidIdHint}</p>
            )}
            {profileError === 'failed' && !profileLoading && (
                <p className="text-sm text-destructive">{t.profileLoadFailed}</p>
            )}

            {/* ── Account details ── */}
            {isMyProfile && (
                <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                        {t.accountDetails ?? 'Account details'}
                    </p>
                    <div className="border border-[rgba(0,0,0,0.08)] dark:border-white/10 rounded-xl overflow-hidden divide-y divide-border/40 bg-white dark:bg-[#1a1a1a]">
                        <InfoRow label="Email" value={displayEmail} />
                        {displayPhone && displayPhone !== '—' && <InfoRow label="Phone" value={displayPhone} />}
                        {profileUser?.currentStatus && <InfoRow label="Status" value={profileUser.currentStatus} />}
                    </div>
                </div>
            )}
        </div>
    );
}
