import { Fragment, useState } from 'react';
import { Search, Bell, ChevronRight, LogOut, Settings, User } from 'lucide-react';

export default function Header({ currentView, setView, notifications, markAllAsRead }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const getBreadcrumb = () => {
    const crumbs = [{ label: 'Muñoz', action: () => setView('dashboard') }];
    
    switch (currentView) {
      case 'dashboard':
        crumbs.push({ label: 'Dashboard' });
        break;
      case 'cases':
        crumbs.push({ label: 'Casos' });
        break;
      case 'case-detail':
        crumbs.push({ label: 'Casos', action: () => setView('cases') });
        crumbs.push({ label: 'Detalle de Expediente' });
        break;
      case 'clients':
        crumbs.push({ label: 'Clientes' });
        break;
      case 'agenda':
        crumbs.push({ label: 'Agenda & Calendario' });
        break;
      case 'documents':
        crumbs.push({ label: 'Documentos' });
        break;
      case 'users':
        crumbs.push({ label: 'Usuarios y Roles' });
        break;
      case 'billing':
        crumbs.push({ label: 'Facturación' });
        break;
      case 'notifications':
        crumbs.push({ label: 'Notificaciones' });
        break;
      case 'reports':
        crumbs.push({ label: 'Reportes y Estadísticas' });
        break;
      case 'settings':
        crumbs.push({ label: 'Configuración' });
        break;
      default:
        crumbs.push({ label: 'Inicio' });
    }
    return crumbs;
  };

  const crumbs = getBreadcrumb();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 h-16 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-slate-400">
        {crumbs.map((crumb, idx) => (
          <Fragment key={idx}>
            {idx > 0 && <ChevronRight className="h-4 w-4 text-slate-600" />}
                {crumb.action ? (
                  <button 
                    onClick={crumb.action} 
                    className="hover:text-gold-400 font-medium transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-white font-semibold">{crumb.label}</span>
                )}
              </Fragment>
        ))}
      </div>

      {/* Global Actions */}
      <div className="flex items-center space-x-4">
        {/* Search bar */}
        <div className="relative w-64 max-md:hidden">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar expedientes, clientes..." 
            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotificationsDropdown(!showNotificationsDropdown);
              setShowProfileDropdown(false);
            }}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-850 rounded-lg transition-all relative"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-gold-500 ring-2 ring-slate-900"></span>
            )}
          </button>

          {showNotificationsDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-850 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Notificaciones Recientes</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => {
                      markAllAsRead();
                      setShowNotificationsDropdown(false);
                    }}
                    className="text-[10px] text-gold-400 hover:text-gold-300 font-semibold"
                  >
                    Marcar leídas
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-850">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">Sin notificaciones nuevas.</div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-3 text-left transition-colors hover:bg-slate-850/50 ${!notif.read ? 'bg-slate-850/20' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <p className={`text-xs font-medium ${!notif.read ? 'text-white' : 'text-slate-400'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[9px] text-slate-500 font-light">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{notif.body}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 bg-slate-950 border-t border-slate-850 text-center">
                <button 
                  onClick={() => {
                    setView('notifications');
                    setShowNotificationsDropdown(false);
                  }}
                  className="text-[11px] text-gold-400 hover:text-gold-300 font-medium inline-block w-full"
                >
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <span className="h-6 w-[1px] bg-slate-800"></span>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotificationsDropdown(false);
            }}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-gold-600 to-gold-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-gold-500/5">
              CM
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 py-1">
              <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/40">
                <p className="text-xs font-semibold text-white">Dr. Carlos Muñoz</p>
                <p className="text-[10px] text-slate-500">Socio Administrador</p>
              </div>
              <button 
                onClick={() => {
                  setView('settings');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 text-left transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                <span>Mi Perfil</span>
              </button>
              <button 
                onClick={() => {
                  setView('settings');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 text-left transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Configuración</span>
              </button>
              <div className="border-t border-slate-800 my-1"></div>
              <button 
                onClick={() => alert('Cierre de sesión simulado')}
                className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 text-left transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
