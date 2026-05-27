import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, X } from 'lucide-react';
import KanbanBoard from '../components/KanbanBoard';

const kanbanColumns = [
  {
    id: 'Pendiente',
    title: 'Pendiente',
    headerClass: 'bg-rose-500/5',
  },
  {
    id: 'Haciendo',
    title: 'Haciendo',
    headerClass: 'bg-amber-500/5',
  },
  {
    id: 'finalizado',
    title: 'finalizado',
    headerClass: 'bg-emerald-500/5',
  },
];

const normalizeStatus = (status) => {
  switch (status) {
    case 'Pendiente':
    case 'Activo':
    case 'Urgente':
      return 'Pendiente';
    case 'Haciendo':
    case 'En revisión':
      return 'Haciendo';
    case 'finalizado':
    case 'Cerrado':
      return 'finalizado';
    default:
      return 'Pendiente';
  }
};

export default function Cases({ cases, setCases, setView, setSelectedCaseId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Case Form State
  const [newCase, setNewCase] = useState({
    id: '',
    client: '',
    type: '',
    lawyer: 'Dr. Carlos Pérez',
    status: 'Pendiente',
    priority: 'Media',
    court: '',
    title: '',
    description: '',
  });

  // Filter & Search Logic
  const filteredCases = cases.filter(item => {
    const itemStatus = normalizeStatus(item.status);
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lawyer.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || itemStatus === statusFilter;
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateCase = (e) => {
    e.preventDefault();
    const formattedId = `EXP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const caseToAdd = {
      ...newCase,
      id: formattedId,
      date: new Date().toISOString().split('T')[0],
      timeline: [
        { id: 1, date: new Date().toISOString().split('T')[0], title: 'Apertura de Expediente', desc: 'Expediente creado en el sistema Pérez.' }
      ],
      documents: [],
      hearings: [],
      comments: []
    };

    setCases([caseToAdd, ...cases]);
    setShowAddModal(false);
    // Reset Form
    setNewCase({
      id: '',
      client: '',
      type: '',
      lawyer: 'Dr. Carlos Pérez',
      status: 'Pendiente',
      priority: 'Media',
      court: '',
      title: '',
      description: '',
    });
  };

  const handleMoveCase = (caseId, nextStatus) => {
    setCases(cases.map((caseItem) => (
      caseItem.id === caseId ? { ...caseItem, status: nextStatus } : caseItem
    )));
  };

  const openCaseDetail = (caseId) => {
    setSelectedCaseId(caseId);
    setView('case-detail');
  };

  const handleDeleteCase = (id, e) => {
    e.stopPropagation();
    if(confirm('¿Está seguro de que desea eliminar este expediente de la demo?')) {
      setCases(cases.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Gestión de Expedientes</h2>
          <p className="text-slate-400 text-xs mt-0.5">Administre y consulte todas las causas del estudio jurídico.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 text-xs font-semibold rounded-lg shadow-lg shadow-gold-500/10 flex items-center space-x-1.5 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Expediente</span>
        </button>
      </div>

      {/* Filters Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar por expediente, cliente, abogado..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-350 placeholder-slate-500 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800">
            <Filter className="h-3.5 w-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-400 focus:ring-0 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-300">Todos los Estados</option>
              <option value="Pendiente" className="bg-slate-900 text-slate-300">Pendiente</option>
              <option value="Haciendo" className="bg-slate-900 text-slate-300">Haciendo</option>
              <option value="finalizado" className="bg-slate-900 text-slate-300">finalizado</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-400 focus:ring-0 focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-300">Todas las Prioridades</option>
              <option value="Alta" className="bg-slate-900 text-slate-300">Alta</option>
              <option value="Media" className="bg-slate-900 text-slate-300">Media</option>
              <option value="Baja" className="bg-slate-900 text-slate-300">Baja</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        items={filteredCases.map((item) => ({
          ...item,
          status: normalizeStatus(item.status),
        }))}
        columns={kanbanColumns}
        onMoveItem={handleMoveCase}
        onItemOpen={openCaseDetail}
        onItemDelete={handleDeleteCase}
      />

      {filteredCases.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
          No se encontraron expedientes con los criterios seleccionados.
        </div>
      )}

      {/* Add Case Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
                <h3 className="font-heading font-bold text-white text-sm">Crear Nuevo Expediente Judicial</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-850 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Modal Body / Form */}
              <form onSubmit={handleCreateCase} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Cliente</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Gómez, María Laura"
                      value={newCase.client}
                      onChange={(e) => setNewCase({...newCase, client: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Materia / Tipo de Causa</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Divorcio Vincular y Alimentos"
                      value={newCase.type}
                      onChange={(e) => setNewCase({...newCase, type: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Carátula del Expediente</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Gómez María Laura c/ Rossi Roberto s/ Divorcio"
                      value={newCase.title}
                      onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Juzgado de Radicación</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Juzgado de Familia N° 3"
                      value={newCase.court}
                      onChange={(e) => setNewCase({...newCase, court: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Abogado Responsable</label>
                    <select
                      value={newCase.lawyer}
                      onChange={(e) => setNewCase({...newCase, lawyer: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-gold-500/50"
                    >
                      <option value="Dr. Carlos Pérez">Dr. Carlos Pérez</option>
                      <option value="Dra. Sofía Castro">Dra. Sofía Castro</option>
                      <option value="Dra. Mariana López">Dra. Mariana López</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Estado</label>
                      <select
                        value={newCase.status}
                        onChange={(e) => setNewCase({...newCase, status: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-gold-500/50"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Haciendo">Haciendo</option>
                        <option value="finalizado">finalizado</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-semibold">Prioridad</label>
                      <select
                        value={newCase.priority}
                        onChange={(e) => setNewCase({...newCase, priority: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-gold-500/50"
                      >
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Descripción de la Causa</label>
                  <textarea 
                    rows="3"
                    placeholder="Detalles sobre las pretensiones, hechos o estado de la causa..."
                    value={newCase.description}
                    onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50 resize-none"
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end items-center space-x-3 pt-4 border-t border-slate-850">
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
                    Crear Expediente
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
