import React, { useState, useEffect } from 'react';
import SubscriberForm from './components/SubscriberForm';
import SubscriberList from './components/SubscriberList';
import StatsCard from './components/StatsCard';
import ReminderModal from './components/ReminderModal';
import initialData from './mock/subscribersData';

const App = () => {
  const [subscribers, setSubscribers] = useState(() => {
    const saved = localStorage.getItem('jardinesSubscribers');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [reminderSubscriber, setReminderSubscriber] = useState(null);

  useEffect(() => {
    localStorage.setItem('jardinesSubscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    const checkExpirations = () => {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      setSubscribers(prev => 
        prev.map(sub => {
          if (sub.expirationDate === tomorrowStr && sub.status === 'active') {
            return { ...sub, status: 'expiring' };
          } else if (sub.expirationDate <= today && sub.status !== 'expired') {
            return { ...sub, status: 'expired' };
          }
          return sub;
        })
      );
    };

    checkExpirations();
    const interval = setInterval(checkExpirations, 86400000); // Daily check

    return () => clearInterval(interval);
  }, []);

  const addSubscriber = (newSubscriber) => {
    setSubscribers([...subscribers, newSubscriber]);
  };

  const removeSubscriber = (id) => {
    setSubscribers(subscribers.filter(sub => sub.id !== id));
  };

  const sendReminder = () => {
    alert(`Recordatorio enviado a ${reminderSubscriber.name}`);
    setReminderSubscriber(null);
  };

  const stats = {
    active: subscribers.filter(s => s.status === 'active').length,
    expiring: subscribers.filter(s => s.status === 'expiring').length,
    expired: subscribers.filter(s => s.status === 'expired').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Gestor de Suscriptores - JardinesPYT</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Activos" value={stats.active} color="green" />
          <StatsCard title="Por Expirar" value={stats.expiring} color="yellow" />
          <StatsCard title="Expirados" value={stats.expired} color="red" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SubscriberList 
              subscribers={subscribers}
              onRemind={setReminderSubscriber}
              onRemove={removeSubscriber}
            />
          </div>
          <div>
            <SubscriberForm onSubmit={addSubscriber} />
          </div>
        </div>

        {reminderSubscriber && (
          <ReminderModal
            subscriber={reminderSubscriber}
            onClose={() => setReminderSubscriber(null)}
            onConfirm={sendReminder}
          />
        )}
      </div>
    </div>
  );
};

export default App;

// DONE