import { motion } from 'framer-motion';
import { Eye, Trash2, GripVertical } from 'lucide-react';

export default function KanbanBoard({
  items,
  columns,
  onMoveItem,
  onItemOpen,
  onItemDelete,
}) {
  const handleDragStart = (event, itemId) => {
    event.dataTransfer.setData('text/plain', itemId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event, columnId) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData('text/plain');

    if (itemId) {
      onMoveItem(itemId, columnId);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {columns.map((column) => {
        const columnItems = items.filter((item) => item.status === column.id);

        return (
          <div
            key={column.id}
            onDrop={(event) => handleDrop(event, column.id)}
            onDragOver={(event) => event.preventDefault()}
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg overflow-hidden min-h-[420px] flex flex-col"
          >
            <div className={`px-4 py-3 border-b border-slate-800 flex items-center justify-between ${column.headerClass}`}>
              <div>
                <h3 className="text-sm font-bold text-white">{column.title}</h3>
                <p className="text-[11px] text-slate-400">{columnItems.length} expedientes</p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 bg-slate-950/60 px-2 py-1 rounded-full border border-slate-800">
                {column.id}
              </span>
            </div>

            <div className="p-3 space-y-3 flex-1 overflow-y-auto">
              {columnItems.length === 0 ? (
                <div className="h-full min-h-[280px] flex items-center justify-center rounded-xl border border-dashed border-slate-800 text-slate-500 text-sm">
                  Sin expedientes
                </div>
              ) : (
                columnItems.map((item) => (
                  <motion.article
                    key={item.id}
                    layout
                    draggable
                    onDragStart={(event) => handleDragStart(event, item.id)}
                    whileHover={{ y: -2 }}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 shadow-md cursor-move group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-slate-600 group-hover:text-gold-400 transition-colors">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <button
                                type="button"
                                onClick={() => onItemOpen(item.id)}
                                className="text-left font-semibold text-white hover:text-gold-400 transition-colors line-clamp-2"
                              >
                                {item.title || item.client}
                              </button>
                              <p className="text-[11px] text-slate-500 mt-1 truncate">{item.client}</p>
                            </div>
                            <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.priority === 'Alta' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : item.priority === 'Media' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                              {item.priority}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                            {item.type}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-[10px] text-slate-500">
                          <span className="truncate">{item.lawyer}</span>
                          <span>{item.date}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/70">
                          <button
                            type="button"
                            onClick={() => onItemOpen(item.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Ver detalle
                          </button>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              onItemDelete(item.id, event);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
