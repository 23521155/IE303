'use client';
import React from 'react';
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
        <div className="px-4 py-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-0.5">
                {label}
            </p>
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
        <div className="max-w-2xl">
            {/* ── Hero section — ambient glow + dot texture ── */}
            <div className="relative -mx-8 lg:-mx-12 px-8 lg:px-12 pt-8 pb-8 mb-8 overflow-hidden">
                {/* Ambient amber glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(232, 121, 33, 0.08) 0%, transparent 70%)',
                    }}
                />
                {/* Dot-grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, var(--color-secondary) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                {/* Identity block */}
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/60 shrink-0">
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
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mb-2">
                            {t.profileMember ?? 'Member'}
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-secondary dark:text-foreground">
                            {displayName}
                        </h1>
                        {displayEmail && displayEmail !== '—' && (
                            <p className="text-sm text-muted-foreground mt-0.5">{displayEmail}</p>
                        )}
                    </div>
                </div>

                {/* Stats strip */}
                <div className="relative mt-7 flex items-center gap-6 flex-wrap">
                    <div>
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-0.5">
                            {t.completedExams ?? 'Exams'}
                        </p>
                        <p className="text-xl font-semibold tabular-nums text-secondary dark:text-foreground">
                            {completedCount}
                        </p>
                    </div>
                    <div className="w-px h-8 bg-border/60" />
                    <div>
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-0.5">
                            {t.studyHours ?? 'Study'}
                        </p>
                        <p className="text-xl font-semibold tabular-nums text-secondary dark:text-foreground">
                            {hoursDisplay}
                        </p>
                    </div>
                    <div className="w-px h-8 bg-border/60" />
                    <div>
                        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-0.5">
                            {t.joined ?? 'Joined'}
                        </p>
                        <p className="text-xl font-semibold text-secondary dark:text-foreground">
                            {joinedStr}
                        </p>
                    </div>
                </div>
            </div>

            {/* Error states */}
            {profileError === 'invalid-id' && (
                <p className="text-sm text-amber-600 dark:text-amber-500 mb-6">
                    {t.profileInvalidIdHint}
                </p>
            )}
            {profileError === 'failed' && !profileLoading && (
                <p className="text-sm text-destructive mb-6">{t.profileLoadFailed}</p>
            )}

            {/* Account details */}
            {isMyProfile && (
                <div className="space-y-1">
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                        {t.accountDetails ?? 'Account details'}
                    </p>
                    <div className="border border-border/60 rounded-lg overflow-hidden divide-y divide-border/40">
                        <InfoRow label="Email" value={displayEmail} />
                        {displayPhone && displayPhone !== '—' && (
                            <InfoRow label="Phone" value={displayPhone} />
                        )}
                        {profileUser?.currentStatus && (
                            <InfoRow label="Status" value={profileUser.currentStatus} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
