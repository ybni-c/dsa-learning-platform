import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Library() {
  const [activeTab, setActiveTab] = useState('bugs'); // 預設顯示「踩坑博物館」

  // 模擬社群貢獻的資料 (重點：強調犯錯與分享，而非完美的解答)
  const communityPosts = [
    {
      id: 1,
      type: 'bug',
      author: 'Jamie',
      avatar: '👩‍💻',
      title: 'DP 陣列忘記初始化的血淚史',
      content: '昨天解 Climbing Stairs，卡了三個小時，才發現 dp[0] 沒有設成 1，導致後面全部變成 NaN。大家記得 DP 陣列的 Base Case 一定要先給值啊！😭',
      tags: ['動態規劃', '粗心失誤'],
      likes: 24,
      isAnonymous: false
    },
    {
      id: 2,
      type: 'share',
      author: 'Alex (You)',
      avatar: '👤',
      title: '火車座位譬喻法真的很有用',
      content: '剛剛在虛擬教室學到用「火車連號座位」來理解 Array 的連續記憶體，突然就懂了為什麼 Array 插入新資料的時間複雜度是 O(n)。分享給大家！',
      tags: ['學習心得', '陣列'],
      likes: 15,
      isAnonymous: false
    },
    {
      id: 3,
      type: 'bug',
      author: 'Anonymous 學習者',
      avatar: '👻',
      title: '永遠搞不懂的雙指標邊界',
      content: '每次寫 While(left <= right) 還是 While(left < right) 都會跑出無限迴圈，最後只能通通試一次交卷。有沒有人有好的判斷直覺可以分享？',
      tags: ['求救', '雙指標'],
      likes: 42,
      isAnonymous: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* 頂部標頭與導航 */}
        <header className="pb-6 flex justify-between items-end border-b border-slate-100">
          <div>
            <h1 className="text-4xl font-serif text-slate-900 mb-2">共學社群與資源庫</h1>
            <p className="text-slate-500 text-sm tracking-wide">
              Community-Centered Learning Hub
            </p>
          </div>
          <Link to="/dashboard" className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-50 shadow-sm transition-colors">
            返回主頁
          </Link>
        </header>

        {/* 🌟 核心理念宣導區 (Safe Environment 建立) */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500 opacity-20 rounded-full blur-3xl"></div>
          
          <div className="flex-1 relative z-10">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-blue-200 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Anti-Competitive Design
            </div>
            <h2 className="text-3xl font-serif mb-4">在這裡，犯錯是進步的勳章。</h2>
            <p className="text-slate-300 leading-relaxed text-sm max-w-2xl">
              傳統平台用「擊敗了全球 99% 的使用者」來製造焦慮。但本系統秉持《How People Learn》的社群中心精神，我們不設排行榜。我們建立了一個<strong>允許「因學習而犯錯」的安全環境</strong>。請大方分享您的 Bug 與盲點，您的每一次跌倒，都能成為同儕最好的認知鷹架。
            </p>
          </div>
          
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <span className="text-lg">✍️</span> 貢獻我的踩坑筆記
            </button>
          </div>
        </section>

        {/* 社群動態區塊 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* 左側：過濾與貼文列表 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 標籤切換 */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl inline-flex w-full sm:w-auto overflow-x-auto">
              {[
                { id: 'bugs', label: '🪲 踩坑博物館 (Bug Hall of Fame)' },
                { id: 'share', label: '💡 認知鷹架分享 (Knowledge Share)' },
                { id: 'all', label: '🌐 全部動態 (All Activity)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 貼文卡片渲染 */}
            <div className="space-y-4">
              {communityPosts
                .filter(post => activeTab === 'all' || post.type === (activeTab === 'bugs' ? 'bug' : 'share') || (activeTab === 'bugs' && post.type === 'bug'))
                .map(post => (
                <div key={post.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl border border-slate-200">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          {post.author}
                          {post.isAnonymous && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-normal">匿名保護機制</span>}
                        </div>
                        <div className="text-xs text-slate-400">剛剛發佈</div>
                      </div>
                    </div>
                    {post.type === 'bug' ? (
                      <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-100 uppercase tracking-wide">Bug 求救 / 分享</span>
                    ) : (
                      <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-100 uppercase tracking-wide">心得貢獻</span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.content}</p>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">#{tag}</span>
                      ))}
                    </div>
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors text-sm font-medium">
                      <span>❤️</span> {post.likes} 
                      <span className="ml-1 hidden sm:inline">({post.type === 'bug' ? '感同身受' : '感謝貢獻'})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* 右側：側邊欄 (HPL 理論實踐說明) */}
          <div className="space-y-6">
            
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-2">
                <span>🛡️</span> 匿名提問保護機制
              </h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                害怕問出太基礎的問題被笑嗎？本平台支援<strong>完全匿名發問</strong>。在這裡，不懂不是羞恥，不問才是遺憾。
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
                  <span><strong>建立安全環境：</strong> 設立「踩坑博物館」，讓學生知道「犯錯」是漸進正式化必經的過程，降低防衛心態 (Risk-taking)。</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}