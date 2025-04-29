import React from 'react';

const SubscriptionStats = ({ subscribers }) => {
  const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
  const expiringSubscribers = subscribers.filter(s => s.status === 'expiring').length;
  const expiredSubscribers = subscribers.filter(s => s.status === 'expired').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Activos</h3>
        <p className="text-3xl font-bold text-green-600">{activeSubscribers}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Por expirar</h3>
        <p className="text-3xl font-bold text-yellow-500">{expiringSubscribers}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Expirados</h3>
        <p className="text-3xl font-bold text-red-600">{expiredSubscribers}</p>
      </div>
    </div>
  );
};

export default SubscriptionStats;