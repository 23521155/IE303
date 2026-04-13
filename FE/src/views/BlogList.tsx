"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Repeat, Send, MoreHorizontal, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

const MOCK_USER = {
  name: 'Trần Văn B',
  avatar: 'https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150',
};

const INITIAL_POSTS = [
  {
    id: '1',
    author: {
      id: 'admin',
      name: 'Trần Văn B',
      avatar: 'https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150',
      role: 'admin',
      timeAgo: '2h'
    },
    content: 'Chúc mừng 50 bạn học viên đã xuất sắc vượt qua kỳ thi IT Passport tháng này! 🎉\n\nDưới đây là một số bí kíp ôn tập phần "Management" mà các bạn đạt điểm cao đã chia sẻ. Mọi người lưu lại để học nhé!',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1080',
    stats: { likes: 124, comments: 45, shares: 12 },
    isLiked: false
  },
  {
    id: '2',
    author: {
      id: 'user1',
      name: 'Lê Thị C',
      avatar: 'https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150',
      role: 'user',
      timeAgo: '5h'
    },
    content: 'Có ai đang ôn thi JLPT N3 không ạ? Em bị mắc phần Đọc hiểu (Dokkai) quá, đọc mãi mà không bắt được Keyword. Mọi người có tips nào không chia sẻ cho em với 😭',
    image: null,
    stats: { likes: 32, comments: 18, shares: 2 },
    isLiked: true
  },
  {
    id: '3',
    author: {
      id: 'system',
      name: 'Hệ thống',
      avatar: 'https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150',
      role: 'admin',
      timeAgo: '1d'
    },
    content: '🔥 CẬP NHẬT ĐỀ THI MỚI 🔥\n\nHệ thống vừa cập nhật thêm 3 đề thi thử FE (Fundamental Information Technology) bám sát cấu trúc đề thi mới nhất năm 2024. \n\nCác bạn vào phần "Đề Thi" để làm ngay nhé! Chúc mọi người ôn tập tốt 📚',
    image: 'https://images.unsplash.com/photo-1758612214917-81d7956c09de?w=1080',
    stats: { likes: 356, comments: 89, shares: 45 },
    isLiked: false
  }
];

export function BlogList() {
  const { t } = useLanguage();
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Infinite scroll states
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Intersection Observer for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Load more posts when page changes
  useEffect(() => {
    if (page === 1) return;

    setLoading(true);
    const timer = setTimeout(() => {
      const newPosts = Array.from({ length: 3 }).map((_, i) => {
        const postNum = page * 3 + i;
        return {
          id: `gen-${page}-${Date.now()}-${i}`,
          author: {
            id: `user-${postNum}`,
            name: `Thành viên ẩn danh ${postNum}`,
            avatar: `https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150`,
            role: 'user',
            timeAgo: `${page + 1}d`
          },
          content: `Đây là bài đăng mẫu số ${postNum} được tự động tải thêm khi bạn cuộn xuống. \n\nSử dụng giao diện tinh gọn giống Threads giúp bạn đọc được tập trung hơn vào nội dung văn bản, cả trên chế độ Sáng (Light mode) và Tối (Dark mode)! 🌙✨`,
          image: null,
          stats: { 
            likes: Math.floor(Math.random() * 50) + 1, 
            comments: Math.floor(Math.random() * 20), 
            shares: Math.floor(Math.random() * 5) 
          },
          isLiked: false
        };
      });

      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setLoading(false);
      
      if (page >= 5) setHasMore(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [page]);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      author: {
        id: 'me',
        name: MOCK_USER.name,
        avatar: MOCK_USER.avatar,
        role: 'admin',
        timeAgo: t('justNow')
      },
      content: newPostContent,
      image: null,
      stats: { likes: 0, comments: 0, shares: 0 },
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          stats: {
            ...post.stats,
            likes: post.isLiked ? post.stats.likes - 1 : post.stats.likes + 1
          }
        };
      }
      return post;
    }));
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex justify-center py-0 sm:py-6 px-0 sm:px-4 transition-colors duration-300">
      <div className="w-full max-w-[620px] bg-white dark:bg-[#1a1a1a] sm:rounded-3xl sm:border border-gray-200 dark:border-[#2d2d2d] sm:shadow-sm flex flex-col transition-colors duration-300 pb-10">
        
        {/* Header */}
        <div className="sticky top-[64px] bg-white/90 dark:bg-[#1a1a1a]/90 sm:rounded-t-3xl backdrop-blur-md z-10 p-4 border-b border-gray-100 dark:border-[#2d2d2d] flex items-center justify-center transition-colors duration-300">
          <h1 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{t('community')}</h1>
        </div>

        {/* Create Post Box */}
        <div className="p-4 border-b border-gray-200 dark:border-[#2d2d2d] transition-colors duration-300">
          <div className="flex gap-3">
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="flex-1 min-w-0 pt-1">
              <div className="font-semibold text-[15px] text-gray-900 dark:text-gray-100">{MOCK_USER.name}</div>
              <textarea
                value={newPostContent}
                onChange={handleTextareaInput}
                placeholder={t('whatsNew')}
                className="w-full mt-1 outline-none resize-none text-[15px] text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent min-h-[40px] leading-relaxed"
                rows={1}
              />
              <div className="flex items-center justify-between mt-2">
                <button className="p-1.5 -ml-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="px-5 py-1.5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-30 disabled:dark:opacity-30 disabled:cursor-not-allowed text-white dark:text-black font-semibold rounded-full text-sm transition-all"
                >
                  {t('postBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="flex flex-col">
          {posts.map((post, index) => {
            const isLastElement = index === posts.length - 1;
            
            return (
              <div 
                key={post.id} 
                ref={isLastElement ? lastPostElementRef : null}
                className="p-4 border-b border-gray-200/80 dark:border-[#2d2d2d]/80 hover:bg-gray-50/50 dark:hover:bg-[#202020] transition-colors duration-300"
              >
                <div className="flex gap-3">
                  {/* Left Column (Avatar + Thread line) */}
                  <div className="flex flex-col items-center">
                    <Link href={`/profile/${post.author.id}`}>
                      <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100 dark:border-[#2d2d2d] hover:opacity-80 transition-opacity" />
                    </Link>
                    <div className="w-[1.5px] bg-gray-200 dark:bg-[#333333] flex-1 mt-2 mb-1 rounded-full transition-colors duration-300"></div>
                  </div>

                  {/* Right Column (Content) */}
                  <div className="flex-1 min-w-0 pb-1">
                    {/* Post Header */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/profile/${post.author.id}`} className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                          {post.author.name}
                        </Link>
                        {post.author.role === 'admin' && (
                          <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                            {t('admin')}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                        <span className="text-[14px] hover:underline cursor-pointer">{post.author.timeAgo}</span>
                        <button className="p-1 -mr-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded-full transition-colors">
                          <MoreHorizontal className="w-5 h-5 text-gray-900 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Post Content */}
                    <Link href={`/blogs/${post.id}`} className="mt-1 block group/content">
                      <p className="text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 whitespace-pre-line break-words group-hover/content:text-gray-600 dark:group-hover/content:text-gray-300 transition-colors">
                        {post.content}
                      </p>
                    </Link>

                    {/* Post Image */}
                    {post.image && (
                      <Link href={`/blogs/${post.id}`} className="mt-3 block rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2d2d2d]">
                        <ImageWithFallback 
                          src={post.image} 
                          alt="Post image" 
                          className="w-full h-auto max-h-[450px] object-cover"
                        />
                      </Link>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center gap-1 mt-3 mb-1">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className="group p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center"
                      >
                        <Heart className={`w-[22px] h-[22px] transition-colors ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white'}`} /> 
                      </button>
                      <Link href={`/blogs/${post.id}`} className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center">
                        <MessageCircle className="w-[22px] h-[22px] text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white" />
                      </Link>
                      <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center">
                        <Repeat className="w-[22px] h-[22px] text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white" />
                      </button>
                      <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center">
                        <Send className="w-[22px] h-[22px] text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white" />
                      </button>
                    </div>

                    {/* Post Stats */}
                    {(post.stats.comments > 0 || post.stats.likes > 0) && (
                      <div className="flex items-center gap-2 text-[15px] text-gray-500 dark:text-gray-400 mt-1">
                        {post.stats.comments > 0 && <span className="hover:underline cursor-pointer">{post.stats.comments} {t('replies')}</span>}
                        {post.stats.comments > 0 && post.stats.likes > 0 && <span>·</span>}
                        {post.stats.likes > 0 && <span className="hover:underline cursor-pointer">{post.stats.likes} {t('likes')}</span>}
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
        
        {/* End of feed message */}
        {!hasMore && (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-[15px]">
            {t('endOfFeed')}
          </div>
        )}
        
      </div>
    </div>
  );
}