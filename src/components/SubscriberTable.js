import React, { useState, useEffect } from 'react';

const SubscriberTable = ({ subscribers, onReminder, onRemove }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'expirationDate', direction: 'ascending' });

  const sortedSubscribers = [...subscribers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('name')}
            >
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('paymentDate')}
            >
              Pago
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingreso</th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('expirationDate')}
            >
              Expira
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedSubscribers.map((subscriber) => (
            <tr key={subscriber.id} className={subscriber.status === 'expiring' ? 'bg-yellow-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">{subscriber.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{subscriber.country}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a href={subscriber.whatsappLink} className="text-blue-600 hover:text-blue-800">
                  {subscriber.phone}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{subscriber.paymentDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{subscriber.joinDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{subscriber.expirationDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 
                    subscriber.status === 'expired' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {subscriber.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => onReminder(subscriber.id)}
                  className="mr-2 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Recordar
                </button>
                <button 
                  onClick={() => onRemove(subscriber.id)}
                  className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriberTable;