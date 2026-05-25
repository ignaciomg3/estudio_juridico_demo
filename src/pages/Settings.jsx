import React, { useState } from 'react';
import { Save, User, Shield, Bell, Key, Scale } from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState({
    studioName: 'Estudio Jurídico Muñoz & Asociados',
    cuit: '30-71842099-2',
    address: 'Av. Corrientes 1420, Piso 10, CABA',
    phone: '+54 11 4822-1000',
    email: 'contacto@estudiomartinez.com',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyDigest: false,
    smsAlerts: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Configuraciones guardadas localmente en la demo con éxito.');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div>
        <h2 className="font-heading text-xl font-bold text-white">Configuración del Sistema</h2>
        <p className="text-slate-400 text-xs mt-0.5">Gestione la información del estudio, políticas de alertas y credenciales de usuario.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side (Col-span-2) - Studio Information Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg lg:col-span-2 space-y-4">
          <h3 className="font-heading text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-850 pb-3">
            <Scale className="h-4.5 w-4.5 text-gold-450" />
            <span>Datos Institucionales del Estudio</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Nombre del Estudio</label>
                <input 
                  type="text" 
                  value={profile.studioName}
                  onChange={(e) => setProfile({...profile, studioName: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-gold-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">CUIT Registrado</label>
                <input 
                  type="text" 
                  value={profile.cuit}
                  onChange={(e) => setProfile({...profile, cuit: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Dirección Comercial</label>
                <input 
                  type="text" 
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Teléfono de Mesa de Entradas</label>
                <input 
                  type="text" 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold">Correo Electrónico de Contacto</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 font-bold rounded-lg shadow-lg shadow-gold-500/10 flex items-center space-x-1.5 transition-all"
              >
                <Save className="h-4 w-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side (Col-span-1) - Notifications & Security */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <h3 className="font-heading text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-850 pb-3">
              <Bell className="h-4.5 w-4.5 text-cyan-400" />
              <span>Políticas de Alertas</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-350">Alertas por Email</p>
                  <p className="text-[10px] text-slate-500">Notificar audiencias y traslados.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications.emailAlerts}
                  onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})}
                  className="accent-gold-500 cursor-pointer h-4 w-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-350">Resumen Semanal</p>
                  <p className="text-[10px] text-slate-500">Informe ejecutivo cada viernes.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications.weeklyDigest}
                  onChange={(e) => setNotifications({...notifications, weeklyDigest: e.target.checked})}
                  className="accent-gold-500 cursor-pointer h-4 w-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-350">Alertas SMS / WhatsApp</p>
                  <p className="text-[10px] text-slate-500">Avisos urgentes al celular.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications.smsAlerts}
                  onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})}
                  className="accent-gold-500 cursor-pointer h-4 w-4"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <h3 className="font-heading text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-850 pb-3">
              <Key className="h-4.5 w-4.5 text-purple-400" />
              <span>Seguridad & API</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <p className="font-semibold text-slate-350">Token de Integración (Demo)</p>
                <code className="block bg-slate-950 p-2 rounded mt-2 border border-slate-850 truncate text-[10px] text-gold-450 font-mono select-all">
                  lex_demo_c89e831f0d2c4b8a92f8087
                </code>
              </div>
              <button 
                onClick={() => alert('Nueva API key generada (Simulación)')}
                className="w-full py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 text-[10px] font-bold transition-all"
              >
                Regenerar Token
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
