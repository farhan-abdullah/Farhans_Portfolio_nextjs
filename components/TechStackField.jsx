
// components/admin/TechStackField.jsx
'use client';

export default function TechStackField({ value, setValue }) {
  return (
    <div className="space-y-4">
      <label className="text-zinc-400 text-sm font-medium">Tech Stack</label>
      
      <div className="flex flex-wrap gap-2">
        {value?.map((tech, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-emerald-400 rounded-2xl text-sm flex items-center gap-2"
          >
            {tech}
            <button
              type="button"
              onClick={() => setValue(value.filter((_, i) => i !== index))}
              className="text-red-400 hover:text-red-500"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="Aggiungi tecnologia (es. Next.js)"
        className="w-full bg-zinc-900 border border-zinc-700 focus:border-emerald-500 rounded-2xl px-5 py-4 text-white outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            setValue([...(value || []), e.target.value.trim()]);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}