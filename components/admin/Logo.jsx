export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-linear-to-br  from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-inner">
        F
      </div>
      <div>
        <span className="text-2xl font-semibold tracking-tight text-white">
          Farhan
        </span>
        <span className="block text-[10px] text-gray-400 -mt-1 tracking-[1px]">
          ADMIN PANEL
        </span>
      </div>
    </div>
  );
}
