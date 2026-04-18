// components/admin/Dashboard.jsx
'use client';

export default function Dashboard() {
  return (
    <div className="p-6 md:p-10 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Ciao Farhan 👋</h1>
        <p className="text-zinc-400 text-lg">Benvenuto nel tuo admin personalizzato</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-emerald-400 text-sm">PROGETTI PUBBLICATI</p>
            <p className="text-6xl font-bold mt-3">12</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-emerald-400 text-sm">VISITE QUESTO MESE</p>
            <p className="text-6xl font-bold mt-3">2.4k</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-emerald-400 text-sm">CLIENTI CONTATTATI</p>
            <p className="text-6xl font-bold mt-3">8</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Progetti recenti</h2>
          {/* Qui puoi aggiungere una lista con i tuoi ultimi progetti */}
        </div>
      </div>
    </div>
  );
}