import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Order from '../components/Order';
import Checkout from '../components/CheckOut';


const OrderHistory = () => {
  const [storedOrders, setStoredOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    setStoredOrders(orders);
    setFilteredOrders(orders);
  }, []);

  const handleDeleteHistory = () => {
    localStorage.removeItem('orders');
    setStoredOrders([]);
    setFilteredOrders([]);
    setShowOrders(false);
  };

  const validationSchema = Yup.object({
    searchQuery: Yup.string().required('Please enter a search term'),
  });

  const handleSearch = (values) => {
    const { searchQuery } = values;
    const filtered = storedOrders.filter(order =>
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleViewOrder = (order) => {
    navigate('/order-summary', { state: { order } });
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Order History</h2>

      <Formik
        initialValues={{ searchQuery: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSearch}
      >
        <Form className="mb-4">
          <div className="flex flex-col items-center">
            <div className="mb-2 w-2/3">
              <Field
                name="searchQuery"
                type="text"
                placeholder="Search by user or order name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="searchQuery"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Search
            </button>
          </div>
        </Form>
      </Formik>

      <button
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
        onClick={() => setShowOrders(prev => !prev)}
      >
        {showOrders ? 'Hide Order History' : 'View Order History'}
      </button>

      {showOrders && (
        <div className='mt-6'>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div key={index} className='mb-4'>
                <button
                  onClick={() => handleViewOrder(order)}
                  className='bg-green-500 text-white py-2 px-4 rounded'
                >
                  View Order Details
                </button>
                <Order order={order} />
              </div>
            ))
          ) : (
            <p className='text-gray-600'>No orders found.</p>
          )}
        </div>
      )}

      {storedOrders.length > 0 && (
        <button
          onClick={handleDeleteHistory}
          className="bg-red-600 text-white py-2 px-4 rounded mt-4"
        >
          Delete Order History
        </button>
      )}
    </div>
  );
};

export default OrderHistory;
