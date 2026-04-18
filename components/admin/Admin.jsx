// components/admin/Logo.jsx
'use client';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-800 bg-zinc-950">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
        F
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-semibold tracking-tighter text-white">Farhan</span>
        <span className="text-emerald-400 text-lg -mt-1">.dev</span>
      </div>
    </div>
  );
}