import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  Activity,
  FileText,
  MessageSquare
} from 'lucide-react';
import { stats, casesByStatus, monthlyRevenueHistory, recentActivity } from '../data/mockData';

export default function Dashboard({ setView, setSelectedCaseId }) {
  // Anim variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const kpis = [
    { title: 'Casos Activos', value: stats.activeCases, change: '+12% este mes', icon: Briefcase, color: 'text-gold-400', bg: 'bg-gold-500/10 border-gold-500/20', view: 'cases' },
    { title: 'Audiencias esta Semana', value: stats.hearingsThisWeek, change: '3 virtuales, 5 presenciales', icon: Calendar, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', view: 'agenda' },
    { title: 'Clientes Activos', value: stats.activeClients, change: '+4 nuevos clientes', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', view: 'clients' },
    { title: 'Facturas Pendientes', value: stats.pendingInvoices, change: '$6,500 USD por cobrar', icon: CreditCard, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', view: 'billing' },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6 overflow-y-auto"
    >
      {/* Top Welcome Panel */}
      <motion.div 
        variants={itemVariants}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center shadow-xl shadow-slate-950/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold-500/5 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-bold text-white tracking-tight">Bienvenido al Portal, Dr. Muñoz</h2>
          <p className="text-slate-400 text-sm">Resumen operativo para el control de causas y facturación del estudio.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            onClick={() => setView('cases')}
            className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 text-xs font-semibold rounded-lg shadow-lg shadow-gold-500/10 flex items-center space-x-1.5 transition-all duration-200"
          >
            <span>Ver Expedientes</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      {/* KPI Section */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx}
              onClick={() => setView(kpi.view)}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{kpi.title}</p>
                  <p className="text-2xl font-bold text-white mt-2 group-hover:text-gold-400 transition-colors">{kpi.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg border ${kpi.bg}`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
              <p className="text-slate-400 text-[11px] mt-4 flex items-center space-x-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span>{kpi.change}</span>
              </p>
            </div>
          );
        })}
      </motion.div>

      {/* Charts / Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income chart */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg lg:col-span-2 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-heading text-sm font-bold text-white">Ingresos Mensuales</h3>
              <p className="text-slate-500 text-xs">Muestra el ingreso por mes y cantidad de causas iniciadas.</p>
            </div>
            <span className="text-xs text-gold-400 font-semibold bg-gold-500/10 px-2 py-1 rounded border border-gold-500/20">
              Total H1: $66,200 USD
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="flex items-end justify-between h-44 px-2 pt-4 border-b border-slate-800/80">
            {monthlyRevenueHistory.map((data, idx) => {
              // Scale height based on 15000 max income
              const heightPercent = Math.min((data.income / 15000) * 100, 100);
              return (
                <div key={idx} className="flex flex-col items-center group relative w-12">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-slate-950 text-[10px] text-white py-1 px-2 rounded border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl">
                    <span className="text-gold-400">${data.income.toLocaleString()} USD</span>
                    <span className="block text-slate-500">{data.cases} casos activos</span>
                  </div>
                  {/* The bar */}
                  <div 
                    style={{ height: `${heightPercent}%` }} 
                    className="w-full bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-md hover:brightness-110 transition-all duration-300 relative"
                  >
                    {/* Core Cyan inner line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 rounded-t-md"></div>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-2 font-medium">{data.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-3 text-[11px] text-slate-500">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded bg-gold-500"></span>
              <span>Honorarios Cobrados</span>
            </div>
            <span>Periodo: Enero - Junio 2026</span>
          </div>
        </motion.div>

        {/* Case by status */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading text-sm font-bold text-white mb-1">Causas por Estado</h3>
            <p className="text-slate-500 text-xs mb-4">Distribución del estado de causas judiciales.</p>
          </div>

          <div className="space-y-4 my-auto">
            {casesByStatus.map((item, idx) => {
              const totalCases = casesByStatus.reduce((acc, curr) => acc + curr.count, 0);
              const percentage = Math.round((item.count / totalCases) * 100);
              
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-350">{item.status}</span>
                    <span className="text-slate-400">{item.count} <span className="text-slate-600">({percentage}%)</span></span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-800/80 pt-3 mt-4 text-center">
            <button 
              onClick={() => setView('cases')}
              className="text-xs text-gold-400 hover:text-gold-300 font-semibold transition-colors"
            >
              Gestionar Expedientes &rarr;
            </button>
          </div>
        </motion.div>
      </div>

      {/* Activity and Action Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Log */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg lg:col-span-2"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-4 w-4 text-gold-400" />
            <h3 className="font-heading text-sm font-bold text-white">Actividad Reciente</h3>
          </div>
          
          <div className="divide-y divide-slate-800/60">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="py-3 flex items-center justify-between group hover:bg-slate-800/20 px-2 rounded-md transition-colors">
                <div className="flex items-center space-x-3">
                  <span className={`h-2 w-2 rounded-full ${
                    activity.type === 'case' ? 'bg-amber-400' :
                    activity.type === 'hearing' ? 'bg-rose-500' :
                    activity.type === 'document' ? 'bg-cyan-400' : 'bg-emerald-400'
                  }`}></span>
                  <span className="text-xs text-slate-300">{activity.text}</span>
                </div>
                <span className="text-[10px] text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions / Shortcuts */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading text-sm font-bold text-white mb-3">Atajos de Demo</h3>
            <p className="text-slate-500 text-xs mb-4">Utiliza estos accesos directos para simular interacciones comunes de los clientes.</p>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => {
                setView('cases');
                // Auto trigger new case modal or scroll
              }}
              className="w-full text-left p-3 rounded-lg border border-slate-800 hover:border-gold-500/30 hover:bg-slate-800/40 transition-all text-xs font-semibold text-white flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-gold-400" />
                <span>Agregar nuevo expediente</span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-gold-400 transition-colors" />
            </button>

            <button 
              onClick={() => setView('documents')}
              className="w-full text-left p-3 rounded-lg border border-slate-800 hover:border-gold-500/30 hover:bg-slate-800/40 transition-all text-xs font-semibold text-white flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>Subir contrato / PDF</span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </button>

            <button 
              onClick={() => setView('billing')}
              className="w-full text-left p-3 rounded-lg border border-slate-800 hover:border-gold-500/30 hover:bg-slate-800/40 transition-all text-xs font-semibold text-white flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-emerald-400" />
                <span>Emitir factura judicial</span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </button>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 mt-4 text-[10px] text-slate-400 text-center">
            Muñoz Legal Suite &bull; Demo v1.0.0
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
