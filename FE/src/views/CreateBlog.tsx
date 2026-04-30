"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Send, Save } from 'lucide-react';

export function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('IT Passport');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đăng bài thành công! (Dữ liệu chưa được lưu vì chưa có backend)');
    router.push('/community');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/community" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại Blog
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h1 className="text-2xl font-bold text-slate-900">Viết bài mới</h1>
            <p className="text-slate-500 text-sm mt-1">Chia sẻ kiến thức và kinh nghiệm của bạn với cộng đồng.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">Tiêu đề bài viết <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề hấp dẫn..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">Chuyên mục <span className="text-red-500">*</span></label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                >
                  <option value="IT Passport">IT Passport</option>
                  <option value="FE">Fundamental Information Technology (FE)</option>
                  <option value="Tiếng Nhật">Tiếng Nhật (JLPT)</option>
                  <option value="Kinh nghiệm">Kinh nghiệm học tập</option>
                  <option value="Khác">Chủ đề khác</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700 mb-2">Thẻ Tags</label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Cách nhau bởi dấu phẩy, vd: N3, Dokkai"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Ảnh bìa</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm text-slate-600 font-medium">Nhấn để tải lên ảnh bìa</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF lên tới 5MB</p>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">Nội dung bài viết <span className="text-red-500">*</span></label>
              <textarea
                id="content"
                required
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung chi tiết..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
              ></textarea>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-4">
              <button 
                type="button" 
                className="flex items-center px-6 py-2.5 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors"
              >
                <Save className="w-5 h-5 mr-2" /> Lưu nháp
              </button>
              <button 
                type="submit" 
                className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors"
              >
                <Send className="w-5 h-5 mr-2" /> Đăng bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}