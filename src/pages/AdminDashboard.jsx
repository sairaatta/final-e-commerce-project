// AdminDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageUsers from '../components/ManageUsers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab === 'products') {
      navigate('/manage-products');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleTabClick('products')}
        >
          Manage Products
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleTabClick('users')}
        >
          Manage Users
        </button>
      </div>
      <div>
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <ManageUsers />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
