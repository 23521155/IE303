"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Repeat, Send, MoreHorizontal, Image as ImageIcon, Loader2, Trash2, Pencil, X, Check } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ThreadDto } from '../types/thread';

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

export function BlogPost({ t, lang }: { t: any; lang: string }) {
  const params = useParams();
  const id = params?.id as string;

  const [newReplyContent, setNewReplyContent] = useState('');
  const [newReplyImage, setNewReplyImage] = useState<string | null>(null);
  const [thread, setThread] = useState<ThreadDto | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [editingMain, setEditingMain] = useState<{ content: string; image: string | null } | null>(null);
  const [editingReply, setEditingReply] = useState<{ id: number; content: string; image: string | null } | null>(null);

  const replyImageRef = useRef<HTMLInputElement>(null);
  const editMainImageRef = useRef<HTMLInputElement>(null);
  const editReplyImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    const fetchThread = async () => {
      try {
        const res = await fetch(`${BLOG_API_URL}/${id}`);
        if (res.ok) setThread(await res.json());
      } catch (error) {
        console.error('Error fetching thread', error);
      } finally {
        setLoading(false);
      }
    };
    fetchThread();
  }, [id]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReplyContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // ── Create Reply ───────────────────────────────────────────────────────────
  const handleCreateReply = async () => {
    if (!newReplyContent.trim() || !thread) return;
    try {
      const res = await fetch(`${BLOG_API_URL}/${thread.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: MOCK_USER_ID, content: newReplyContent, mediaUrls: newReplyImage ? [newReplyImage] : [] })
      });
      if (res.ok) {
        const newReply = await res.json();
        setThread({ ...thread, repliesCount: thread.repliesCount + 1, replies: [newReply, ...(thread.replies || [])] });
        setNewReplyContent('');
        setNewReplyImage(null);
      }
    } catch (error) { console.error(error); }
  };

  // ── Edit Main Post ─────────────────────────────────────────────────────────
  const handleSaveMainEdit = async () => {
    if (!thread || !editingMain) return;
    console.log('Saving main post edit:', thread.id);
    try {
      const url = `${BLOG_API_URL}/${thread.id}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: MOCK_USER_ID, content: editingMain.content, mediaUrls: editingMain.image ? [editingMain.image] : [] })
      });
      if (res.ok) {
        const updated = await res.json();
        setThread({ ...thread, ...updated });
        setEditingMain(null);
      } else { alert('Không thể chỉnh sửa bài viết!'); }
    } catch (error) { console.error(error); }
  };

  // ── Edit Reply ─────────────────────────────────────────────────────────────
  const handleSaveReplyEdit = async () => {
    if (!thread || !editingReply) return;
    console.log('Saving reply edit:', editingReply.id);
    try {
      const url = `${BLOG_API_URL}/${editingReply.id}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: MOCK_USER_ID, content: editingReply.content, mediaUrls: editingReply.image ? [editingReply.image] : [] })
      });
      if (res.ok) {
        const updated = await res.json();
        setThread({ ...thread, replies: (thread.replies || []).map(r => r.id === editingReply.id ? { ...r, ...updated } : r) });
        setEditingReply(null);
      } else { alert('Không thể chỉnh sửa bình luận!'); }
    } catch (error) { console.error(error); }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDeleteThread = async () => {
    if (!thread || !confirm('Xóa bài viết này?')) return;
    try {
      const res = await fetch(`${BLOG_API_URL}/${thread.id}?requesterId=${MOCK_USER_ID}`, { method: 'DELETE' });
      if (res.ok) { window.location.href = '/community'; }
      else { alert('Không có quyền xóa!'); }
    } catch (error) { console.error(error); }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!thread || !confirm('Xóa bình luận này?')) return;
    try {
      const res = await fetch(`${BLOG_API_URL}/${replyId}?requesterId=${MOCK_USER_ID}`, { method: 'DELETE' });
      if (res.ok) {
        setThread({ ...thread, repliesCount: Math.max(0, thread.repliesCount - 1), replies: (thread.replies || []).filter(r => r.id !== replyId) });
      } else { alert('Không có quyền xóa!'); }
    } catch (error) { console.error(error); }
  };

  // ── Like ───────────────────────────────────────────────────────────────────
  const toggleMainLike = async () => {
    if (!thread) return;
    const isLiked = thread.isLiked || false;
    setThread({ ...thread, isLiked: !isLiked, likesCount: isLiked ? Math.max(0, thread.likesCount - 1) : thread.likesCount + 1 });
    try { await fetch(`${BLOG_API_URL}/${thread.id}/like?userId=${MOCK_USER_ID}`, { method: 'POST' }); } catch (e) { console.error(e); }
  };

  const toggleReplyLike = async (replyId: number) => {
    if (!thread?.replies) return;
    setThread({ ...thread, replies: thread.replies.map(r => r.id === replyId ? { ...r, isLiked: !r.isLiked, likesCount: r.isLiked ? Math.max(0, r.likesCount - 1) : r.likesCount + 1 } : r) });
    try { await fetch(`${BLOG_API_URL}/${replyId}/like?userId=${MOCK_USER_ID}`, { method: 'POST' }); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#121212]"><Loader2 className="w-8 h-8 text-gray-400 animate-spin" /></div>;
  if (!thread) return <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#121212] text-gray-500">Không tìm thấy bài viết!</div>;

  const isMyPost = thread.authorId === MOCK_USER_ID;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] flex justify-center py-0 sm:py-8 px-0 sm:px-4 transition-colors duration-500">
      <div className="w-full max-w-[620px] bg-white dark:bg-[#121212] sm:rounded-3xl sm:border border-gray-100 dark:border-[#222] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col transition-all duration-500 pb-10">

        {/* Header */}
        <div className="sticky top-[64px] bg-white/70 dark:bg-[#121212]/70 sm:rounded-t-3xl backdrop-blur-xl z-10 p-4 border-b border-gray-100/50 dark:border-[#222]/50 flex items-center transition-all duration-500">
          <Link href="/community" className="p-2.5 -ml-2.5 mr-2 hover:bg-gray-100 dark:hover:bg-[#222] rounded-full transition-all active:scale-90">
            <ArrowLeft className="w-[20px] h-[20px] text-gray-900 dark:text-gray-100" />
          </Link>
          <h1 className="font-bold text-gray-900 dark:text-gray-100 text-[17px] tracking-tight flex-1 text-center pr-8">{t?.thread || 'Thread'}</h1>
        </div>

        {/* Main Post */}
        <div className="p-5 border-b border-gray-100 dark:border-[#222] transition-colors duration-500">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Link href={`/profile/${thread.authorId}`}>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shrink-0 ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-600 transition-all overflow-hidden shadow-sm">
                  <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">{thread.authorId}</span>
                </div>
              </Link>
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex justify-between items-center">
                <Link href={`/profile/${thread.authorId}`} className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 hover:underline tracking-tight">User {thread.authorId}</Link>
                <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                  <span className="text-[14px] hover:underline cursor-pointer">{formatTimeAgo(thread.createdAt, t)}</span>
                  {isMyPost && !editingMain && (
                    <div className="flex items-center ml-1">
                      <button onClick={() => setEditingMain({ content: thread.content || '', image: thread.mediaUrls?.[0] || null })} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Chỉnh sửa"><Pencil className="w-[15px] h-[15px] hover:text-blue-500" /></button>
                      <button onClick={handleDeleteThread} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Xóa"><Trash2 className="w-[15px] h-[15px] hover:text-red-500" /></button>
                    </div>
                  )}
                  {editingMain && (
                    <div className="flex items-center ml-1">
                      <button onClick={handleSaveMainEdit} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Lưu"><Check className="w-[15px] h-[15px] text-green-500" /></button>
                      <button onClick={() => setEditingMain(null)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Hủy"><X className="w-[15px] h-[15px] hover:text-gray-600" /></button>
                    </div>
                  )}
                  {!isMyPost && <button className="p-1.5 -mr-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90"><MoreHorizontal className="w-5 h-5 text-gray-400" /></button>}
                </div>
              </div>

              {editingMain ? (
                <div className="mt-2.5">
                  <textarea value={editingMain.content} onChange={e => setEditingMain({ ...editingMain, content: e.target.value })} className="w-full outline-none resize-none text-[15px] text-gray-800 dark:text-gray-200 bg-white dark:bg-[#1A1A1A] rounded-2xl p-3 leading-relaxed border border-gray-200 dark:border-[#333] min-h-[80px] focus:border-gray-400 dark:focus:border-gray-500 transition-colors shadow-sm" rows={3} />
                  {editingMain.image && (
                    <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] w-fit shadow-sm">
                      <img src={editingMain.image} alt="preview" className="max-h-64 object-cover" />
                      <button onClick={() => setEditingMain({ ...editingMain, image: null })} className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white rounded-full p-1 hover:bg-black/70 transition-all active:scale-90"><X className="w-4 h-4" /></button>
                    </div>
                  )}
                  <div className="flex items-center mt-3 gap-2">
                    <button onClick={() => editMainImageRef.current?.click()} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-500 transition-colors px-3 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10 active:scale-95">
                      <ImageIcon className="w-4 h-4" /><span>{editingMain.image ? 'Đổi ảnh' : 'Thêm ảnh'}</span>
                    </button>
                    <input ref={editMainImageRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (f) setEditingMain({ ...editingMain, image: await compressImage(f) }); }} />
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line break-words">{thread.content}</p>
                  {thread.mediaUrls && thread.mediaUrls.length > 0 && (
                    <div className="mt-3.5 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] shadow-[0_2px_8px_rgb(0,0,0,0.04)] dark:shadow-none hover:opacity-95 transition-all">
                      <ImageWithFallback src={thread.mediaUrls[0]} alt="Post image" className="w-full h-auto max-h-[500px] object-cover bg-gray-50 dark:bg-[#111]" />
                    </div>
                  )}
                </>
              )}

              <div className="flex items-center gap-1.5 mt-3.5 mb-1">
                <button onClick={toggleMainLike} className="group p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center">
                  <Heart className={`w-[20px] h-[20px] transition-colors ${thread.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                </button>
                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center"><MessageCircle className="w-[20px] h-[20px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /></button>
                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center"><Repeat className="w-[20px] h-[20px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /></button>
                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center"><Send className="w-[20px] h-[20px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /></button>
              </div>

              {(thread.repliesCount > 0 || thread.likesCount > 0) && (
                <div className="flex items-center gap-2 text-[15px] text-gray-500 dark:text-gray-400 mt-1">
                  {thread.repliesCount > 0 && <span>{thread.repliesCount} {t?.replies || 'phản hồi'}</span>}
                  {thread.repliesCount > 0 && thread.likesCount > 0 && <span>·</span>}
                  {thread.likesCount > 0 && <span>{thread.likesCount} {t?.likes || 'lượt thích'}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reply Box */}
        <div className="p-5 border-b border-gray-100 dark:border-[#222] transition-colors duration-500">
          <div className="flex gap-4">
            <img src={MOCK_USER_AVATAR} alt="Avatar" className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-gray-50 dark:ring-[#1a1a1a]" />
            <div className="flex-1 min-w-0 pt-1">
              <div className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 tracking-tight">{MOCK_USER_NAME}</div>
              <textarea value={newReplyContent} onChange={handleTextareaInput} placeholder={`${t?.replyTo || 'Trả lời'} User ${thread.authorId}...`} className="w-full mt-1.5 outline-none resize-none text-[16px] text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent min-h-[44px] leading-relaxed transition-all duration-300" rows={1} />
              {newReplyImage && (
                <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] w-fit shadow-sm">
                  <img src={newReplyImage} alt="preview" className="max-h-64 object-cover" />
                  <button onClick={() => setNewReplyImage(null)} className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white rounded-full p-1 hover:bg-black/70 transition-all active:scale-90"><X className="w-4 h-4" /></button>
                </div>
              )}
              <div className="flex items-center justify-between mt-3">
                <button onClick={() => replyImageRef.current?.click()} className="p-2 -ml-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all active:scale-90">
                  <ImageIcon className="w-[22px] h-[22px]" />
                </button>
                <input ref={replyImageRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (f) setNewReplyImage(await compressImage(f)); }} />
                <button onClick={handleCreateReply} disabled={!newReplyContent.trim()} className="px-6 py-2 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-gray-900 disabled:cursor-not-allowed text-white dark:text-black font-semibold rounded-full text-[15px] transition-all active:scale-95 shadow-sm">
                  {t?.postBtn || 'Đăng'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies List */}
        <div className="flex flex-col">
          {thread.replies?.map((reply, index) => {
            const isLast = index === (thread.replies?.length || 0) - 1;
            const isMyReply = reply.authorId === MOCK_USER_ID;
            const isEditingThis = editingReply?.id === reply.id;
            return (
              <div key={reply.id} className="p-5 border-b border-gray-100 dark:border-[#222] hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors duration-300">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <Link href={`/profile/${reply.authorId}`}>
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shrink-0 ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-600 transition-all overflow-hidden shadow-sm">
                        <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">{reply.authorId}</span>
                      </div>
                    </Link>
                    {!isLast && <div className="w-[2px] bg-gray-100 dark:bg-[#222] flex-1 mt-3 mb-1 rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex justify-between items-center">
                      <Link href={`/profile/${reply.authorId}`} className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 hover:underline tracking-tight">User {reply.authorId}</Link>
                      <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                        <span className="text-[14px] hover:underline cursor-pointer">{formatTimeAgo(reply.createdAt, t)}</span>
                        {isMyReply && !isEditingThis && (
                          <div className="flex items-center ml-1">
                            <button onClick={() => setEditingReply({ id: reply.id, content: reply.content || '', image: reply.mediaUrls?.[0] || null })} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Chỉnh sửa"><Pencil className="w-[15px] h-[15px] hover:text-blue-500" /></button>
                            <button onClick={() => handleDeleteReply(reply.id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Xóa"><Trash2 className="w-[15px] h-[15px] hover:text-red-500" /></button>
                          </div>
                        )}
                        {isEditingThis && (
                          <div className="flex items-center ml-1">
                            <button onClick={handleSaveReplyEdit} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Lưu"><Check className="w-[15px] h-[15px] text-green-500" /></button>
                            <button onClick={() => setEditingReply(null)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90" title="Hủy"><X className="w-[15px] h-[15px] hover:text-gray-600" /></button>
                          </div>
                        )}
                        {!isMyReply && <button className="p-1.5 -mr-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all active:scale-90"><MoreHorizontal className="w-5 h-5 text-gray-400" /></button>}
                      </div>
                    </div>

                    {isEditingThis ? (
                      <div className="mt-2.5">
                        <textarea value={editingReply!.content} onChange={e => setEditingReply({ ...editingReply!, content: e.target.value })} className="w-full outline-none resize-none text-[15px] text-gray-800 dark:text-gray-200 bg-white dark:bg-[#1A1A1A] rounded-2xl p-3 leading-relaxed border border-gray-200 dark:border-[#333] min-h-[80px] focus:border-gray-400 dark:focus:border-gray-500 transition-colors shadow-sm" rows={2} />
                        {editingReply!.image && (
                          <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] w-fit shadow-sm">
                            <img src={editingReply!.image} alt="preview" className="max-h-64 object-cover" />
                            <button onClick={() => setEditingReply({ ...editingReply!, image: null })} className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white rounded-full p-1 hover:bg-black/70 transition-all active:scale-90"><X className="w-4 h-4" /></button>
                          </div>
                        )}
                        <div className="flex items-center mt-3 gap-2">
                          <button onClick={() => editReplyImageRef.current?.click()} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-500 transition-colors px-3 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500/10 active:scale-95">
                            <ImageIcon className="w-4 h-4" /><span>{editingReply!.image ? 'Đổi ảnh' : 'Thêm ảnh'}</span>
                          </button>
                          <input ref={editReplyImageRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (f) setEditingReply({ ...editingReply!, image: await compressImage(f) }); }} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line break-words">{reply.content}</p>
                        {reply.mediaUrls && reply.mediaUrls.length > 0 && (
                          <div className="mt-3.5 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#222] shadow-[0_2px_8px_rgb(0,0,0,0.04)] dark:shadow-none hover:opacity-95 transition-all">
                            <ImageWithFallback src={reply.mediaUrls[0]} alt="Reply image" className="w-full h-auto max-h-[500px] object-cover bg-gray-50 dark:bg-[#111]" />
                          </div>
                        )}
                      </>
                    )}

                    <div className="flex items-center gap-1.5 mt-3.5 mb-1">
                      <button onClick={() => toggleReplyLike(reply.id)} className="group p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center">
                        <Heart className={`w-[20px] h-[20px] transition-colors ${reply.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                      </button>
                      <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all active:scale-90 flex items-center justify-center"><MessageCircle className="w-[20px] h-[20px] text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" /></button>
                    </div>

                    {reply.likesCount > 0 && (
                      <div className="text-[15px] text-gray-500 dark:text-gray-400 mt-1">
                        <span>{reply.likesCount} {t?.likes || 'lượt thích'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
