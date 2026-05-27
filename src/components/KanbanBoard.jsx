// KanbanBoard.jsx – reusable Kanban board component
import { useState } from 'react';

// Column definitions – you can customize titles & status keys
const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function KanbanBoard({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const onDrop = (e, columnId) => {
    const taskId = e.dataTransfer.getData('text/plain');
    setTasks((prev) =>
      prev.map((t) =>
        t.id.toString() === taskId ? { ...t, status: columnId } : t
      )
    );
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {columns.map((col) => (
        <div
          key={col.id}
          className="flex-1 min-w-[250px] bg-slate-800/60 rounded-xl p-4 backdrop-blur-sm"
          onDrop={(e) => onDrop(e, col.id)}
          onDragOver={onDragOver}
        >
          <h2 className="text-gold-400 text-lg font-semibold mb-4 text-center">
            {col.title}
          </h2>
          <div className="space-y-3">
            {tasks
              .filter((t) => t.status === col.id)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-100 p-3 rounded-lg shadow cursor-move transition-colors"
                >
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    {task.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
