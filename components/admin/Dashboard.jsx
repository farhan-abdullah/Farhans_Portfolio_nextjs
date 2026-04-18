'use client';

export default function Dashboard() {
  return (
    <div className="p-6 md:p-10 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Ciao Farhan 👋</h1>
        <p className="text-zinc-400 text-lg">Ecco come sta andando il tuo portfolio</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-emerald-400 text-sm">PROGETTI</p>
            <p className="text-6xl font-bold mt-3">14</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-emerald-400 text-sm">VISITE OGGI</p>
            <p className="text-6xl font-bold mt-3">248</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-emerald-400 text-sm">CLIENTI CONTATTATI</p>
            <p className="text-6xl font-bold mt-3">9</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-emerald-400 text-sm">TEMPO MEDIO</p>
            <p className="text-6xl font-bold mt-3">2.8s</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Progetti recenti</h2>
          <p className="text-zinc-500">Qui vedrai i tuoi ultimi progetti (da implementare)</p>
        </div>
      </div>
    </div>
  );
}