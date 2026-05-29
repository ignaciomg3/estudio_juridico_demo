import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

export default function ConnectionStatus({ endpoint, autoRefreshMs = 30000, statusLabel = 'Conectado al endpoint' }) {
  const [status, setStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);

  const checkConnection = async () => {
    setStatus('checking');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeout);

      setStatus(response.ok ? 'online' : 'offline');
    } catch {
      setStatus('offline');
    } finally {
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, autoRefreshMs);
    return () => clearInterval(interval);
  }, [endpoint, autoRefreshMs]);

  const colorClass =
    status === 'online' ? 'bg-emerald-500' : status === 'checking' ? 'bg-amber-500' : 'bg-rose-500';
  const textLabel = status === 'online' ? 'Conectado' : status === 'checking' ? 'Comprobando...' : 'Desconectado';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center space-x-4 max-w-md">
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClass}`}>
        <Circle className="h-6 w-6 text-slate-950" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-white">{textLabel}</div>
        <div className="text-xs text-slate-400 mt-1">{statusLabel}</div>
        <div className="text-xs text-slate-400 mt-1">
          Endpoint: <span className="text-slate-300 break-all">{endpoint}</span>
        </div>
        {lastChecked && (
          <div className="text-xs text-slate-500 mt-1">Última comprobación: {lastChecked.toLocaleString()}</div>
        )}
      </div>
      <div className="ml-auto">
        <button
          type="button"
          onClick={checkConnection}
          className="px-3 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 hover:bg-slate-800"
        >
          Revisar ahora
        </button>
      </div>
    </div>
  );
}