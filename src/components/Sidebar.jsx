import { useState } from 'react';
import profileImg from '../assets/CarlosPerez.png';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  FileText, 
  UserCheck, 
  Settings,
  Scale
} from 'lucide-react';
// Comentadas (no eliminadas): LayoutDashboard, CreditCard, Bell, BarChart3
// import { LayoutDashboard, CreditCard, Bell, BarChart3 } from 'lucide-react';

export default function Sidebar({ currentView, setView, notificationsCount }) {
  const menuItems = [
    /* { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard }, */
    { id: 'cases', name: 'Casos', icon: Briefcase },
    { id: 'clients', name: 'Clientes', icon: Users },
    { id: 'agenda', name: 'Agenda', icon: Calendar },
    { id: 'documents', name: 'Documentos', icon: FileText },
    { id: 'users', name: 'Usuarios', icon: UserCheck },
    /* { id: 'billing', name: 'Facturación', icon: CreditCard }, */
    /* { id: 'notifications', name: 'Notificaciones', icon: Bell, badge: notificationsCount }, */
    /* { id: 'reports', name: 'Reportes', icon: BarChart3 }, */
    { id: 'settings', name: 'Configuración', icon: Settings },
  ];

  const [showImage, setShowImage] = useState(true);

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand Logo */}
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="bg-gradient-to-tr from-gold-600 to-gold-400 p-2.5 rounded-xl shadow-lg shadow-gold-500/10">
          <Scale className="h-6 w-6 text-slate-950 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="font-heading text-lg font-bold tracking-tight text-white leading-none">PÉREZ</h1>
          <span className="text-[10px] text-gold-400 font-semibold tracking-wider uppercase">Estudio Jurídico</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (item.id === 'cases' && currentView === 'case-detail');
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-gold-500/10 to-slate-800/40 text-gold-400 border-l-4 border-gold-500 pl-3' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 pl-4'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 transition-transform duration-200 ${
                  isActive ? 'text-gold-400' : 'text-slate-400 group-hover:text-white group-hover:scale-105'
                }`} />
                <span>{item.name}</span>
              </div>
              
              {item.badge > 0 && (
                <span className="bg-gold-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Quick Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {showImage ? (
              <img
                src={profileImg}
                alt="Foto Dr. Carlos Pérez"
                onError={() => setShowImage(false)}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-gold-400 border-2 border-gold-500/40"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-gold-400 ring-2 ring-gold-400 border-2 border-gold-500/40">
                CM
              </div>
            )}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Dr. Carlos Pérez</p>
            <p className="text-[10px] text-slate-500 truncate">Socio Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
