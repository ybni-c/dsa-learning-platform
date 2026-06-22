import React from 'react';

export default function TaskList({ title, tasks, onToggleTask }) {
  // 計算進度與 XP
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const earnedXP = completedCount * 150; 
  const totalXP = totalCount * 150;

  // 動態為資料庫的純文字任務加上 HPL 教育學標籤與視覺屬性
  const enrichTaskInfo = (task, index) => {
    // 依據任務順序給予不同的理論定位 (假設前幾個是基礎，後面是挑戰或社群)
    if (index === 0) return { tag: 'Phase 3: 技能自動化', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: '⌨️', xp: 150 };
    if (index === 1) return { tag: 'Phase 4: 任務導向挑戰', color: 'text-purple-700 bg-purple-50 border-purple-200', icon: '🔥', xp: 150 };
    return { tag: '社群中心: 知識貢獻', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: '🤝', xp: 150 };
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col h-full">
      {/* 頂部標頭與進度區 */}
      <div className="flex justify-between items-start mb-6 gap-4 flex-wrap">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">
            完成任務以固化肌肉記憶並提升挫折忍受力 (AQ)
          </p>
        </div>
        
        {/* 遊戲化 XP 徽章 */}
        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-md shrink-0">
          <span className="text-lg">⭐</span>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Earned XP</div>
            <div className="font-mono font-bold text-sm leading-tight">{earnedXP} <span className="text-slate-500 text-xs">/ {totalXP}</span></div>
          </div>
        </div>
      </div>

      {/* 總進度條 */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
          <span>本週達成率</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* 任務列表區 */}
      <div className="space-y-3 flex-1">
        {tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm py-10">
            <span className="text-3xl mb-2">📭</span>
            目前沒有待辦任務
          </div>
        ) : (
          tasks.map((task, idx) => {
            const meta = enrichTaskInfo(task, idx);
            const isCompleted = task.completed;

            return (
              <div 
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                  isCompleted 
                    ? 'bg-slate-50 border-slate-200/60 opacity-60 hover:opacity-80' 
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* 互動式打勾方塊 */}
                <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                  isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300 group-hover:border-blue-400'
                }`}>
                  {isCompleted && <span className="text-white text-sm font-bold">✓</span>}
                </div>

                {/* 任務內容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${isCompleted ? 'bg-slate-200 text-slate-500 border-slate-200' : meta.color}`}>
                      {meta.icon} {meta.tag}
                    </span>
                    {!isCompleted && (
                      <span className="text-[10px] font-mono font-bold text-slate-400">+{meta.xp} XP</span>
                    )}
                  </div>
                  <h4 className={`text-sm font-bold transition-all ${
                    isCompleted ? 'text-slate-400 line-through' : 'text-slate-800 group-hover:text-blue-700'
                  }`}>
                    {task.title || task.task_name}
                  </h4>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* 底部動態回饋提示 */}
      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        {progressPercent === 100 ? (
          <p className="text-xs font-bold text-green-600 animate-fade-in">
            🎉 太棒了！您已完成本週所有挑戰，請前往「共學資源」分享您的解題筆記！
          </p>
        ) : (
          <p className="text-xs font-medium text-slate-400">
            點擊任務卡片即可切換狀態，並即時同步至雲端大腦。
          </p>
        )}
      </div>
    </div>
  );
}