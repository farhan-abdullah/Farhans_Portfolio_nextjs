// components/admin/ImagePreviewField.jsx
'use client';

export default function ImagePreviewField({ value, setValue, label }) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-zinc-400">{label || 'Immagine'}</label>

      <div className="grid grid-cols-2 gap-6">
        {/* Desktop Preview */}
        <div>
          <p className="text-xs text-zinc-500 mb-2">Desktop</p>
          {value?.desktop && (
            <img
              src={value.desktop.url || value.desktop}
              alt="Desktop Preview"
              className="w-full border border-zinc-700 rounded-3xl shadow-xl"
            />
          )}
        </div>

        {/* Mobile Preview */}
        <div>
          <p className="text-xs text-zinc-500 mb-2">Mobile</p>
          {value?.mobile && (
            <img
              src={value.mobile.url || value.mobile}
              alt="Mobile Preview"
              className="w-full border border-zinc-700 rounded-3xl shadow-xl max-w-[180px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}