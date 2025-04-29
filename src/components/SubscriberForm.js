import React, { useState } from 'react';

const SubscriberForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    country: 'Panamá',
    phone: '',
    paymentDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubscriber = {
      ...form,
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0],
      expirationDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      status: 'active',
      whatsappLink: `https://wa.me/${form.phone.replace(/\D/g, '')}`
    };
    onSubmit(newSubscriber);
    setForm({
      name: '',
      country: 'Panamá',
      phone: '',
      paymentDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">Nuevo Suscriptor</h2>
      <div>
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">País</label>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Panamá">Panamá</option>
          <option value="Colombia">Colombia</option>
          <option value="México">México</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="+50761234567"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Fecha de Pago</label>
        <input
          type="date"
          name="paymentDate"
          value={form.paymentDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Agregar
      </button>
    </form>
  );
};

export default SubscriberForm;