import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Mail, Phone, Shield, FileText, UserPlus, X } from 'lucide-react';

export default function Clients({ clients, setClients, setView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Client Form
  const [newClient, setNewClient] = useState({
    name: '',
    dni: '',
    phone: '',
    email: '',
    status: 'Activo'
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClient = (e) => {
    e.preventDefault();
    const clientToAdd = {
      id: clients.length + 1,
      name: newClient.name,
      dni: newClient.dni,
      phone: newClient.phone,
      email: newClient.email,
      casesCount: 0,
      status: newClient.status
    };

    setClients([...clients, clientToAdd]);
    setShowAddModal(false);
    // Reset Form
    setNewClient({ name: '', dni: '', phone: '', email: '', status: 'Activo' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Directorio de Clientes</h2>
          <p className="text-slate-400 text-xs mt-0.5">Gestione la base de datos de patrocinados e información de contacto.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 text-xs font-semibold rounded-lg shadow-lg shadow-gold-500/10 flex items-center space-x-1.5 transition-all duration-200"
        >
          <UserPlus className="h-4 w-4" />
          <span>Registrar Cliente</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, documento, correo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-350 placeholder-slate-500 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>
        <div className="text-[11px] text-slate-500">
          Total: <span className="text-gold-400 font-bold">{filteredClients.length}</span> clientes encontrados
        </div>
      </div>

      {/* Grid of Clients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div 
            key={client.id} 
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <h3 className="font-heading font-bold text-white text-sm">{client.name}</h3>
                  <p className="text-[10px] text-slate-550 font-semibold">{client.dni}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  client.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {client.status}
                </span>
              </div>

              <hr className="border-slate-850" />

              {/* Body Info */}
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-slate-600" />
                  <span>{client.phone || 'Sin teléfono'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3.5 w-3.5 text-slate-600" />
                  <span className="truncate">{client.email || 'Sin correo'}</span>
                </div>
              </div>
            </div>

            {/* Footer stats */}
            <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-850">
              <span className="text-[10px] text-slate-550 flex items-center space-x-1">
                <FileText className="h-3.5 w-3.5 text-gold-450" />
                <span>{client.casesCount} Expedientes</span>
              </span>
              <button 
                onClick={() => {
                  if(client.casesCount > 0) {
                    setView('cases');
                    // In a real app we'd pre-filter cases for this client
                  } else {
                    alert('Este cliente no posee causas registradas actualmente.');
                  }
                }}
                className="text-[11px] text-gold-400 hover:text-gold-300 font-semibold transition-colors"
              >
                Ver Causas &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
                <h3 className="font-heading font-bold text-white text-sm">Registrar Nuevo Cliente</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-850 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateClient} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Nombre Completo o Razón Social</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Gómez, María Laura"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-655 focus:outline-none focus:border-gold-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">DNI / CUIT</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. DNI 30.123.456"
                    value={newClient.dni}
                    onChange={(e) => setNewClient({...newClient, dni: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-655 focus:outline-none focus:border-gold-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Teléfono de Contacto</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. +54 11 5000-0000"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-655 focus:outline-none focus:border-gold-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Ej. cliente@correo.com"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-655 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Estado Inicial</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t border-slate-850">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-800 hover:bg-slate-850 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 font-bold rounded-lg shadow-lg shadow-gold-500/10 transition-all"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
