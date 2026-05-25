import React from 'react';
import { Bell, BellOff, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Notifications({ notifications, markAllAsRead, setNotifications }) {
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => {
      if (n.id === id) {
        return { ...n, read: true };
      }
      return n;
    }));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Centro de Notificaciones</h2>
          <p className="text-slate-400 text-xs mt-0.5">Historial completo de alertas, audiencias inminentes y cambios de expedientes.</p>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button 
            onClick={markAllAsRead}
            className="px-3.5 py-1.5 border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all"
          >
            Marcar todo como leído
          </button>
        )}
      </div>

      {/* Notifications container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-5">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-3">
            <BellOff className="h-10 w-10 text-slate-700 mx-auto" />
            <p className="text-sm">No tienes alertas o notificaciones registradas.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-850">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`py-4 flex justify-between items-start gap-4 transition-colors px-2 rounded-lg ${
                  !notif.read ? 'bg-slate-850/15' : ''
                }`}
              >
                <div className="flex items-start space-x-3 text-xs">
                  <span className={`p-2 rounded-lg mt-0.5 ${
                    notif.title.includes('Audiencia') || notif.title.includes('Vencimiento')
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    {notif.title.includes('Audiencia') || notif.title.includes('Vencimiento') ? (
                      <ShieldAlert className="h-4.5 w-4.5" />
                    ) : (
                      <Bell className="h-4.5 w-4.5" />
                    )}
                  </span>
                  <div>
                    <h4 className={`font-semibold ${!notif.read ? 'text-white' : 'text-slate-400'}`}>{notif.title}</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed max-w-2xl">{notif.body}</p>
                    <span className="text-[10px] text-slate-600 block mt-2">{notif.time}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {!notif.read && (
                    <button 
                      onClick={() => markAsRead(notif.id)}
                      className="px-2 py-1 bg-gold-500 hover:bg-gold-600 text-slate-950 rounded text-[10px] font-bold transition-all"
                    >
                      Leído
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notif.id)}
                    className="px-2 py-1 border border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-slate-850/40 rounded text-[10px] transition-all"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
