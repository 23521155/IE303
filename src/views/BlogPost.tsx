"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Repeat, Send, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

const MOCK_USER = {
  name: 'Trần Văn B',
  avatar: 'https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150',
};

const MAIN_POST = {
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
};

const INITIAL_REPLIES = [
  {
    id: 'r1',
    author: {
      id: 'user1',
      name: 'Lê Thị C',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'user',
      timeAgo: '1h'
    },
    content: 'Cảm ơn admin đã chia sẻ ạ! Cho em hỏi phần Management thường chiếm bao nhiêu câu trong đề thật vậy ạ?',
    stats: { likes: 12, comments: 1, shares: 0 },
    isLiked: true
  },
  {
    id: 'r2',
    author: {
      id: 'user2',
      name: 'Nguyễn Văn A',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      role: 'user',
      timeAgo: '45m'
    },
    content: 'Đề tháng này khó hơn tháng trước không mọi người? Mình tháng sau thi mà run quá 😥',
    stats: { likes: 5, comments: 0, shares: 0 },
    isLiked: false
  },
  {
    id: 'r3',
    author: {
      id: 'user3',
      name: 'Phạm Thị D',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      role: 'user',
      timeAgo: '10m'
    },
    content: 'Mình vừa thi xong hôm qua, confirm là phần Strategy và Management hỏi khá sâu về các case study thực tế nhé. Không chỉ học thuộc lòng là làm được đâu.',
    stats: { likes: 28, comments: 3, shares: 1 },
    isLiked: false
  }
];

export function BlogPost() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [newReplyContent, setNewReplyContent] = useState('');
  const [replies, setReplies] = useState(INITIAL_REPLIES);
  const [isLiked, setIsLiked] = useState(MAIN_POST.isLiked);
  const [likesCount, setLikesCount] = useState(MAIN_POST.stats.likes);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReplyContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleCreateReply = () => {
    if (!newReplyContent.trim()) return;
    
    const newReply = {
      id: Date.now().toString(),
      author: {
        id: 'me',
        name: MOCK_USER.name,
        avatar: MOCK_USER.avatar,
        role: 'user',
        timeAgo: t('justNow')
      },
      content: newReplyContent,
      stats: { likes: 0, comments: 0, shares: 0 },
      isLiked: false
    };

    setReplies([newReply, ...replies]);
    setNewReplyContent('');
  };

  const toggleMainLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleReplyLike = (replyId: string) => {
    setReplies(replies.map(reply => {
      if (reply.id === replyId) {
        return {
          ...reply,
          isLiked: !reply.isLiked,
          stats: {
            ...reply.stats,
            likes: reply.isLiked ? reply.stats.likes - 1 : reply.stats.likes + 1
          }
        };
      }
      return reply;
    }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex justify-center py-0 sm:py-6 px-0 sm:px-4 transition-colors duration-300">
      <div className="w-full max-w-[620px] bg-white dark:bg-[#1a1a1a] sm:rounded-3xl sm:border border-gray-200 dark:border-[#2d2d2d] sm:shadow-sm flex flex-col transition-colors duration-300 pb-10">
        
        {/* Header */}
        <div className="sticky top-[64px] bg-white/90 dark:bg-[#1a1a1a]/90 sm:rounded-t-3xl backdrop-blur-md z-10 p-4 border-b border-gray-100 dark:border-[#2d2d2d] flex items-center transition-colors duration-300">
          <Link href="/blogs" className="p-2 -ml-2 mr-2 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-gray-100" />
          </Link>
          <h1 className="font-bold text-gray-900 dark:text-gray-100 text-lg flex-1 text-center pr-8">{t('thread')}</h1>
        </div>

        {/* Main Post */}
        <div className="p-4 border-b border-gray-200/80 dark:border-[#2d2d2d]/80 transition-colors duration-300">
          <div className="flex gap-3">
            {/* Left Column */}
            <div className="flex flex-col items-center">
              <Link href={`/profile/${MAIN_POST.author.id}`}>
                <img src={MAIN_POST.author.avatar} alt={MAIN_POST.author.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100 dark:border-[#2d2d2d] hover:opacity-80 transition-opacity" />
              </Link>
            </div>

            {/* Right Column */}
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Link href={`/profile/${MAIN_POST.author.id}`} className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                    {MAIN_POST.author.name}
                  </Link>
                  {MAIN_POST.author.role === 'admin' && (
                    <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                      {t('admin')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                  <span className="text-[14px] hover:underline cursor-pointer">{MAIN_POST.author.timeAgo}</span>
                  <button className="p-1 -mr-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-900 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mt-1">
                <p className="text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 whitespace-pre-line break-words">
                  {MAIN_POST.content}
                </p>
              </div>

              {MAIN_POST.image && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2d2d2d]">
                  <ImageWithFallback 
                    src={MAIN_POST.image} 
                    alt="Post image" 
                    className="w-full h-auto max-h-[450px] object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-1 mt-3 mb-1">
                <button 
                  onClick={toggleMainLike}
                  className="group p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center"
                >
                  <Heart className={`w-[22px] h-[22px] transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white'}`} /> 
                </button>
                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center">
                  <MessageCircle className="w-[22px] h-[22px] text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white" />
                </button>
                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center">
                  <Repeat className="w-[22px] h-[22px] text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white" />
                </button>
                <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center">
                  <Send className="w-[22px] h-[22px] text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white" />
                </button>
              </div>

              {(MAIN_POST.stats.comments > 0 || likesCount > 0) && (
                <div className="flex items-center gap-2 text-[15px] text-gray-500 dark:text-gray-400 mt-1">
                  {MAIN_POST.stats.comments > 0 && <span className="hover:underline cursor-pointer">{MAIN_POST.stats.comments} {t('replies')}</span>}
                  {MAIN_POST.stats.comments > 0 && likesCount > 0 && <span>·</span>}
                  {likesCount > 0 && <span className="hover:underline cursor-pointer">{likesCount} {t('likes')}</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reply Box */}
        <div className="p-4 border-b border-gray-200 dark:border-[#2d2d2d] transition-colors duration-300">
          <div className="flex gap-3">
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="flex-1 min-w-0 pt-1">
              <div className="font-semibold text-[15px] text-gray-900 dark:text-gray-100">{MOCK_USER.name}</div>
              <textarea
                value={newReplyContent}
                onChange={handleTextareaInput}
                placeholder={`${t('replyTo')} ${MAIN_POST.author.name}...`}
                className="w-full mt-1 outline-none resize-none text-[15px] text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent min-h-[40px] leading-relaxed"
                rows={1}
              />
              <div className="flex items-center justify-between mt-2">
                <button className="p-1.5 -ml-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCreateReply}
                  disabled={!newReplyContent.trim()}
                  className="px-5 py-1.5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-30 disabled:dark:opacity-30 disabled:cursor-not-allowed text-white dark:text-black font-semibold rounded-full text-sm transition-all"
                >
                  {t('postBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies List */}
        <div className="flex flex-col">
          {replies.map((reply, index) => {
            const isLastReply = index === replies.length - 1;
            
            return (
              <div 
                key={reply.id} 
                className="p-4 border-b border-gray-200/80 dark:border-[#2d2d2d]/80 hover:bg-gray-50/50 dark:hover:bg-[#202020] transition-colors duration-300"
              >
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <Link href={`/profile/${reply.author.id}`}>
                      <img src={reply.author.avatar} alt={reply.author.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100 dark:border-[#2d2d2d] hover:opacity-80 transition-opacity" />
                    </Link>
                    {!isLastReply && (
                      <div className="w-[1.5px] bg-gray-200 dark:bg-[#333333] flex-1 mt-2 mb-1 rounded-full transition-colors duration-300"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/profile/${reply.author.id}`} className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                          {reply.author.name}
                        </Link>
                        {reply.author.role === 'admin' && (
                          <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                            {t('admin')}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                        <span className="text-[14px] hover:underline cursor-pointer">{reply.author.timeAgo}</span>
                        <button className="p-1 -mr-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded-full transition-colors">
                          <MoreHorizontal className="w-5 h-5 text-gray-900 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-1">
                      <p className="text-[15px] leading-relaxed text-gray-900 dark:text-gray-200 whitespace-pre-line break-words">
                        {reply.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 mt-3 mb-1">
                      <button 
                        onClick={() => toggleReplyLike(reply.id)}
                        className="group p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center"
                      >
                        <Heart className={`w-[22px] h-[22px] transition-colors ${reply.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white'}`} /> 
                      </button>
                      <button className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors flex items-center justify-center">
                        <MessageCircle className="w-[22px] h-[22px] text-gray-900 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white" />
                      </button>
                    </div>

                    {(reply.stats.comments > 0 || reply.stats.likes > 0) && (
                      <div className="flex items-center gap-2 text-[15px] text-gray-500 dark:text-gray-400 mt-1">
                        {reply.stats.likes > 0 && <span className="hover:underline cursor-pointer">{reply.stats.likes} {t('likes')}</span>}
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
