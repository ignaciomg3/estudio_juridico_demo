# Front-end para Estudio Jurídico - Demo Comercial

Quiero que desarrolles el front-end completo de una aplicación web moderna para un estudio jurídico, orientada a una demo comercial para clientes.
El objetivo **NO** es construir toda la lógica real del negocio, sino crear una interfaz profesional, clara y visualmente sólida que simule un sistema funcional.

La aplicación debe transmitir:
* Profesionalismo
* Organización
* Seguridad
* Modernidad
* Facilidad de uso

---

## Objetivo del Sistema

Construir una **SPA (Single Page Application)** responsive para escritorio y tablet, enfocada en la gestión jurídica. Debe parecer un sistema real utilizado diariamente por abogados y administrativos.

La demo debe incluir:
* Navegación funcional
* Pantallas realistas
* Tablas con datos mock
* Formularios visuales
* Dashboards
* Estados de expedientes
* Métricas
* Experiencia UX moderna

---

## Stack Tecnológico

Usar:
* **React**
* **Vite**
* **TailwindCSS**
* **React Router**
* **Lucide Icons**
* **Framer Motion** (animaciones suaves)
* **shadcn/ui** para componentes

### Buenas prácticas:
* Componentes reutilizables
* Estructura escalable
* Código limpio
* Naming consistente
* Diseño modular

> [!IMPORTANT]
> **NO usar Bootstrap.**

---

## Diseño Visual

### Estilo
Diseño tipo **SaaS premium / ERP profesional**.
* **Inspiraciones:** Notion, Stripe Dashboard, Linear, Clerk, HubSpot, sistemas jurídicos corporativos.

### Paleta de Colores
Preferentemente:
* Azul oscuro
* Gris grafito
* Blanco
* Pequeños detalles en dorado o cyan

### Sensación Visual
Debe transmitir confianza, legalidad, orden y precisión.

---

## Layout Principal

La aplicación debe tener:

### 1. Sidebar lateral izquierda
Con iconos y navegación. Secciones:
* Dashboard
* Casos
* Clientes
* Agenda
* Documentos
* Usuarios
* Facturación
* Notificaciones
* Reportes
* Configuración

### 2. Header superior
Debe incluir:
* Buscador global
* Avatar del usuario
* Nombre del estudio
* Notificaciones
* Breadcrumb

### 3. Área central dinámica
Donde cambia el contenido según la sección.

---

## Pantallas Requeridas

### 1. Dashboard
Debe contener:
* **Cards KPI:** Ejemplos: Casos activos, audiencias esta semana, clientes activos, facturas pendientes, casos cerrados.
* **Gráficos:** Agregar casos por estado, ingresos mensuales, actividad semanal.
* **Tabla de actividad reciente:** Ejemplo: “Caso Pérez actualizado”, “Nueva audiencia programada”, “Documento agregado”.

### 2. Gestión de Casos
Tabla moderna con:
* Número de expediente
* Cliente
* Tipo de causa
* Abogado asignado
* Estado (badge visual: *Activo*, *En revisión*, *Urgente*, *Cerrado*)
* Fecha
* Prioridad

Debe incluir filtros, búsqueda, paginación visual y botón **“Nuevo Caso”**.

### 3. Detalle de Caso
Vista detallada tipo CRM con secciones:
* **Información general:** Cliente, juzgado, carátula, descripción, abogado responsable.
* **Timeline:** Historial cronológico de movimientos.
* **Documentos adjuntos:** Cards o lista de PDFs.
* **Próximas audiencias:** Calendario o lista.
* **Comentarios internos:** Caja tipo chat interno.

### 4. Clientes
Tabla moderna con:
* Nombre
* DNI/CUIT
* Teléfono
* Email
* Cantidad de causas
* Estado

Agregar ficha de cliente, búsqueda y filtros.

### 5. Agenda / Calendario
Vista calendario moderna. Eventos: audiencias, reuniones, vencimientos, recordatorios. Debe verse elegante y profesional.

### 6. Documentos
Repositorio documental. Características:
* Drag & drop visual
* Categorías
* Estado
* Fecha de carga
* Tamaño de archivo
* Simulación de PDFs y documentos legales

### 7. Usuarios y Roles
Tabla de usuarios con roles:
* Administrador
* Abogado
* Secretario
* Recepción

Mostrar permisos, estado online y última conexión.

### 8. Facturación
Vista financiera simple para mostrar:
* Facturas emitidas, pendientes, cobradas
* Montos
* Gráficos de ingresos

### 9. Notificaciones
Centro de actividad. Ejemplos:
* Audiencia próxima
* Documento vencido
* Nuevo cliente
* Tarea asignada

---

## UX/UI Esperada

La experiencia debe incluir:
* Animaciones suaves
* Hover states
* Transiciones elegantes
* Skeleton loaders
* Modales
* Dropdowns
* Badges
* Tabs
* Tooltips

### Responsive
Debe funcionar correctamente en desktop, notebook y tablet. No hace falta mobile-first extremo, pero sí adaptabilidad razonable.

---

## Datos Mock

Generar datos ficticios pero realistas:
* Nombres
* Expedientes
* Juzgados
* Estados
* Abogados
* Documentos

> [!NOTE]
> **NO usar lorem ipsum excesivo.**

---

## Arquitectura Sugerida

### Carpetas
```
src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── data/
└── utils/
```

### Componentes reutilizables
Crear:
* Tablas genéricas
* Cards KPI
* Badges de estado
* Modales
* Sidebar
* Header
* Gráficos reutilizables

---

## Calidad Esperada

El resultado debe verse como un producto SaaS real, listo para presentar, visualmente premium, coherente y consistente.

La prioridad es:
1. **UX/UI profesional**
2. **Navegación fluida**
3. **Impacto visual**
4. **Organización**
5. **Escalabilidad**

*La lógica backend puede ser simulada con mocks o fake APIs.*

---

## Extras Deseables (Si hay tiempo)

* Modo oscuro
* Login elegante
* Onboarding
* Métricas animadas
* Exportación PDF ficticia
* Drag & drop
* Activity feed en tiempo real simulado

---

## Resultado Esperado

Entregar:
* Proyecto React funcional
* Estructura profesional
* Componentes reutilizables
* Navegación completa
* Diseño moderno
* Demo visual lista para mostrar a potenciales clientes
