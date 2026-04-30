export interface ThreadDto {
    id: number;
    authorId: number;
    content: string;
    mediaUrls: string[];
    parentThreadId: number | null;
    repostThreadId: number | null;
    quoteThreadId: number | null;
    likesCount: number;
    repliesCount: number;
    repostsCount: number;
    quotesCount: number;
    createdAt: string;
    replies?: ThreadDto[];
    // Frontend specific state, manually appended after fetch
    isLiked?: boolean; 
}

export interface ThreadPageResponse {
    content: ThreadDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    last: boolean;
}
