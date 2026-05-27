import { ArrowRight, Award, Building2, CalendarDays, Mail, MapPin, Phone, Scale, ShieldCheck, Users } from 'lucide-react';

const highlights = [
  { label: 'Años de experiencia', value: '18+', icon: Award },
  { label: 'Casos gestionados', value: '500+', icon: Scale },
  { label: 'Clientes activos', value: '150+', icon: Users },
  { label: 'Respuestas en 24 hs', value: '100%', icon: CalendarDays },
];

const practiceAreas = [
  'Derecho de familia',
  'Derecho laboral',
  'Cobros y ejecuciones',
  'Contratos comerciales',
  'Sucesiones',
  'Mediación y negociación',
];

const contactItems = [
  { label: 'Teléfono', value: '+54 9 3513 33-2155', icon: Phone },
  { label: 'Email', value: 'contacto@estudioperez.com', icon: Mail },
  {
    label: 'Dirección',
    value: 'Miguel Calixto del Corro, 661 piso 1 Cba.',
    icon: MapPin,
    link: 'https://www.google.com/maps/place/31%C2%B025\'16.7%22S+64%C2%B011\'46.8%22W/@-31.4213066,-64.1989207,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-31.4213066!4d-64.1963458?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D',
  },
  { label: 'Instagram', value: '@est.juridicopr', icon: Users, link: 'https://www.instagram.com/est.juridicopr/' },
];

export default function Inicio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 right-[-6rem] h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute top-1/3 left-[-8rem] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,1))]" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 text-slate-950 shadow-lg shadow-gold-500/20">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-400">Estudio Jurídico</p>
              <h1 className="text-lg font-bold text-white">Pérez & Asociados</h1>
            </div>
          </div>
          <a
            href="mailto:contacto@estudioperez.com"
            className="hidden items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-xs font-semibold text-gold-300 transition-colors hover:bg-gold-500/15 sm:inline-flex"
          >
            Agendar consulta
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </header>

        <section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.25fr_0.9fr] lg:py-16">
          <div className="space-y-8">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Confianza, estrategia y resultados
              </span>
              <div className="space-y-4">
                <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Defensa jurídica con foco en experiencia, precisión y respuesta rápida.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Acompañamos personas, familias y empresas con una práctica sólida en litigios, negociación y gestión integral de causas. Trabajamos con visión estratégica y comunicación clara en cada etapa del proceso.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-gold-400" />
                    <p className="mt-3 text-2xl font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:contacto@estudioperez.com"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
              >
                Contactar ahora
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver contacto
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Perfil del estudio</p>
                  <h3 className="text-xl font-bold text-white">Trayectoria y criterio profesional</h3>
                </div>
              </div>

              <div className="space-y-4 py-5 text-sm leading-6 text-slate-300">
                <p>
                  Más de 18 años asesorando en asuntos judiciales y extrajudiciales, con atención personalizada y seguimiento continuo.
                </p>
                <p>
                  Priorizamos soluciones eficientes, prevención de conflictos y una presencia firme en audiencias, negociaciones y presentaciones.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {practiceAreas.map((area) => (
                  <div key={area} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-200">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div id="contacto" className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 shadow-2xl shadow-slate-950/30">
              <h3 className="text-lg font-bold text-white">Contacto</h3>
              <p className="mt-1 text-sm text-slate-400">Atención presencial y virtual para consultas nuevas y seguimiento de expedientes.</p>

              <div className="mt-5 space-y-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="mt-0.5 rounded-lg bg-gold-500/10 p-2 text-gold-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-white underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-gold-500/20 bg-gold-500/10 p-4 text-sm text-gold-100">
                Consultas iniciales con agenda previa y respuesta en el día hábil.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}