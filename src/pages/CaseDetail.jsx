import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  Plus, 
  Send, 
  User, 
  Paperclip,
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function CaseDetail({ caseId, cases, setCases, setView }) {
  const activeCase = cases.find(c => c.id === caseId);
  const [activeTab, setActiveTab] = useState('timeline');
  const [newComment, setNewComment] = useState('');
  const [newHearing, setNewHearing] = useState({ title: '', date: '', time: '', type: 'Presencial' });
  const [showAddHearing, setShowAddHearing] = useState(false);

  if (!activeCase) {
    return (
      <div className="p-6 text-center text-slate-400">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Expediente no encontrado</h3>
        <button onClick={() => setView('cases')} className="text-xs text-gold-400 font-semibold hover:underline">
          Volver a la lista de casos
        </button>
      </div>
    );
  }

  // Handle adding internal comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          comments: [
            ...c.comments,
            {
              id: Date.now(),
              author: 'Dr. Carlos Muñoz',
              role: 'Socio Administrador',
              text: newComment,
              time: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          ]
        };
      }
      return c;
    });

    setCases(updatedCases);
    setNewComment('');
  };

  // Handle scheduling new hearing
  const handleAddHearing = (e) => {
    e.preventDefault();
    if (!newHearing.title || !newHearing.date || !newHearing.time) return;

    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          hearings: [
            ...c.hearings,
            {
              id: Date.now(),
              title: newHearing.title,
              date: newHearing.date,
              time: newHearing.time + ' hs',
              type: newHearing.type
            }
          ],
          timeline: [
            {
              id: Date.now() + 1,
              date: newHearing.date,
              title: `Audiencia Programada: ${newHearing.title}`,
              desc: `Se fijó audiencia tipo ${newHearing.type} para las ${newHearing.time} hs.`
            },
            ...c.timeline
          ]
        };
      }
      return c;
    });

    setCases(updatedCases);
    setNewHearing({ title: '', date: '', time: '', type: 'Presencial' });
    setShowAddHearing(false);
  };

  // Simulating document attachment
  const handleSimulateUpload = () => {
    const docNames = [
      'Cedula_Notificacion_Contestacion.pdf',
      'Pliego_Absolucion_Posiciones.pdf',
      'Escrito_Acompaña_Bono.pdf',
      'Acta_Poder_Comparecencia.pdf'
    ];
    const randomDoc = docNames[Math.floor(Math.random() * docNames.length)];
    
    // Check if already uploaded
    if (activeCase.documents.some(d => d.name === randomDoc)) {
      alert('Este archivo ya se encuentra adjunto al expediente.');
      return;
    }

    const updatedCases = cases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          documents: [
            ...c.documents,
            {
              id: Date.now(),
              name: randomDoc,
              size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
              date: new Date().toISOString().split('T')[0]
            }
          ],
          timeline: [
            {
              id: Date.now() + 1,
              date: new Date().toISOString().split('T')[0],
              title: 'Documento Cargado',
              desc: `Se adjuntó el documento "${randomDoc}" al expediente.`
            },
            ...c.timeline
          ]
        };
      }
      return c;
    });

    setCases(updatedCases);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Urgente': return 'bg-rose-500/10 text-rose-450 border border-rose-500/20';
      case 'Activo': return 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20';
      case 'En revisión': return 'bg-amber-500/10 text-amber-450 border border-amber-500/20';
      case 'Cerrado': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button 
        onClick={() => setView('cases')} 
        className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver a expedientes</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - General Info Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5 h-fit">
          <div className="space-y-2">
            <span className="text-[10px] text-gold-400 font-bold bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
              Expediente Judicial
            </span>
            <h2 className="font-heading text-xl font-bold text-white mt-1 leading-tight">{activeCase.title || activeCase.client}</h2>
            <p className="text-slate-500 text-xs font-bold">{activeCase.id}</p>
          </div>

          <hr className="border-slate-800/80" />

          {/* KPI Mini List */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Cliente:</span>
              <span className="text-slate-300 font-medium">{activeCase.client}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Materia:</span>
              <span className="text-slate-300 font-medium">{activeCase.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Juzgado:</span>
              <span className="text-slate-300 font-medium">{activeCase.court}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Abogado Resp.:</span>
              <span className="text-slate-300 font-medium">{activeCase.lawyer}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Estado:</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getStatusClass(activeCase.status)}`}>
                {activeCase.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Prioridad:</span>
              <span className={`font-semibold ${
                activeCase.priority === 'Alta' ? 'text-rose-400' :
                activeCase.priority === 'Media' ? 'text-amber-400' : 'text-emerald-400'
              }`}>{activeCase.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Iniciado el:</span>
              <span className="text-slate-300">{activeCase.date}</span>
            </div>
          </div>

          <hr className="border-slate-800/80" />

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Descripción del Asunto</h4>
            <p className="text-slate-400 text-xs leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-850">
              {activeCase.description || "No se ha ingresado descripción detallada para esta causa judicial."}
            </p>
          </div>
        </div>

        {/* Right Area - Dynamic Tabs Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg lg:col-span-2 flex flex-col min-h-[500px]">
          
          {/* Tabs navigation */}
          <div className="bg-slate-950/40 border-b border-slate-800 flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('timeline')}
              className={`px-5 py-4 text-xs font-semibold border-b-2 flex items-center space-x-2 transition-all ${
                activeTab === 'timeline' 
                  ? 'border-gold-500 text-gold-450 bg-slate-900/40' 
                  : 'border-transparent text-slate-450 hover:text-white'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Timeline / Actividad</span>
            </button>

            <button 
              onClick={() => setActiveTab('documents')}
              className={`px-5 py-4 text-xs font-semibold border-b-2 flex items-center space-x-2 transition-all ${
                activeTab === 'documents' 
                  ? 'border-gold-500 text-gold-450 bg-slate-900/40' 
                  : 'border-transparent text-slate-450 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Documentos ({activeCase.documents.length})</span>
            </button>

            <button 
              onClick={() => setActiveTab('hearings')}
              className={`px-5 py-4 text-xs font-semibold border-b-2 flex items-center space-x-2 transition-all ${
                activeTab === 'hearings' 
                  ? 'border-gold-500 text-gold-450 bg-slate-900/40' 
                  : 'border-transparent text-slate-450 hover:text-white'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Audiencias ({activeCase.hearings.length})</span>
            </button>

            <button 
              onClick={() => setActiveTab('comments')}
              className={`px-5 py-4 text-xs font-semibold border-b-2 flex items-center space-x-2 transition-all ${
                activeTab === 'comments' 
                  ? 'border-gold-500 text-gold-450 bg-slate-900/40' 
                  : 'border-transparent text-slate-450 hover:text-white'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Comentarios ({activeCase.comments.length})</span>
            </button>
          </div>

          {/* Tab contents */}
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
            
            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-heading text-sm font-bold text-white">Historial del Caso</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Movimientos de expediente</span>
                </div>
                
                <div className="relative border-l-2 border-slate-800 ml-3 pl-6 space-y-6 py-2">
                  {activeCase.timeline.length === 0 ? (
                    <p className="text-xs text-slate-550">No hay movimientos registrados.</p>
                  ) : (
                    activeCase.timeline.map((event) => (
                      <div key={event.id} className="relative">
                        {/* Dot indicator */}
                        <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-900 border-2 border-gold-500 ring-4 ring-slate-950"></span>
                        
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-500 font-mono">{event.date}</span>
                          <h4 className="text-xs font-bold text-slate-200">{event.title}</h4>
                          <p className="text-xs text-slate-450 leading-relaxed max-w-xl">{event.desc}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-heading text-sm font-bold text-white">Archivos Escaneados / Escritos</h3>
                    <p className="text-slate-500 text-[11px] mt-0.5">Expediente digitalizado</p>
                  </div>
                  <button 
                    onClick={handleSimulateUpload}
                    className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-gold-500/20 text-[11px] font-semibold text-white rounded-lg flex items-center space-x-1 transition-all"
                  >
                    <Paperclip className="h-3.5 w-3.5 text-gold-400" />
                    <span>Cargar PDF Mock</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCase.documents.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 col-span-2 border border-dashed border-slate-800 rounded-lg">
                      No se han cargado documentos para este caso.
                    </div>
                  ) : (
                    activeCase.documents.map((doc) => (
                      <div key={doc.id} className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-850 flex items-center justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="p-2 rounded bg-rose-500/10 text-rose-450 border border-rose-500/20">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-200 truncate pr-2" title={doc.name}>
                              {doc.name}
                            </p>
                            <span className="text-[10px] text-slate-500 font-light">{doc.size} &bull; {doc.date}</span>
                          </div>
                        </div>
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); alert(`Simulación de descarga para ${doc.name}`); }}
                          className="text-[11px] text-gold-400 hover:text-gold-300 font-semibold"
                        >
                          Descargar
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Hearings Tab */}
            {activeTab === 'hearings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-heading text-sm font-bold text-white">Audiencias Judiciales</h3>
                    <p className="text-slate-500 text-[11px] mt-0.5">Control de fechas e incomparecencias</p>
                  </div>
                  <button 
                    onClick={() => setShowAddHearing(!showAddHearing)}
                    className="px-3 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Programar Audiencia</span>
                  </button>
                </div>

                {/* Add hearing form */}
                {showAddHearing && (
                  <form onSubmit={handleAddHearing} className="bg-slate-950/40 border border-slate-850 p-4 rounded-lg space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Carátula / Objeto de Audiencia</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ej. Vista de Causa"
                          value={newHearing.title}
                          onChange={(e) => setNewHearing({...newHearing, title: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Modalidad</label>
                        <select
                          value={newHearing.type}
                          onChange={(e) => setNewHearing({...newHearing, type: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none"
                        >
                          <option value="Presencial">Presencial (En Sede Judicial)</option>
                          <option value="Virtual via MS Teams">Virtual (Teams/Zoom)</option>
                          <option value="Mediación Extrajudicial">Mediación Extrajudicial</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Fecha</label>
                        <input 
                          type="date" 
                          required
                          value={newHearing.date}
                          onChange={(e) => setNewHearing({...newHearing, date: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-gold-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-semibold mb-1 block">Hora</label>
                        <input 
                          type="time" 
                          required
                          value={newHearing.time}
                          onChange={(e) => setNewHearing({...newHearing, time: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowAddHearing(false)} 
                        className="px-3 py-1.5 border border-slate-800 rounded text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="submit" 
                        className="px-3 py-1.5 bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold rounded"
                      >
                        Programar
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {activeCase.hearings.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-lg">
                      No hay audiencias programadas para este expediente.
                    </div>
                  ) : (
                    activeCase.hearings.map((h) => (
                      <div key={h.id} className="p-4 rounded-lg bg-slate-950/30 border border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-200">{h.title}</h4>
                          <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                            <span className="font-semibold text-gold-450">{h.type}</span>
                            <span>&bull;</span>
                            <span>{h.date} a las {h.time}</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold uppercase tracking-wider">
                          Pendiente
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div className="flex flex-col h-full justify-between space-y-4">
                <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  <h3 className="font-heading text-sm font-bold text-white mb-2">Historial de Comentarios Internos</h3>
                  
                  {activeCase.comments.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 col-span-2 border border-dashed border-slate-800 rounded-lg">
                      No hay comentarios internos en este expediente. Agrega uno debajo.
                    </div>
                  ) : (
                    activeCase.comments.map((comment) => (
                      <div key={comment.id} className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-850 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-gold-400">
                              {comment.author.split(' ').map(n=>n[0]).join('')}
                            </div>
                            <div>
                              <span className="text-[11px] font-semibold text-slate-200">{comment.author}</span>
                              <span className="text-[9px] text-slate-500 ml-1.5">({comment.role})</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-slate-550 font-mono">{comment.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-normal pl-8">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="border-t border-slate-800/80 pt-4 flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Escriba un comentario o nota interna para el equipo..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                  />
                  <button 
                    type="submit" 
                    className="p-2 bg-gold-500 hover:bg-gold-600 text-slate-950 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Send className="h-4.5 w-4.5" />
                  </button>
                </form>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
