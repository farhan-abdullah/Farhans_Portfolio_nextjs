'use client';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 px-6 py-6 border-b border-zinc-800 bg-zinc-950">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg flex-shrink-0">
        F
      </div>
      <div>
        <span className="text-3xl font-semibold tracking-tighter text-white">Farhan</span>
        <span className="text-emerald-400 text-xl -mt-1 block">.dev</span>
      </div>
    </div>
  );
}