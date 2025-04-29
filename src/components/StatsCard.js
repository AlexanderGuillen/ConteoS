import React from 'react';

const StatsCard = ({ title, value, color }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow text-center border-t-4 border-${color}-500`}>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
};

export default StatsCard;