import React from 'react';

const ReminderModal = ({ subscriber, onClose, onConfirm }) => {
  if (!subscriber) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Enviar Recordatorio</h2>
        <p>¿Enviar recordatorio a {subscriber.name} ({subscriber.phone})?</p>
        <p className="text-sm text-gray-500 mt-2">Expira el: {subscriber.expirationDate}</p>
        <div className="flex justify-end space-x-3 mt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;