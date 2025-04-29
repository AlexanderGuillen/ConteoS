import React from 'react';

const SubscriberList = ({ subscribers, onRemind, onRemove }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Pago</th>
            <th className="px-4 py-2 text-left">Expira</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map(sub => (
            <tr key={sub.id} className={sub.status === 'expiring' ? 'bg-yellow-50' : ''}>
              <td className="px-4 py-2">{sub.name}</td>
              <td className="px-4 py-2">
                <a href={sub.whatsappLink} className="text-blue-600 hover:underline">
                  {sub.phone}
                </a>
              </td>
              <td className="px-4 py-2">{sub.paymentDate}</td>
              <td className="px-4 py-2">{sub.expirationDate}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  sub.status === 'active' ? 'bg-green-100 text-green-800' :
                  sub.status === 'expired' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {sub.status}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button 
                  onClick={() => onRemind(sub)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Recordar
                </button>
                <button 
                  onClick={() => onRemove(sub.id)}
                  className="text-red-600 hover:text-red-800"
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

export default SubscriberList;