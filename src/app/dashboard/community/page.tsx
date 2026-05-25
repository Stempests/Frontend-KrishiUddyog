'use client';
import React, { useState, useEffect } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { Users, Search, MessageCircle, Heart, Share2, Award, TrendingUp, ChevronRight, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/ui/Toast';

export default function CommunityPage() {
  const { t } = useLanguageStore();
  const { user } = useAuthStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState<string | null>(null);
  const toast = useToast();

  const fetchPosts = async () => {
    try {
      const res = await api.get('/community');
      if (res.data?.data) {
        setDiscussions(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    
    setIsSubmitting(true);
    try {
      const tagsArray = newPost.tags.split(',').map(t => t.trim()).filter(Boolean);
      await api.post('/community', {
        title: newPost.title,
        content: newPost.content,
        tags: tagsArray
      });
      toast.success('Post created successfully!');
      setIsModalOpen(false);
      setNewPost({ title: '', content: '', tags: '' });
      fetchPosts();
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await api.post(`/community/${postId}/like`);
      if (res.data?.success) {
        setDiscussions(prev => prev.map(p => {
          if (p._id === postId) {
            return { ...p, likes: res.data.data.likes, likedBy: res.data.data.likedBy };
          }
          return p;
        }));
      }
    } catch (error) {
      toast.error('Failed to toggle like');
    }
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!commentText.trim()) return;
    
    setIsCommenting(postId);
    try {
      const res = await api.post(`/community/${postId}/comment`, { content: commentText });
      if (res.data?.success) {
        setDiscussions(prev => prev.map(p => {
          if (p._id === postId) {
            const comments = p.comments ? [...p.comments, res.data.data] : [res.data.data];
            return { ...p, replies: res.data.replies, comments };
          }
          return p;
        }));
        setCommentText('');
      }
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsCommenting(null);
    }
  };

  const experts = [
    { name: 'Dr. Anita Desai', specialty: 'Pest Management', rating: '4.9', cases: 1200 },
    { name: 'Vikram Singh', specialty: 'Organic Farming', rating: '4.8', cases: 850 },
    { name: 'Dr. M. Sharma', specialty: 'Soil Health', rating: '5.0', cases: 2100 },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(63,163,77,0.15)', color: '#3FA34D' }}>
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Farmer Community</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Connect, ask questions, and share knowledge with fellow farmers and experts.</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2 px-6">
          <MessageCircle size={18} /> New Post
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Search */}
          <div className="glass-card p-4 flex justify-between items-center gap-4">
            <h2 className="font-bold text-lg text-gray-800 hidden sm:block">Community Feed</h2>
            <div className="relative w-full sm:w-72 ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search topics or posts..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-800"
              />
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin text-green-600" size={32} />
                </div>
              ) : discussions.length === 0 ? (
                <div className="text-center text-gray-500 py-10 glass-card">
                  <p>No discussions yet. Be the first to post!</p>
                </div>
              ) : (
                discussions.map((post) => (
                  <div key={post._id} className={`glass-card p-5 transition-all hover:shadow-md ${post.isExpert ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl overflow-hidden flex-shrink-0">
                          {post.author?.avatar ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={post.author.avatar} alt={post.author.name} className="object-cover w-full h-full" />
                          ) : (
                            post.author?.role === 'Farmer' ? '👨🏽‍🌾' : '👩🏽‍🔬'
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 flex items-center gap-2">
                            {post.author?.name || 'Unknown User'} 
                            {post.isExpert && <Award size={14} className="text-blue-500" />}
                          </div>
                          <div className="text-xs text-gray-500">
                            {post.author?.role || 'User'} • {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.content}</p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-xs rounded-md font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-6 pt-3 border-t border-gray-100 text-gray-500 text-sm font-medium">
                      <button 
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center gap-1.5 transition-colors ${post.likedBy?.includes(user?._id) ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                      >
                        <Heart size={16} className={post.likedBy?.includes(user?._id) ? 'fill-current' : ''} /> {post.likes || 0}
                      </button>
                      <button 
                        onClick={() => setExpandedPostId(expandedPostId === post._id ? null : post._id)}
                        className={`flex items-center gap-1.5 transition-colors ${expandedPostId === post._id ? 'text-blue-600' : 'hover:text-blue-600'}`}
                      >
                        <MessageCircle size={16} /> {post.replies || 0} Replies
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-gray-800 transition-colors ml-auto">
                        <Share2 size={16} /> Share
                      </button>
                    </div>

                    {/* Expandable Comments Section */}
                    {expandedPostId === post._id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                        {post.comments && post.comments.length > 0 ? (
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          post.comments.map((comment: any) => (
                            <div key={comment._id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-green-50 flex-shrink-0">
                                {comment.author?.avatar ? (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img src={comment.author.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-sm">{comment.author?.role === 'Farmer' ? '👨🏽‍🌾' : '👩🏽‍🔬'}</div>
                                )}
                              </div>
                              <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-3 text-sm">
                                <div className="font-bold text-gray-800 mb-1">{comment.author?.name || 'Unknown User'}</div>
                                <p className="text-gray-600">{comment.content}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-sm text-gray-400 py-2">No replies yet. Be the first!</div>
                        )}
                        
                        <div className="flex gap-3 items-center mt-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-green-50 flex-shrink-0">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(user as any)?.avatar ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={(user as any).avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm">👨🏽‍🌾</div>
                            )}
                          </div>
                          <div className="flex-1 relative">
                            <input 
                              type="text" 
                              placeholder="Write a reply..." 
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleCommentSubmit(post._id);
                              }}
                              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-800"
                            />
                            <button 
                              onClick={() => handleCommentSubmit(post._id)}
                              disabled={isCommenting === post._id || !commentText.trim()}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-700 disabled:opacity-50 flex items-center justify-center p-1"
                            >
                              {isCommenting === post._id ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
        </div>


      </div>

      {/* New Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle className="text-green-600" /> Create New Post
            </h2>
            
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ask a question or share advice..." 
                  className="input-field w-full text-gray-800"
                  value={newPost.title}
                  onChange={e => setNewPost({...newPost, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Content *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe your issue or share your experience in detail..." 
                  className="input-field w-full resize-none text-gray-800"
                  value={newPost.content}
                  onChange={e => setNewPost({...newPost, content: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tags (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Wheat, Fertilizer, Pest Control (comma separated)" 
                  className="input-field w-full text-gray-800 text-sm"
                  value={newPost.tags}
                  onChange={e => setNewPost({...newPost, tags: e.target.value})}
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />}
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
