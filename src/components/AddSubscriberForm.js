import React, { useState } from 'react';

const AddSubscriberForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: 'Panamá',
    phone: '',
    paymentDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const joinDate = new Date().toISOString().split('T')[0];
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    
    const newSubscriber = {
      ...formData,
      joinDate,
      expirationDate: expirationDate.toISOString().split('T')[0],
      status: 'active',
      whatsappLink: `https://wa.me/${formData.phone.replace(/\D/g, '')}`
    };
    
    onAdd(newSubscriber);
    setFormData({
      name: '',
      country: 'Panamá',
      phone: '',
      paymentDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Agregar Nuevo Suscriptor</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">País</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Panamá">Panamá</option>
              <option value="Colombia">Colombia</option>
              <option value="México">México</option>
              <option value="Argentina">Argentina</option>
              <option value="España">España</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono (con código de país)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="+507 6123 4567"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Pago</label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Agregar Suscriptor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscriberForm;