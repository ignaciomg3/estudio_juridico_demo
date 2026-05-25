import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, CreditCard, DollarSign, Calendar, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { stats } from '../data/mockData';

export default function Billing({ invoices, setInvoices }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Invoice Form
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    amount: '',
    status: 'Pendiente',
    date: new Date().toISOString().split('T')[0],
    dueDate: ''
  });

  // Calculate Metrics based on state
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const collected = invoices.filter(i => i.status === 'Cobrado').reduce((acc, curr) => acc + curr.amount, 0);
  const pending = invoices.filter(i => i.status === 'Pendiente').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingCount = invoices.filter(i => i.status === 'Pendiente').length;

  const filteredInvoices = invoices.filter(item => {
    const matchesSearch = item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (!newInvoice.client || !newInvoice.amount || !newInvoice.dueDate) return;

    const invoiceToAdd = {
      id: `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      client: newInvoice.client,
      amount: parseFloat(newInvoice.amount),
      status: newInvoice.status,
      date: newInvoice.date,
      dueDate: newInvoice.dueDate
    };

    setInvoices([invoiceToAdd, ...invoices]);
    setShowAddModal(false);
    // Reset Form
    setNewInvoice({
      client: '',
      amount: '',
      status: 'Pendiente',
      date: new Date().toISOString().split('T')[0],
      dueDate: ''
    });
  };

  const handleCollectInvoice = (id) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        return { ...inv, status: 'Cobrado' };
      }
      return inv;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Facturación & Finanzas</h2>
          <p className="text-slate-400 text-xs mt-0.5">Controle cobros, honorarios devengados y emisión de boletas de servicios.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 text-xs font-semibold rounded-lg shadow-lg shadow-gold-500/10 flex items-center space-x-1.5 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Emitir Factura</span>
        </button>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Facturado</span>
            <DollarSign className="h-4.5 w-4.5 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">${totalBilled.toLocaleString()} USD</p>
          <p className="text-[10px] text-slate-500">Volumen total emitido en la demo</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Cobrado (Honorarios Realizados)</span>
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-450" />
          </div>
          <p className="text-2xl font-bold text-emerald-400">${collected.toLocaleString()} USD</p>
          <p className="text-[10px] text-slate-550">Fondos acreditados en cuentas bancarias</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pendiente de Pago</span>
            <AlertCircle className="h-4.5 w-4.5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-400">${pending.toLocaleString()} USD</p>
          <p className="text-[10px] text-slate-500">{pendingCount} facturas pendientes de cobro</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar por cliente o factura..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-350 placeholder-slate-500 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent border-none text-xs text-slate-400 focus:ring-0 focus:outline-none cursor-pointer w-full md:w-auto"
          >
            <option value="All" className="bg-slate-900 text-slate-350">Todos los Estados</option>
            <option value="Cobrado" className="bg-slate-900 text-slate-350">Cobrado</option>
            <option value="Pendiente" className="bg-slate-900 text-slate-350">Pendiente</option>
            <option value="Cargado / Borrador" className="bg-slate-900 text-slate-350">Cargado / Borrador</option>
          </select>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-850 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                <th className="py-4 px-5">Boleta / Factura</th>
                <th className="py-4 px-5">Cliente</th>
                <th className="py-4 px-5">Importe</th>
                <th className="py-4 px-5">Fecha Emisión</th>
                <th className="py-4 px-5">Fecha Vto.</th>
                <th className="py-4 px-5">Estado</th>
                <th className="py-4 px-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-xs">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No se encontraron facturas.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-850/20 transition-colors">
                    <td className="py-4 px-5 font-bold text-white">
                      {inv.id}
                    </td>
                    <td className="py-4 px-5 text-slate-300 font-semibold">
                      {inv.client}
                    </td>
                    <td className="py-4 px-5 font-bold text-white">
                      ${inv.amount.toLocaleString()} USD
                    </td>
                    <td className="py-4 px-5 text-slate-550">
                      {inv.date}
                    </td>
                    <td className="py-4 px-5 text-slate-550">
                      {inv.dueDate}
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        inv.status === 'Cobrado' ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20' :
                        inv.status === 'Pendiente' ? 'bg-amber-500/10 text-amber-450 border border-amber-500/20' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      {inv.status === 'Pendiente' ? (
                        <button
                          onClick={() => handleCollectInvoice(inv.id)}
                          className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded text-[10px] transition-colors"
                        >
                          Registrar Cobro
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-600 font-bold uppercase">Confirmado</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Invoice Modal */}
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
                <h3 className="font-heading font-bold text-white text-sm">Emitir Nueva Boleta Financiera</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-850 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Cliente Destinatario</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Gómez, María Laura"
                    value={newInvoice.client}
                    onChange={(e) => setNewInvoice({...newInvoice, client: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Importe (USD)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="Ej. 1500"
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Fecha de Vencimiento</label>
                    <input 
                      type="date" 
                      required
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Estado</label>
                  <select
                    value={newInvoice.status}
                    onChange={(e) => setNewInvoice({...newInvoice, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    <option value="Pendiente">Pendiente (A cobrar)</option>
                    <option value="Cobrado">Cobrado (Acreditado)</option>
                    <option value="Cargado / Borrador">Cargado / Borrador</option>
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
                    Emitir Factura
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
