import React, { useState } from 'react';
import { Search, UserCheck, Shield, Mail, Key, Circle } from 'lucide-react';
import { usersList } from '../data/mockData';

export default function Users() {
  const [users, setUsers] = useState(usersList);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'online' ? 'offline' : 'online';
        return {
          ...u,
          status: newStatus,
          lastConnection: newStatus === 'online' ? 'Ahora mismo' : 'Hace unos instantes'
        };
      }
      return u;
    }));
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Administrador':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'Abogado':
        return 'bg-gold-500/10 text-gold-400 border border-gold-500/20';
      case 'Secretario':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      case 'Recepción':
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div>
        <h2 className="font-heading text-xl font-bold text-white">Equipo & Permisos</h2>
        <p className="text-slate-400 text-xs mt-0.5">Gestione los accesos de los profesionales jurídicos y secretarios administrativos.</p>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar integrantes por nombre o rol..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-350 placeholder-slate-500 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>
        <div className="text-[11px] text-slate-550 flex items-center space-x-2">
          <Circle className="h-3 w-3 fill-emerald-500 text-emerald-500" />
          <span>{users.filter(u => u.status === 'online').length} en línea actualmente</span>
        </div>
      </div>

      {/* Users Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-850 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                <th className="py-4 px-5">Integrante</th>
                <th className="py-4 px-5">Rol Comercial</th>
                <th className="py-4 px-5">Correo Electrónico</th>
                <th className="py-4 px-5">Permiso Sistema</th>
                <th className="py-4 px-5">Conexión</th>
                <th className="py-4 px-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No se encontraron miembros del equipo.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-850/20 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-9 w-9 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center font-bold text-slate-300">
                            {member.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-slate-900 ${
                            member.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'
                          }`}></span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200">{member.name}</div>
                          <div className="text-[10px] text-slate-550 mt-0.5">ID: L-00{member.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${getRoleBadge(member.role)}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-600" />
                        <span>{member.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-300">
                      <div className="flex items-center space-x-1.5">
                        <Shield className="h-3.5 w-3.5 text-gold-500/70" />
                        <span>{member.permissions}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-500 font-medium">
                      {member.lastConnection}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <button 
                        onClick={() => toggleUserStatus(member.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                          member.status === 'online'
                            ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20' 
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {member.status === 'online' ? 'Simular desconexión' : 'Simular conexión'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
