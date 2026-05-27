import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
// initialCalendarEvents import removed (not used)

export default function Agenda({ events, setEvents }) {
  const [currentDate, setCurrentDate] = useState(new Date('2026-05-25'));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '2026-05-26',
    time: '10:00',
    type: 'hearing',
    desc: '',
  });

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    // 0 is Sunday, 1 is Monday ... 6 is Saturday.
    // We adjust it so that Lunes is 0, Martes is 1 ... Domingo is 6.
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 4 for May

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Month names
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    let colorClass = 'bg-slate-500/20 text-slate-350 border-slate-500';
    if (newEvent.type === 'hearing') colorClass = 'bg-rose-500/20 text-rose-300 border-rose-500';
    if (newEvent.type === 'meeting') colorClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500';
    if (newEvent.type === 'deadline') colorClass = 'bg-amber-500/20 text-amber-300 border-amber-500';
    if (newEvent.type === 'reminder') colorClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500';

    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      desc: newEvent.desc,
      color: colorClass
    };

    setEvents([...events, eventToAdd]);
    setShowAddModal(false);
    // Reset Form
    setNewEvent({ title: '', date: '2026-05-26', time: '10:00', type: 'hearing', desc: '' });
  };

  // Build calendar days array
  const calendarCells = [];
  // Empty slots for previous month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push({ dayNumber: null, dateString: null });
  }
  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({ dayNumber: d, dateString: dStr });
  }

  // Get events on a specific day
  const getEventsForDay = (dateString) => {
    if (!dateString) return [];
    return events.filter(e => e.date === dateString);
  };

  const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Agenda & Calendario</h2>
          <p className="text-slate-400 text-xs mt-0.5">Vencimientos, audiencias de conciliación y reuniones del estudio.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 text-xs font-semibold rounded-lg shadow-lg shadow-gold-500/10 flex items-center space-x-1.5 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Programar Evento</span>
        </button>
      </div>

      {/* Main Grid: Calendar left, list right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Calendar Grid (Col-Span-3) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg lg:col-span-3 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-heading text-sm font-bold text-white flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gold-400" />
              <span>{monthNames[month]} {year}</span>
            </h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevMonth}
                className="p-1 rounded-md border border-slate-800 text-slate-450 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date('2026-05-25'))}
                className="px-2.5 py-1 border border-slate-850 bg-slate-950/40 text-[10px] text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              >
                Hoy
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-1 rounded-md border border-slate-800 text-slate-450 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekday names */}
          <div className="grid grid-cols-7 text-center mb-2">
            {weekdays.map((w, idx) => (
              <div key={idx} className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider py-1.5 border-b border-slate-850">
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 bg-slate-850 p-0.5 rounded-lg border border-slate-800">
            {calendarCells.map((cell, idx) => {
              const dayEvents = getEventsForDay(cell.dateString);
              const isToday = cell.dateString === '2026-05-25';

              return (
                <div 
                  key={idx} 
                  className={`min-h-[75px] p-2 flex flex-col justify-between bg-slate-900 transition-colors hover:bg-slate-850/30 ${
                    !cell.dayNumber ? 'opacity-20 cursor-default' : ''
                  } ${isToday ? 'bg-gradient-to-b from-slate-900 to-gold-500/5 border border-gold-500/20' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold ${
                      isToday ? 'bg-gold-500 text-slate-950 h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px]' : 'text-slate-500'
                    }`}>
                      {cell.dayNumber}
                    </span>
                  </div>

                  {/* Day Events Indicator */}
                  <div className="space-y-1 mt-2">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div 
                        key={ev.id} 
                        onClick={() => alert(`Detalle Evento:\n\nTítulo: ${ev.title}\nHora: ${ev.time}\nTipo: ${ev.type}\nLugar/Notas: ${ev.desc}`)}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-transparent truncate cursor-pointer hover:brightness-110 transition-all ${ev.color.split(' ')[0]} ${ev.color.split(' ')[1]}`}
                        title={`${ev.time} - ${ev.title}`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[8px] text-slate-500 font-bold text-center">
                        + {dayEvents.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* List of Events Side Pane */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-sm font-bold text-white mb-4">Próximos Eventos</h3>
            
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              {events.slice().sort((a,b)=>new Date(a.date) - new Date(b.date)).map((ev) => (
                <div 
                  key={ev.id} 
                  className="p-3 bg-slate-950/40 border border-slate-850 rounded-lg space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      ev.type === 'hearing' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      ev.type === 'meeting' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                      ev.type === 'deadline' ? 'bg-amber-500/10 text-amber-450 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20'
                    }`}>
                      {ev.type === 'hearing' ? 'Audiencia' :
                       ev.type === 'meeting' ? 'Reunión' :
                       ev.type === 'deadline' ? 'Vencimiento' : 'Recordatorio'}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{ev.time}</span>
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 leading-tight">{ev.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-slate-600 shrink-0" />
                    <span className="truncate">{ev.desc}</span>
                  </p>
                  <div className="text-[9px] text-slate-650 font-bold text-right pt-1">{ev.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 mt-4 text-[10px] text-slate-400 text-center">
            May 25 es el feriado patrio (Argentina)
          </div>
        </div>

      </div>

      {/* Add Event Modal */}
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
                <h3 className="font-heading font-bold text-white text-sm">Programar Evento</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-850 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Título del Evento</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Audiencia de Mediación Alimentos"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Fecha</label>
                    <input 
                      type="date" 
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-semibold">Hora</label>
                    <input 
                      type="time" 
                      required
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Tipo de Evento</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    <option value="hearing">Audiencia Judicial</option>
                    <option value="meeting">Reunión con Cliente / Socios</option>
                    <option value="deadline">Vencimiento Judicial / Escrito</option>
                    <option value="reminder">Recordatorio Interno</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold">Ubicación / Notas / Link Sala</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Juzgado de Familia N° 3 o Sala Virtual Teams"
                    value={newEvent.desc}
                    onChange={(e) => setNewEvent({...newEvent, desc: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none"
                  />
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
                    Guardar Evento
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
