// Mock data for Estudio Jurídico Demo

export const stats = {
  activeCases: 42,
  hearingsThisWeek: 8,
  activeClients: 156,
  pendingInvoices: 14,
  closedCases: 184,
  monthlyRevenue: 12500, // USD or Local currency
  successRate: "94%"
};

export const casesByStatus = [
  { status: 'Activo', count: 18, color: 'bg-emerald-500' },
  { status: 'En revisión', count: 12, color: 'bg-amber-500' },
  { status: 'Urgente', count: 7, color: 'bg-rose-500' },
  { status: 'Cerrado', count: 5, color: 'bg-slate-500' }
];

export const monthlyRevenueHistory = [
  { month: 'Ene', income: 8400, cases: 15 },
  { month: 'Feb', income: 9600, cases: 18 },
  { month: 'Mar', income: 11200, cases: 22 },
  { month: 'Abr', income: 10500, cases: 19 },
  { month: 'May', income: 12500, cases: 25 },
  { month: 'Jun', income: 14000, cases: 28 }
];

export const weeklyActivity = [
  { day: 'Lun', cases: 4, documents: 12 },
  { day: 'Mar', cases: 6, documents: 15 },
  { day: 'Mié', cases: 8, documents: 22 },
  { day: 'Jue', cases: 5, documents: 18 },
  { day: 'Vie', cases: 9, documents: 10 }
];

export const recentActivity = [
  { id: 1, text: 'Caso Pérez actualizado por Dr. Martínez', time: 'Hace 10 mins', type: 'case' },
  { id: 2, text: 'Nueva audiencia programada para Caso Alimentos Gómez', time: 'Hace 45 mins', type: 'hearing' },
  { id: 3, text: 'Documento "Contrato de Locación.pdf" cargado', time: 'Hace 2 horas', type: 'document' },
  { id: 4, text: 'Factura #9822 emitida a Cliente Roberto Rossi', time: 'Hace 3 horas', type: 'invoice' },
  { id: 5, text: 'Nuevo cliente registrado: Alimentos del Sur S.A.', time: 'Hace 1 día', type: 'client' }
];

export const initialCases = [
  {
    id: 'EXP-2026-0042',
    client: 'Gómez, María Laura',
    type: 'Divorcio Vincular y Alimentos',
    lawyer: 'Dr. Alejandro Martínez',
    status: 'Urgente',
    date: '2026-05-10',
    priority: 'Alta',
    court: 'Juzgado de Familia N° 3',
    title: 'Gómez María Laura c/ Rossi Roberto s/ Divorcio',
    description: 'Demanda de divorcio y fijación de cuota alimentaria provisoria. La contraparte ha planteado oposición respecto al porcentaje propuesto.',
    timeline: [
      { id: 1, date: '2026-05-10', title: 'Apertura de Expediente', desc: 'Se recibe la documentación inicial de la clienta y se redacta el borrador de demanda.' },
      { id: 2, date: '2026-05-15', title: 'Presentación de Demanda', desc: 'Presentación formal ante el Juzgado de Familia N° 3. Se asigna número de expediente.' },
      { id: 3, date: '2026-05-20', title: 'Notificación a la Contraparte', desc: 'Cédula de notificación entregada en el domicilio real del demandado.' },
      { id: 4, date: '2026-05-24', title: 'Audiencia de Conciliación Programada', desc: 'El juzgado fija fecha para el 29 de Mayo a las 10:00 hs.' }
    ],
    documents: [
      { id: 101, name: 'Demanda_Divorcio_Final.pdf', size: '1.4 MB', date: '2026-05-15' },
      { id: 102, name: 'Acta_Matrimonio_Escaneada.pdf', size: '840 KB', date: '2026-05-10' },
      { id: 103, name: 'Certificado_Nacimiento_Hijos.pdf', size: '920 KB', date: '2026-05-10' }
    ],
    hearings: [
      { id: 201, title: 'Audiencia de Conciliación Art. 637', date: '2026-05-29', time: '10:00 hs', type: 'Presencial' }
    ],
    comments: [
      { id: 301, author: 'Dr. Alejandro Martínez', role: 'Abogado Principal', text: 'La clienta está muy preocupada por la cuota alimentaria provisoria. He solicitado un 30% de los ingresos netos.', time: '2026-05-16 11:24' },
      { id: 302, author: 'Dra. Sofía Castro', role: 'Abogado Colaborador', text: 'Presentamos oficios al empleador del demandado para certificar haberes. El juzgado ya ordenó el libramiento.', time: '2026-05-18 16:45' }
    ]
  },
  {
    id: 'EXP-2026-0015',
    client: 'Sánchez, Juan Carlos',
    type: 'Reclamación de Accidente Vial',
    lawyer: 'Dra. Sofía Castro',
    status: 'Activo',
    date: '2026-03-12',
    priority: 'Media',
    court: 'Juzgado Civil N° 14',
    title: 'Sánchez Juan c/ Seguros La Segunda s/ Daños y Perjuicios',
    description: 'Reclamación civil por accidente de tránsito ocurrido en Av. Corrientes. Daños materiales del vehículo y lesiones leves del conductor.',
    timeline: [
      { id: 1, date: '2026-03-12', title: 'Mediación Previa', desc: 'Se inicia etapa de mediación obligatoria con la aseguradora.' },
      { id: 2, date: '2026-04-05', title: 'Cierre de Mediación sin Acuerdo', desc: 'Se firma acta de cierre por falta de propuesta razonable de la aseguradora.' },
      { id: 3, date: '2026-04-20', title: 'Sorteo e Inicio de Demanda', desc: 'Radicación en Juzgado Civil 14.' }
    ],
    documents: [
      { id: 104, name: 'Demanda_Danios_Sanchez.pdf', size: '2.1 MB', date: '2026-04-20' },
      { id: 105, name: 'Denuncia_Policial_Accidente.pdf', size: '1.1 MB', date: '2026-03-14' },
      { id: 106, name: 'Presupuestos_Reparacion.pdf', size: '3.4 MB', date: '2026-03-20' }
    ],
    hearings: [
      { id: 202, title: 'Audiencia Preliminar de Testigos', date: '2026-06-05', time: '11:30 hs', type: 'Virtual via MS Teams' }
    ],
    comments: [
      { id: 303, author: 'Dra. Sofía Castro', role: 'Abogado Principal', text: 'El perito mecánico ya aceptó el cargo. Estimamos la pericia para mediados del próximo mes.', time: '2026-05-22 09:15' }
    ]
  },
  {
    id: 'EXP-2026-0089',
    client: 'Constructora del Plata S.A.',
    type: 'Incumplimiento de Contrato Comercial',
    lawyer: 'Dr. Alejandro Martínez',
    status: 'En revisión',
    date: '2026-04-28',
    priority: 'Alta',
    court: 'Juzgado Comercial N° 8',
    title: 'Constructora del Plata c/ Distribuidora San Martín s/ Incumplimiento',
    description: 'Demanda ejecutiva por cobro de facturas y rescisión contractual por entrega defectuosa de materiales de construcción.',
    timeline: [
      { id: 1, date: '2026-04-28', title: 'Revisión de Contratos', desc: 'Análisis de cláusulas penalidades y mora de entrega.' },
      { id: 2, date: '2026-05-05', title: 'Envío de Carta Documento', desc: 'Se intima al cumplimiento y entrega bajo apercibimiento de rescisión.' }
    ],
    documents: [
      { id: 107, name: 'Contrato_Suministro_Firmado.pdf', size: '4.8 MB', date: '2026-04-28' },
      { id: 108, name: 'Carta_Documento_Intimacion.pdf', size: '512 KB', date: '2026-05-05' }
    ],
    hearings: [],
    comments: [
      { id: 304, author: 'Dr. Alejandro Martínez', role: 'Abogado Principal', text: 'Preparando la demanda ejecutiva ya que venció el plazo de la carta documento sin respuesta.', time: '2026-05-20 14:10' }
    ]
  },
  {
    id: 'EXP-2026-0004',
    client: 'Fernández, Ricardo Daniel',
    type: 'Despido Incausado',
    lawyer: 'Dra. Mariana López',
    status: 'Cerrado',
    date: '2026-01-15',
    priority: 'Baja',
    court: 'Tribunal del Trabajo N° 2',
    title: 'Fernández Ricardo c/ Logística Express s/ Despido',
    description: 'Reclamación laboral por indemnización por antigüedad, preaviso y multas de ley. Finalizado mediante acuerdo homologado.',
    timeline: [
      { id: 1, date: '2026-01-15', title: 'Inicio del Reclamo', desc: 'Recepción de telegramas de despido.' },
      { id: 2, date: '2026-02-10', title: 'Audiencia SECLO / Ministerio de Trabajo', desc: 'Primera audiencia de conciliación laboral.' },
      { id: 3, date: '2026-03-05', title: 'Firma de Acuerdo Conciliatorio', desc: 'La demandada ofrece abonar el 85% de la liquidación en 3 cuotas.' },
      { id: 4, date: '2026-04-10', title: 'Homologación y Pago Final', desc: 'El tribunal homologa el acuerdo. Se acredita el pago de la última cuota. Archivo.' }
    ],
    documents: [
      { id: 109, name: 'Acuerdo_Homologado_Laboral.pdf', size: '2.3 MB', date: '2026-04-10' },
      { id: 110, name: 'Telegrama_Despido_Escaneado.pdf', size: '320 KB', date: '2026-01-16' }
    ],
    hearings: [],
    comments: [
      { id: 305, author: 'Dra. Mariana López', role: 'Abogado Principal', text: 'Se entregaron las órdenes de pago al cliente. Caso concluido de manera exitosa y satisfactoria.', time: '2026-04-12 18:22' }
    ]
  },
  {
    id: 'EXP-2026-0104',
    client: 'Rodríguez, Marta Beatriz',
    type: 'Sucesión Ab Intestato',
    lawyer: 'Dra. Mariana López',
    status: 'Activo',
    date: '2026-05-02',
    priority: 'Media',
    court: 'Juzgado Civil N° 1',
    title: 'Rodríguez Marta s/ Sucesión Ab Intestato',
    description: 'Juicio sucesorio para la transmisión hereditaria de un inmueble en CABA y cuentas bancarias.',
    timeline: [
      { id: 1, date: '2026-05-02', title: 'Inicio del Trámite', desc: 'Presentación del escrito inicial adjuntando partidas de nacimiento y defunción.' },
      { id: 2, date: '2026-05-12', title: 'Publicación de Edictos', desc: 'Se ordena la publicación en el Boletín Oficial por 3 días.' }
    ],
    documents: [
      { id: 111, name: 'Escrito_Inicio_Sucesion.pdf', size: '1.2 MB', date: '2026-05-02' },
      { id: 112, name: 'Certificado_Defuncion.pdf', size: '750 KB', date: '2026-05-02' }
    ],
    hearings: [],
    comments: [
      { id: 306, author: 'Dra. Mariana López', role: 'Abogado Principal', text: 'Los edictos ya están publicados. Debemos esperar los 30 días reglamentarios para pedir la declaratoria de herederos.', time: '2026-05-18 10:30' }
    ]
  }
];

export const initialClients = [
  { id: 1, name: 'Gómez, María Laura', dni: 'DNI 29.844.120', phone: '+54 11 5822-1049', email: 'maria.gomez@gmail.com', casesCount: 1, status: 'Activo' },
  { id: 2, name: 'Sánchez, Juan Carlos', dni: 'DNI 14.590.224', phone: '+54 11 3944-9988', email: 'jcsanchez@outlook.com', casesCount: 1, status: 'Activo' },
  { id: 3, name: 'Constructora del Plata S.A.', dni: 'CUIT 30-71489022-4', phone: '+54 11 4322-8000', email: 'legales@constructuradelplata.com', casesCount: 2, status: 'Activo' },
  { id: 4, name: 'Fernández, Ricardo Daniel', dni: 'DNI 32.404.992', phone: '+54 11 6299-1144', email: 'ricardof@gmail.com', casesCount: 1, status: 'Inactivo' },
  { id: 5, name: 'Rodríguez, Marta Beatriz', dni: 'DNI 18.232.049', phone: '+54 11 2944-1022', email: 'marta.rodriguez@yahoo.com.ar', casesCount: 1, status: 'Activo' },
  { id: 6, name: 'Alimentos del Sur S.A.', dni: 'CUIT 33-54922108-9', phone: '+54 11 4833-2900', email: 'contacto@alimentosdelsur.com.ar', casesCount: 0, status: 'Activo' }
];

export const initialCalendarEvents = [
  { id: 1, title: 'Audiencia Conciliación Gómez c/ Rossi', date: '2026-05-29', time: '10:00', type: 'hearing', desc: 'Juzgado de Familia N° 3', color: 'bg-rose-500/20 text-rose-300 border-rose-500' },
  { id: 2, title: 'Reunión inicial Alimentos del Sur S.A.', date: '2026-05-26', time: '15:30', type: 'meeting', desc: 'Sala de Reuniones Principal / Virtual', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500' },
  { id: 3, title: 'Vencimiento Edictos Sucesión Rodríguez', date: '2026-05-28', time: '12:00', type: 'deadline', desc: 'Boletín Oficial de la Nación', color: 'bg-amber-500/20 text-amber-300 border-amber-500' },
  { id: 4, title: 'Audiencia Preliminar Sánchez c/ Seguros', date: '2026-06-05', time: '11:30', type: 'hearing', desc: 'Juzgado Civil N° 14', color: 'bg-rose-500/20 text-rose-300 border-rose-500' },
  { id: 5, title: 'Reunión de socios: Planificación Q3', date: '2026-05-27', time: '09:00', type: 'meeting', desc: 'Despacho Dr. Martínez', color: 'bg-purple-500/20 text-purple-300 border-purple-500' },
  { id: 6, title: 'Recordatorio presentar oficios Gómez', date: '2026-05-26', time: '11:00', type: 'reminder', desc: 'Juzgado de Familia N° 3', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500' }
];

export const initialDocuments = [
  { id: 1, name: 'Demanda_Divorcio_Final.pdf', category: 'Escritos Judiciales', status: 'Presentado', date: '2026-05-15', size: '1.4 MB' },
  { id: 2, name: 'Contrato_Suministro_Firmado.pdf', category: 'Contratos', status: 'En revisión', date: '2026-04-28', size: '4.8 MB' },
  { id: 3, name: 'Acta_Acuerdo_SECLO_Homologada.pdf', category: 'Resoluciones', status: 'Aprobado', date: '2026-04-10', size: '2.3 MB' },
  { id: 4, name: 'Denuncia_Policial_Accidente.pdf', category: 'Pruebas Documentales', status: 'Archivado', date: '2026-03-14', size: '1.1 MB' },
  { id: 5, name: 'Carta_Documento_Intimacion.pdf', category: 'Notificaciones', status: 'Enviado', date: '2026-05-05', size: '512 KB' },
  { id: 6, name: 'Poder_General_Judicial.pdf', category: 'Poderes', status: 'Vigente', date: '2026-01-20', size: '1.8 MB' }
];

export const usersList = [
  { id: 1, name: 'Dr. Alejandro Martínez', role: 'Administrador', email: 'a.martinez@estudiomartinez.com', permissions: 'Acceso Total', status: 'online', lastConnection: 'Ahora mismo' },
  { id: 2, name: 'Dra. Sofía Castro', role: 'Abogado', email: 's.castro@estudiomartinez.com', permissions: 'Edición y Carga', status: 'online', lastConnection: 'Hace 5 mins' },
  { id: 3, name: 'Dra. Mariana López', role: 'Abogado', email: 'm.lopez@estudiomartinez.com', permissions: 'Edición y Carga', status: 'offline', lastConnection: 'Ayer' },
  { id: 4, name: 'Lic. Carla Giménez', role: 'Secretario', email: 'secretaria@estudiomartinez.com', permissions: 'Lectura y Carga', status: 'online', lastConnection: 'Ahora mismo' },
  { id: 5, name: 'Estela Pires', role: 'Recepción', email: 'recepcion@estudiomartinez.com', permissions: 'Solo Lectura', status: 'offline', lastConnection: 'Hace 4 horas' }
];

export const invoicesList = [
  { id: 'FAC-2026-0120', client: 'Constructora del Plata S.A.', amount: 4500, status: 'Cobrado', date: '2026-05-05', dueDate: '2026-05-20' },
  { id: 'FAC-2026-0121', client: 'Sánchez, Juan Carlos', amount: 1500, status: 'Cobrado', date: '2026-05-10', dueDate: '2026-05-25' },
  { id: 'FAC-2026-0122', client: 'Gómez, María Laura', amount: 2000, status: 'Pendiente', date: '2026-05-15', dueDate: '2026-05-30' },
  { id: 'FAC-2026-0123', client: 'Alimentos del Sur S.A.', amount: 3500, status: 'Pendiente', date: '2026-05-20', dueDate: '2026-06-04' },
  { id: 'FAC-2026-0124', client: 'Rodríguez, Marta Beatriz', amount: 1000, status: 'Cargado / Borrador', date: '2026-05-24', dueDate: '2026-06-10' }
];

export const notificationsList = [
  { id: 1, title: 'Audiencia Mañana', body: 'Audiencia de Conciliación en el caso Gómez María Laura c/ Rossi Roberto a las 10:00 hs.', time: 'Hace 1 hora', read: false },
  { id: 2, title: 'Vencimiento Próximo', body: 'Faltan 2 días para presentar la acreditación de edictos en Sucesión Rodríguez.', time: 'Hace 3 horas', read: false },
  { id: 3, title: 'Nuevo Documento', body: 'El perito mecánico subió su aceptación de cargo en el caso Sánchez Juan.', time: 'Hace 6 horas', read: true },
  { id: 4, title: 'Cliente Nuevo Asignado', body: 'Alimentos del Sur S.A. ha sido asignado a su cartera por Administración.', time: 'Hace 1 día', read: true }
];
