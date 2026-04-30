'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Repeat, Send, MoreHorizontal, Image as ImageIcon, Loader2, Trash2, Pencil, X, Check } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ThreadDto, ThreadPageResponse } from '../types/thread';

const BLOG_API_URL = 'http://localhost:8084/api/threads';
const MOCK_USER_ID = 1;
const MOCK_USER_AVATAR = 'https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150';
const MOCK_USER_NAME = 'User ' + MOCK_USER_ID;

const formatTimeAgo = (dateString: string, t: any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return t?.justNow || 'Vừa xong';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}p`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    return date.toLocaleDateString();
};

const compressImage = (file: File, maxWidth = 1080, quality = 0.75): Promise<string> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(url);
            const scale = Math.min(1, maxWidth / img.width);
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = url;
    });

export function BlogList({ t, lang }: { t: any; lang: string }) {
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState<string | null>(null);
    const [posts, setPosts] = useState<ThreadDto[]>([]);

    // Inline edit state: { postId: number, content: string, image: string|null }
    const [editingPost, setEditingPost] = useState<{ id: number; content: string; image: string | null } | null>(null);

    const createImageInputRef = useRef<HTMLInputElement>(null);
    const editImageInputRef = useRef<HTMLInputElement>(null);

    // Infinite scroll states
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore],
    );

    const fetchPosts = async (pageNumber: number) => {
        try {
            setLoading(true);
            const res = await fetch(`${BLOG_API_URL}?page=${pageNumber}&size=10`);
            if (!res.ok) throw new Error('Failed to fetch threads');
            const data: ThreadPageResponse = await res.json();
            if (pageNumber === 0) {
                setPosts(data.content);
            } else {
                setPosts(prev => [...prev, ...data.content]);
            }
            setHasMore(!data.last);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    // ── Create Post ──────────────────────────────────────────────────────────
    const handleCreateImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const base64 = await compressImage(file);
        setNewPostImage(base64);
    };

    const handleCreatePost = async () => {
        if (!newPostContent.trim()) return;
        try {
            const res = await fetch(`${BLOG_API_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    authorId: MOCK_USER_ID,
                    content: newPostContent,
                    mediaUrls: newPostImage ? [newPostImage] : []
                })
            });
            if (res.ok) {
                const newPost = await res.json();
                setPosts([newPost, ...posts]);
                setNewPostContent('');
                setNewPostImage(null);
            }
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    // ── Edit Post ────────────────────────────────────────────────────────────
    const startEditing = (post: ThreadDto) => {
        setEditingPost({
            id: post.id,
            content: post.content || '',
            image: post.mediaUrls?.[0] || null
        });
    };

    const handleEditImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editingPost) return;
        const base64 = await compressImage(file);
        setEditingPost({ ...editingPost, image: base64 });
    };

    const handleSaveEdit = async () => {
        if (!editingPost) return;
        console.log('Saving post edit:', editingPost.id, editingPost.content);
        try {
            const url = `${BLOG_API_URL}/${editingPost.id}`;
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    authorId: MOCK_USER_ID,
                    content: editingPost.content,
                    mediaUrls: editingPost.image ? [editingPost.image] : []
                })
            });
            if (res.ok) {
                const updated: ThreadDto = await res.json();
                setPosts(posts.map(p => p.id === updated.id ? { ...p, ...updated } : p));
                setEditingPost(null);
            } else {
                alert('Không thể chỉnh sửa bài viết này!');
            }
        } catch (error) {
            console.error('Error updating post', error);
        }
    };

    // ── Delete Post ──────────────────────────────────────────────────────────
    const handleDeletePost = async (postId: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;
        try {
            const res = await fetch(`${BLOG_API_URL}/${postId}?requesterId=${MOCK_USER_ID}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== postId));
            } else {
                alert('Lỗi: Bạn không có quyền xóa bài này!');
            }
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };

    // ── Like ─────────────────────────────────────────────────────────────────
    const toggleLike = async (postId: number) => {
        setPosts(posts.map((post) => {
            if (post.id === postId) {
                const isLiked = post.isLiked || false;
                return { ...post, isLiked: !isLiked, likesCount: isLiked ? Math.max(0, post.likesCount - 1) : post.likesCount + 1 };
            }
            return post;
        }));
        try {
            await fetch(`${BLOG_API_URL}/${postId}/like?userId=${MOCK_USER_ID}`, { method: 'POST' });
        } catch (error) {
            console.error('Error toggling like', error);
        }
    };

    const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPostContent(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] flex justify-center py-0 sm:py-8 px-0 sm:px-4 transition-colors duration-500">
            <div className="w-full max-w-[620px] bg-white dark:bg-[#121212] sm:rounded-3xl sm:border border-gray-100 dark:border-[#222] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col transition-all duration-500 pb-10">
                {/* Header */}
                <div className="sticky top-[64px] bg-white/70 dark:bg-[#121212]/70 sm:rounded-t-3xl backdrop-blur-xl z-10 p-4 flex items-center justify-center transition-all duration-500 border-b border-gray-100/50 dark:border-[#222]/50">
                    <h1 className="font-bold text-gray-900 dark:text-gray-100 text-[17px] tracking-tight">{t?.community || 'Cộng đồng'}</h1>
                </div>

                {/* Create Post Box */}
                <div className="p-5 border-b border-gray-100 dark:border-[#222] transition-colors duration-500">
                    <div className="flex gap-4">
                        <img src={MOCK_USER_AVATAR} alt="Avatar" className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-gray-50 dark:ring-[#1a1a1a]" />
                        <div className="flex-1 min-w-0 pt-1">
                            <div className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 tracking-tight">{MOCK_USER_NAME}</div>
                            <textarea
                                value={newPostContent}
                                onChange={handleTextareaInput}
                                placeholder={t?.whatsNew || 'Có gì mới?'}
                                className="w-full mt-1.5 outline-none resize-none text-[16px] text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent min-h-[44px] leading-relaxed transition-all duration-300"
                                rows={1}
                            />
                            {/* New post image preview */}
                            {newPostImage && (
                                <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] w-fit shadow-sm">
                                    <img src={newPostImage} alt="preview" className="max-h-64 object-cover" />
                                    <button onClick={() => setNewPostImage(null)} className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white rounded-full p-1 hover:bg-black/70 transition-all active:scale-90">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center justify-between mt-3">
                                <button
                                    onClick={() => createImageInputRef.current?.click()}
                                    className="p-2 -ml-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all active:scale-90"
                                >
                                    <ImageIcon className="w-[22px] h-[22px]" />
                                </button>
                                <input ref={createImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleCreateImageSelect} />
                                <button
                                    onClick={handleCreatePost}
                                    disabled={!newPostContent.trim()}
                                    className="px-6 py-2 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-gray-900 disabled:cursor-not-allowed text-white dark:text-black font-semibold rounded-full text-[15px] transition-all active:scale-95 shadow-sm"
                                >
                                    {t?.postBtn || 'Đăng'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feed Posts */}
                <div className="flex flex-col">
                    {posts.map((post, index) => {
                        const isLastElement = index === posts.length - 1;
                        const isMyPost = post.authorId === MOCK_USER_ID;
                        const isEditing = editingPost?.id === post.id;

                        return (
                            <div
                                key={post.id}
                                ref={isLastElement ? lastPostElementRef : null}
                                className="p-5 border-b border-gray-100 dark:border-[#222] hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors duration-300"
                            >
                                <div className="flex gap-4">
                                    {/* Left Column */}
                                    <div className="flex flex-col items-center">
                                        <Link href={`/profile/${post.authorId}`}>
                                            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shrink-0 ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-600 transition-all overflow-hidden shadow-sm">
                                                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">{post.authorId}</span>
                                            </div>
                                        </Link>
                                        <div className="w-[2px] bg-gray-100 dark:bg-[#222] flex-1 mt-3 mb-1 rounded-full"></div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="flex-1 min-w-0 pb-1">
                                        {/* Post Header */}
                                        <div className="flex justify-between items-center">
                                            <Link href={`/profile/${post.authorId}`} className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 hover:underline tracking-tight">
                                                User {post.authorId}
                                            </Link>
                                            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                                                <span className="text-[14px] hover:underline cursor-pointer">{formatTimeAgo(post.createdAt, t)}</span>
                                                {isMyPost && !isEditing && (
                                                    <div className="flex items-center ml-1">
                                                        <button onClick={() => startEditing(post)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Chỉnh sửa">
                                                            <Pencil className="w-[15px] h-[15px] hover:text-blue-500" />
                                                        </button>
                                                        <button onClick={() => handleDeletePost(post.id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Xóa">
                                                            <Trash2 className="w-[15px] h-[15px] hover:text-red-500" />
                                                        </button>
                                                    </div>
                                                )}
                                                {isEditing && (
                                                    <div className="flex items-center ml-1">
                                                        <button onClick={handleSaveEdit} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Lưu">
                                                            <Check className="w-[15px] h-[15px] text-green-500" />
                                                        </button>
                                                        <button onClick={() => setEditingPost(null)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Hủy">
                                                            <X className="w-[15px] h-[15px] hover:text-gray-600" />
                                                        </button>
                                                    </div>
                                                )}
                                                {!isMyPost && (
                                                    <button className="p-1.5 -mr-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90">
                                                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Inline Edit or View */}
                                        {isEditing ? (
                                            <div className="mt-2.5">
                                                <textarea
                                                    value={editingPost!.content}
                                                    onChange={e => setEditingPost({ ...editingPost!, content: e.target.value })}
                                                    className="w-full outline-none resize-none text-[15px] text-gray-800 dark:text-gray-200 bg-white dark:bg-[#1A1A1A] rounded-2xl p-3 leading-relaxed border border-gray-200 dark:border-[#333] min-h-[80px] focus:border-gray-400 dark:focus:border-gray-500 transition-colors shadow-sm"
                                                    rows={3}
                                                />
                                                {editingPost!.image && (
                                                    <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] w-fit shadow-sm">
                                                        <img src={editingPost!.image} alt="preview" className="max-h-64 object-cover" />
                                                        <button onClick={() => setEditingPost({ ...editingPost!, image: null })} className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white rounded-full p-1 hover:bg-black/70 transition-all active:scale-90">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="flex items-center mt-3 gap-2">
                                                    <button onClick={() => editImageInputRef.current?.click()} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-500 transition-colors px-3 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10 active:scale-95">
                                                        <ImageIcon className="w-4 h-4" />
                                                        <span>{editingPost!.image ? 'Đổi ảnh' : 'Thêm ảnh'}</span>
                                                    </button>
                                                    <input ref={editImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleEditImageSelect} />
                                                </div>
                                            </div>
                                        ) : (
                                            <Link href={`/community/${post.id}`} className="mt-1.5 block group/content outline-none rounded-md">
                                                <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line break-words group-hover/content:opacity-75 transition-opacity">
                                                    {post.content}
                                                </p>
                                            </Link>
                                        )}

                                        {/* Post Image */}
                                        {!isEditing && post.mediaUrls && post.mediaUrls.length > 0 && (
                                            <Link href={`/community/${post.id}`} className="mt-3.5 block rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] shadow-[0_2px_8px_rgb(0,0,0,0.04)] dark:shadow-none hover:opacity-95 transition-all">
                                                <ImageWithFallback src={post.mediaUrls[0]} alt="Post image" className="w-full h-auto max-h-[500px] object-cover bg-gray-50 dark:bg-[#111]" />
                                            </Link>
                                        )}

                                        {/* Post Actions */}
                                        {!isEditing && (
                                            <div className="flex items-center gap-1.5 mt-3.5 mb-1">
                                                <button onClick={() => toggleLike(post.id)} className="group p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center">
                                                    <Heart className={`w-[20px] h-[20px] transition-colors ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                                                </button>
                                                <Link href={`/community/${post.id}`} className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center">
                                                    <MessageCircle className="w-[20px] h-[20px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                                </Link>
                                                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center">
                                                    <Repeat className="w-[20px] h-[20px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                                </button>
                                                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center">
                                                    <Send className="w-[20px] h-[20px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Post Stats */}
                                        {!isEditing && (post.repliesCount > 0 || post.likesCount > 0) && (
                                            <div className="flex items-center gap-2 text-[15px] text-gray-500 dark:text-gray-500 mt-1">
                                                {post.repliesCount > 0 && <span className="hover:underline cursor-pointer">{post.repliesCount} {t?.replies || 'phản hồi'}</span>}
                                                {post.repliesCount > 0 && post.likesCount > 0 && <span>·</span>}
                                                {post.likesCount > 0 && <span className="hover:underline cursor-pointer">{post.likesCount} {t?.likes || 'lượt thích'}</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex items-center justify-center py-6">
                        <Loader2 className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-spin" />
                    </div>
                )}

                {/* End of feed */}
                {!hasMore && posts.length > 0 && (
                    <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-[15px]">{t?.endOfFeed || 'Bạn đã xem hết!'}</div>
                )}
            </div>
        </div>
    );
}
