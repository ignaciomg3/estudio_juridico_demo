import React from 'react';
import { BarChart3, FileDown, LineChart, PieChart, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Reportes & Estadísticas</h2>
          <p className="text-slate-400 text-xs mt-0.5">Analíticas de rendimiento de causas, distribución de materias e ingresos consolidados.</p>
        </div>
        <button
          onClick={() => alert('Simulación: Exportando informe gerencial de Q2 en formato PDF...')}
          className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 text-xs font-semibold rounded-lg shadow-lg shadow-gold-500/10 flex items-center space-x-1.5 transition-all duration-200"
        >
          <FileDown className="h-4 w-4" />
          <span>Exportar Informe PDF</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center space-x-4 shadow-md">
          <div className="p-3 bg-emerald-500/10 text-emerald-450 rounded-lg border border-emerald-500/20">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-550 font-bold uppercase tracking-wider">Tasa de Éxito en Juicios</p>
            <p className="text-xl font-bold text-white mt-0.5">94.2% <span className="text-[10px] font-normal text-emerald-500">(Acuerdos + Sentencias)</span></p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center space-x-4 shadow-md">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-550 font-bold uppercase tracking-wider">Resolución Promedio</p>
            <p className="text-xl font-bold text-white mt-0.5">4.8 meses <span className="text-[10px] font-normal text-slate-500">(-12% vs año anterior)</span></p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center space-x-4 shadow-md">
          <div className="p-3 bg-gold-500/10 text-gold-450 rounded-lg border border-gold-500/20">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-550 font-bold uppercase tracking-wider">Crecimiento de Cartera</p>
            <p className="text-xl font-bold text-white mt-0.5">+18% Q/Q <span className="text-[10px] font-normal text-gold-400">clientes corporativos</span></p>
          </div>
        </div>
      </div>

      {/* Simulated analytics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <h3 className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            <span>Productividad Mensual de Abogados</span>
          </h3>
          <div className="space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Dr. Carlos Muñoz</span>
                <span className="text-slate-450">14 expedientes gestionados</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full">
                <div className="bg-gradient-to-r from-gold-500 to-gold-600 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Dra. Sofía Castro</span>
                <span className="text-slate-450">11 expedientes gestionados</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full">
                <div className="bg-gradient-to-r from-gold-500 to-gold-600 h-2 rounded-full w-[70%]"></div>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Dra. Mariana López</span>
                <span className="text-slate-450">9 expedientes gestionados</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full">
                <div className="bg-gradient-to-r from-gold-500 to-gold-600 h-2 rounded-full w-[55%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <h3 className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <PieChart className="h-4 w-4 text-rose-450" />
            <span>Distribución de Causas por Juzgado</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-850">
              <span className="text-slate-300">Juzgado de Familia N° 3</span>
              <span className="font-bold text-white">40%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-850">
              <span className="text-slate-300">Juzgado Civil N° 14</span>
              <span className="font-bold text-white">30%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-850">
              <span className="text-slate-300">Juzgado Comercial N° 8</span>
              <span className="font-bold text-white">20%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-300 font-semibold">Otros Juzgados</span>
              <span className="font-bold text-white">10%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
