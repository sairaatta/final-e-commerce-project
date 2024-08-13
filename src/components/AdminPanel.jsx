import React, { useState } from 'react';
import ProductManagement from '../components/ProductManagement';
import UserManagement from '../components/UserManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <h1 className='text-3xl font-bold mb-4'>Admin Panel</h1>
      <div className='mb-4'>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
      </div>
      {activeTab === 'products' && <ProductManagement />}
      {activeTab === 'users' && <UserManagement />}
    </div>
  );
};

export default AdminPanel;
