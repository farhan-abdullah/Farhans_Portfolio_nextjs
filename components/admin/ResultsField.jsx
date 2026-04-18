// components/admin/ResultsField.jsx
'use client';

export default function ResultsField({ value, setValue }) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-zinc-400">Risultati ottenuti (per i clienti)</label>

      <div className="space-y-3">
        {value?.map((result, index) => (
          <div key={index} className="flex gap-4 bg-zinc-900 border border-zinc-700 rounded-2xl p-4">
            <input
              type="text"
              value={result.metric || ''}
              placeholder="Metric (es. Traffico)"
              className="flex-1 bg-transparent border-0 focus:ring-0 text-white"
              onChange={(e) => {
                const newValue = [...value];
                newValue[index].metric = e.target.value;
                setValue(newValue);
              }}
            />
            <input
              type="text"
              value={result.value || ''}
              placeholder="Valore (es. +340%)"
              className="flex-1 bg-transparent border-0 focus:ring-0 text-emerald-400"
              onChange={(e) => {
                const newValue = [...value];
                newValue[index].value = e.target.value;
                setValue(newValue);
              }}
            />
            <button
              type="button"
              onClick={() => setValue(value.filter((_, i) => i !== index))}
              className="text-red-400 hover:text-red-500 px-3"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setValue([...(value || []), { metric: '', value: '' }])}
        className="text-emerald-400 hover:text-emerald-500 text-sm font-medium flex items-center gap-2"
      >
        + Aggiungi risultato
      </button>
    </div>
  );
}