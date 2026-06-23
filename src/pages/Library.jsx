import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

export default function Library() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('bugs');
  const [communityPosts, setCommunityPosts] = useState([]);
  
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'bug',
    tags: '',
    isAnonymous: false
  });

  // 🌟 1. 初始化：同時抓取真實使用者與貼文列表
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setCurrentUser(user);
    });
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('dsa_community_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setCommunityPosts(data);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !currentUser) return;

    const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const userDisplayName = currentUser.email.split('@')[0]; // 取 Email @ 前面的字當暱稱

    const postData = {
      title: newPost.title,
      content: newPost.content,
      type: newPost.type,
      tags: tagsArray,
      is_anonymous: newPost.isAnonymous,
      author: newPost.isAnonymous ? 'Anonymous 學習者' : userDisplayName,
      avatar: newPost.isAnonymous ? '👻' : '👤',
      likes: 0,
      user_id: currentUser.id // 🌟 2. 關鍵：將這篇貼文死死綁定在當前登入使用者的 ID 上
    };

    const { error } = await supabase.from('dsa_community_posts').insert([postData]);
    
    if (!error) {
      setNewPost({ title: '', content: '', type: 'bug', tags: '', isAnonymous: false });
      setShowPostForm(false);
      fetchPosts();
    } else {
      console.error("發文失敗:", error);
    }
  };

  const handleLike = async (id, currentLikes) => {
    // 樂觀更新 (Optimistic UI)
    setCommunityPosts(communityPosts.map(post => 
      post.id === id ? { ...post, likes: currentLikes + 1 } : post
    ));

    await supabase
      .from('dsa_community_posts')
      .update({ likes: currentLikes + 1 })
      .eq('id', id);
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm("確定要刪除這篇貼文嗎？刪除後將無法恢復。");
    if (!confirmDelete) return;

    // 樂觀更新：先從畫面上瞬間移除
    setCommunityPosts(currentPosts => currentPosts.filter(post => post.id !== id));

    // 背景連線到 Supabase 進行真實刪除
    const { error } = await supabase
      .from('dsa_community_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("刪除失敗:", error);
      alert("雲端刪除失敗，請稍後再試。");
      fetchPosts(); 
    }
  };

  const getTimeAgo = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return '剛剛';
    if (diffInMinutes < 60) return `${diffInMinutes} 分鐘前`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} 小時前`;
    return `${Math.floor(diffInMinutes / 1440)} 天前`;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="pb-6 flex flex-wrap justify-between items-end border-b border-slate-100 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-2">共學社群與資源庫</h1>
            <p className="text-slate-500 text-sm tracking-wide">Community-Centered Learning Hub</p>
          </div>
          <Link to="/dashboard" className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-50 shadow-sm transition-colors">
            返回主頁
          </Link>
        </header>

        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500 opacity-20 rounded-full blur-3xl"></div>
          
          <div className="flex-1 relative z-10">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-blue-200 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Anti-Competitive Design
            </div>
            <h2 className="text-3xl font-serif mb-4">在這裡，犯錯是進步的勳章。</h2>
            <p className="text-slate-300 leading-relaxed text-sm max-w-2xl">
              本系統秉持《How People Learn》的社群中心精神，建立了一個<strong>允許「因學習而犯錯」的安全環境</strong>。請大方分享您的 Bug 與盲點，每一次跌倒，都能成為同儕最好的認知鷹架。
            </p>
          </div>
          
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <button 
              onClick={() => setShowPostForm(!showPostForm)}
              className="w-full md:w-auto bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span className="text-lg">{showPostForm ? '❌' : '✍️'}</span> 
              {showPostForm ? '取消撰寫' : '貢獻我的踩坑筆記'}
            </button>
          </div>
        </section>

        {showPostForm && (
          <section className="bg-white border-2 border-blue-200 rounded-3xl p-6 md:p-8 shadow-md animate-fade-in relative">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>📝</span> 新增社群筆記
            </h3>
            <form onSubmit={handleSubmitPost} className="space-y-5">
              <div className="flex flex-wrap sm:flex-nowrap gap-4">
                <label className="flex-1 w-full sm:w-auto cursor-pointer">
                  <input type="radio" name="postType" className="peer sr-only" checked={newPost.type === 'bug'} onChange={() => setNewPost({...newPost, type: 'bug'})} />
                  <div className="p-3 text-center rounded-xl border-2 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 text-slate-500 border-slate-200 font-bold transition-all text-sm sm:text-base">
                    🪲 踩坑筆記 (Bug)
                  </div>
                </label>
                <label className="flex-1 w-full sm:w-auto cursor-pointer">
                  <input type="radio" name="postType" className="peer sr-only" checked={newPost.type === 'share'} onChange={() => setNewPost({...newPost, type: 'share'})} />
                  <div className="p-3 text-center rounded-xl border-2 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 text-slate-500 border-slate-200 font-bold transition-all text-sm sm:text-base">
                    💡 心得分享 (Share)
                  </div>
                </label>
              </div>

              <div>
                <input required type="text" placeholder="輸入標題 (例如：永遠搞不懂的雙指標邊界...)" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 font-medium" />
              </div>
              
              <div>
                <textarea required placeholder="描述您的經驗或問題，這將成為他人的認知鷹架..." value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 min-h-[120px] resize-none"></textarea>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <input type="text" placeholder="標籤 (用逗號分隔，如：動態規劃, 求救)" value={newPost.tags} onChange={e => setNewPost({...newPost, tags: e.target.value})} className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500" />
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
                    <input type="checkbox" checked={newPost.isAnonymous} onChange={e => setNewPost({...newPost, isAnonymous: e.target.checked})} className="accent-blue-600 w-4 h-4" />
                    🛡️ 匿名發佈
                  </label>
                  <button type="submit" className="w-full sm:w-auto bg-slate-900 text-white font-bold py-2.5 px-8 rounded-xl hover:bg-blue-600 transition-colors shadow-sm">
                    送出發佈
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-full overflow-x-auto">
              {[{ id: 'bugs', label: '🪲 踩坑博物館' }, { id: 'share', label: '💡 認知鷹架' }, { id: 'all', label: '🌐 全部動態' }].map(tab => (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors flex-1 sm:flex-none text-center ${
                    activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {communityPosts.length === 0 && (
                <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 border-dashed">目前還沒有貼文，成為第一個分享的人吧！</div>
              )}
              {communityPosts
                .filter(post => activeTab === 'all' || post.type === (activeTab === 'bugs' ? 'bug' : 'share') || (activeTab === 'bugs' && post.type === 'bug'))
                .map(post => {
                  
                  // 🌟 3. 真實雲端權限判斷：這篇貼文的 user_id 是否與現在登入的 currentUser.id 相同？
                  const isMyPost = currentUser && post.user_id === currentUser.id;

                  return (
                    <div key={post.id} className="bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group">
                      <div className="flex justify-between items-start mb-4 gap-2 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl border border-slate-200 shrink-0">
                            {post.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                              {post.author}
                              {post.is_anonymous && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-normal">匿名</span>}
                              {/* 如果是自己發的，幫自己貼個標籤 */}
                              {isMyPost && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold border border-blue-100">You</span>}
                            </div>
                            <div className="text-xs text-slate-400">{getTimeAgo(post.created_at)}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {post.type === 'bug' ? (
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-100 uppercase tracking-wide">Bug 筆記</span>
                          ) : (
                            <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-100 uppercase tracking-wide">心得貢獻</span>
                          )}
                          
                          {/* 🌟 4. 只有自己的真實貼文，才會出現刪除按鈕 */}
                          {isMyPost && (
                            <button 
                              onClick={() => handleDeletePost(post.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors shrink-0"
                              title="刪除此貼文"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 flex-wrap gap-3">
                        <div className="flex flex-wrap gap-2">
                          {post.tags && post.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] sm:text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">#{tag}</span>
                          ))}
                        </div>
                        <button 
                          onClick={() => handleLike(post.id, post.likes)}
                          className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors text-sm font-bold bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-red-50"
                        >
                          <span>❤️</span> {post.likes} 
                          <span className="ml-1 hidden sm:inline text-xs font-normal">({post.type === 'bug' ? '感同身受' : '感謝貢獻'})</span>
                        </button>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-2">
                <span>🛡️</span> 匿名提問保護機制
              </h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                害怕問出太基礎的問題被笑嗎？本平台發文支援<strong>完全匿名</strong>。在這裡，不懂不是羞恥，不問才是遺憾。
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-3">HPL 理論實踐：社群中心</h4>
              <p className="text-sm text-amber-900 leading-relaxed mb-4">
                《How People Learn》強調，學習本質受到「情境」的高度影響。如果情境是高壓競爭的，學生的認知資源就會被焦慮佔據。
              </p>
              <ul className="text-xs text-amber-800 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✅</span> 
                  <span><strong>捨棄純排名競爭：</strong> 系統不設解題速度排行榜，轉而鼓勵對社群貢獻所長。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✅</span> 
                  <span><strong>建立安全環境：</strong> 設立「踩坑博物館」，讓學生知道「犯錯」是必然過程，降低防衛心態。</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}