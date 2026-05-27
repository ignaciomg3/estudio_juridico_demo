import { useState } from 'react';
import { Search, FileText, Upload, Folder, HardDrive, Trash2, Eye, FileDown } from 'lucide-react';

export default function Documents({ documents, setDocuments }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDragging, setIsDragging] = useState(false);

  const categories = ['All', 'Contratos', 'Escritos Judiciales', 'Notificaciones', 'Poderes', 'Resoluciones', 'Pruebas Documentales'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSimulateDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleSimulateDragLeave = () => {
    setIsDragging(false);
  };

  const handleSimulateDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Simulate drop of a document
    const demoDocs = [
      { name: 'Cédula_Notificacion_Audiencia.pdf', category: 'Notificaciones', size: '1.2 MB' },
      { name: 'Contrato_Locacion_Comercial.pdf', category: 'Contratos', size: '3.1 MB' },
      { name: 'Contestacion_Demanda_Sanchez.pdf', category: 'Escritos Judiciales', size: '2.5 MB' },
      { name: 'Poder_Especial_Irrevocable.pdf', category: 'Poderes', size: '1.4 MB' }
    ];
    
    const randomDoc = demoDocs[Math.floor(Math.random() * demoDocs.length)];
    
    if (documents.some(d => d.name === randomDoc.name)) {
      alert(`El archivo "${randomDoc.name}" ya existe en el repositorio.`);
      return;
    }

    const docToAdd = {
      id: Date.now(),
      name: randomDoc.name,
      category: randomDoc.category,
      status: 'Presentado',
      date: new Date().toISOString().split('T')[0],
      size: randomDoc.size
    };

    setDocuments([docToAdd, ...documents]);
  };

  const handleDeleteDoc = (id) => {
    if (confirm('¿Está seguro de que desea eliminar este documento?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Contratos': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      case 'Escritos Judiciales': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Notificaciones': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'Resoluciones': return 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div>
        <h2 className="font-heading text-xl font-bold text-white">Repositorio Documental</h2>
        <p className="text-slate-400 text-xs mt-0.5">Gestione contratos, escritos, actas notariales y expedientes digitalizados.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center space-x-3.5 shadow-md">
          <div className="p-3 bg-gold-500/10 text-gold-400 rounded-lg border border-gold-500/20">
            <HardDrive className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Espacio Utilizado</p>
            <p className="text-sm font-bold text-white mt-0.5">14.6 MB <span className="text-[10px] font-normal text-slate-550">de 50 GB</span></p>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center space-x-3.5 shadow-md">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Archivos</p>
            <p className="text-sm font-bold text-white mt-0.5">{documents.length} PDFs</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center space-x-3.5 shadow-md">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
            <Folder className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Categorías Activas</p>
            <p className="text-sm font-bold text-white mt-0.5">{categories.length - 1} folders</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload & list */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Upload simulated box (Col-span-1) */}
        <div className="space-y-4">
          <h3 className="font-heading text-sm font-bold text-white">Cargar Documento</h3>
          
          <div 
            onDragOver={handleSimulateDragOver}
            onDragLeave={handleSimulateDragLeave}
            onDrop={handleSimulateDrop}
            onClick={handleSimulateDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 min-h-[220px] ${
              isDragging 
                ? 'border-gold-500 bg-gold-500/5' 
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <div className="p-3 rounded-full bg-slate-950/60 border border-slate-800 text-slate-400">
              <Upload className={`h-6 w-6 transition-transform ${isDragging ? '-translate-y-1' : ''}`} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Arrastra archivos aquí</p>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">O haz click para simular una carga de PDF de prueba</p>
            </div>
            <span className="text-[9px] px-2 py-0.5 bg-slate-950 text-slate-500 rounded border border-slate-850">
              PDF, DOCX hasta 20MB
            </span>
          </div>
        </div>

        {/* Documents explorer (Col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Filters Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-lg">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar archivos por nombre..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-350 placeholder-slate-500 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded text-[10px] font-bold whitespace-nowrap border transition-all ${
                    activeCategory === cat 
                      ? 'bg-gold-500 border-gold-500 text-slate-950' 
                      : 'border-slate-850 text-slate-500 hover:text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  {cat === 'All' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Files List */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/50 border-b border-slate-850 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Nombre de Archivo</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4">Fecha Carga</th>
                    <th className="py-3 px-4">Tamaño</th>
                    <th className="py-3 px-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-xs">
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500">
                        No se encontraron documentos registrados.
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-850/20 transition-colors group">
                        <td className="py-3.5 px-4 font-semibold text-slate-200">
                          <div className="flex items-center space-x-2.5">
                            <FileText className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                            <span className="truncate max-w-[200px]" title={doc.name}>{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${getCategoryColor(doc.category)}`}>
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {doc.date}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {doc.size}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <button 
                              onClick={() => alert(`Simulando vista previa de PDF: ${doc.name}`)}
                              className="p-1 hover:text-gold-400 hover:bg-slate-800 text-slate-400 rounded transition-colors"
                              title="Visualizar"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => alert(`Simulando descarga de PDF: ${doc.name}`)}
                              className="p-1 hover:text-cyan-400 hover:bg-slate-800 text-slate-400 rounded transition-colors"
                              title="Descargar"
                            >
                              <FileDown className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteDoc(doc.id)}
                              className="p-1 hover:text-rose-400 hover:bg-slate-800 text-slate-400 rounded transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
