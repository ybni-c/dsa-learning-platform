import React from 'react';

export default function CourseProgressCard({ courseId, title, chapter, progress }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#F0F4F8] flex items-center justify-center text-xl shadow-inner">
          📘
        </div>
        <div>
          <h3 className="font-bold text-xl text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">課程代碼：{courseId}</p>
        </div>
      </div>
      
      <p className="text-slate-600 mb-8 leading-relaxed">{chapter}</p>
      
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
        <span className="text-sm font-bold text-slate-700">進度</span>
        <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-slate-800 h-full rounded-full relative transition-all duration-1000ease-out" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30"></div>
          </div>
        </div>
        <span className="text-sm font-bold text-slate-700">{progress}%</span>
        <button className="ml-2 text-sm text-blue-600 font-bold hover:underline">
          繼續閱讀 →
        </button>
      </div>
    </div>
  );
}