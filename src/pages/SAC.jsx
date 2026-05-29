import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

export default function SAC() {
  const [status, setStatus] = useState('checking'); // 'online' | 'offline' | 'checking'
  const [lastChecked, setLastChecked] = useState(null);

  const SAC_URL = import.meta.env.VITE_SAC_API_URL || 'https://sac.example.com/health';

  const checkConnection = async () => {
    setStatus('checking');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(SAC_URL, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        setStatus('online');
      } else {
        setStatus('offline');
      }
    } catch (err) {
      setStatus('offline');
    } finally {
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkConnection();
    // optional: poll every 30s
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const colorClass = status === 'online' ? 'bg-emerald-500' : status === 'checking' ? 'bg-amber-500' : 'bg-rose-500';
  const textLabel = status === 'online' ? 'Conectado' : status === 'checking' ? 'Comprobando...' : 'Desconectado';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">SAC</h2>
          <p className="text-slate-400 text-xs mt-0.5">Estado de conexión con la API del sistema SAC.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={checkConnection}
            className="px-3 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            Revisar ahora
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center space-x-4 max-w-md">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClass}`}>
          <Circle className="h-6 w-6 text-slate-950" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{textLabel}</div>
          <div className="text-xs text-slate-400 mt-1">Endpoint: <span className="text-slate-300 break-all">{SAC_URL}</span></div>
          {lastChecked && (
            <div className="text-xs text-slate-500 mt-1">Última comprobación: {lastChecked.toLocaleString()}</div>
          )}
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Si quieres cambiar el endpoint de comprobación, define `VITE_SAC_API_URL` en el archivo `.env` del proyecto.
      </div>
    </div>
  );
}
