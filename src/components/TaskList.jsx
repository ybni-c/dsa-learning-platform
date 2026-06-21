import React from 'react';

export default function TaskList({ title, tasks, onToggleTask }) {
  return (
    <div>
      <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 pl-1">
        {title}
      </h2>
      <div className="bg-white border border-slate-200 rounded-3xl p-6">
        <ul className="space-y-4 text-sm text-slate-700">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-start gap-3 group cursor-pointer" onClick={() => onToggleTask(task.id)}>
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => {}} // 避免 React 報錯，實際事件交給父層 li 處理
                className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-800 cursor-pointer" 
              /> 
              <span className={`transition-colors ${task.completed ? 'text-slate-400 line-through' : 'group-hover:text-black'}`}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}