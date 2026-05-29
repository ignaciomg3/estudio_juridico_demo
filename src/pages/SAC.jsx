import { useState } from 'react';
import sacImage from '../assets/SAC.png';
import ConnectionStatus from '../components/ConnectionStatus';

export default function SAC() {
  const [imageError, setImageError] = useState(false);

  const SAC_URL = import.meta.env.VITE_SAC_API_URL || 'https://www.justiciacordoba.gob.ar/justiciacordoba/extranet.aspx';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">SAC</h2>
          <p className="text-slate-400 text-xs mt-0.5">Estado de conexión con la API del sistema SAC.</p>
        </div>
      </div>

      <ConnectionStatus endpoint={SAC_URL} statusLabel="Estado de conexión con la API del sistema SAC" />

      <div className="mt-4 max-w-md">
        {!imageError ? (
          <img
            src={sacImage}
            alt="SAC"
            onError={() => setImageError(true)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 object-cover shadow-lg shadow-slate-950/30"
          />
        ) : (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900 px-4 py-5 text-xs text-slate-500">
            No se encontró <span className="text-slate-300">SAC.png</span> en <span className="text-slate-300">src/assets/</span>.
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Si quieres cambiar el endpoint de comprobación, define `VITE_SAC_API_URL` en el archivo `.env` del proyecto.
      </div>
    </div>
  );
}
