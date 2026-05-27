import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import CaseDetail from './pages/CaseDetail';
import Clients from './pages/Clients';
import Agenda from './pages/Agenda';
import Documents from './pages/Documents';
import Users from './pages/Users';
import Billing from './pages/Billing';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Mock Data Source
import { 
  initialCases, 
  initialClients, 
  initialCalendarEvents, 
  initialDocuments, 
  invoicesList, 
  notificationsList 
} from './data/mockData';

export default function App() {
  const [currentView, setView] = useState('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  // States maintained at the root for real-time reactivity across components
  const [cases, setCases] = useState(initialCases);
  const [clients, setClients] = useState(initialClients);
  const [events, setEvents] = useState(initialCalendarEvents);
  const [documents, setDocuments] = useState(initialDocuments);
  const [invoices, setInvoices] = useState(invoicesList);
  const [notifications, setNotifications] = useState(notificationsList);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleSetView = (view) => {
    setView(view);
    // Reset selected case when navigating away
    if (view !== 'case-detail') {
      setSelectedCaseId(null);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            setView={handleSetView} 
            setSelectedCaseId={setSelectedCaseId} 
          />
        );
      case 'cases':
        return (
          <Cases 
            cases={cases} 
            setCases={setCases} 
            setView={handleSetView} 
            setSelectedCaseId={setSelectedCaseId} 
          />
        );
      case 'case-detail':
        return (
          <CaseDetail 
            caseId={selectedCaseId} 
            cases={cases} 
            setCases={setCases} 
            setView={handleSetView} 
          />
        );
      case 'clients':
        return (
          <Clients 
            clients={clients} 
            setClients={setClients} 
            setView={handleSetView} 
          />
        );
      case 'agenda':
        return (
          <Agenda 
            events={events} 
            setEvents={setEvents} 
          />
        );
      case 'documents':
        return (
          <Documents 
            documents={documents} 
            setDocuments={setDocuments} 
          />
        );
      case 'users':
        return (
          <Users />
        );
      case 'billing':
        return (
          <Billing 
            invoices={invoices} 
            setInvoices={setInvoices} 
          />
        );
      case 'notifications':
        return (
          <Notifications 
            notifications={notifications} 
            setNotifications={setNotifications}
            markAllAsRead={markAllAsRead} 
          />
        );
      case 'reports':
        return (
          <Reports />
        );
      case 'settings':
        return (
          <Settings />
        );
      default:
        return (
          <div className="p-6 text-center text-slate-500">
            Página en desarrollo.
          </div>
        );
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        setView={handleSetView} 
        notificationsCount={unreadCount} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <Header 
          currentView={currentView} 
          setView={handleSetView} 
          notifications={notifications}
          markAllAsRead={markAllAsRead}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 overflow-y-auto bg-slate-950">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
