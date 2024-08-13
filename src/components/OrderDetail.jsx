import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orders = useSelector((state) => state.orders);
  const order = orders.find((order) => order.id === parseInt(orderId));

  const [showSavePrompt, setShowSavePrompt] = useState(false);

  useEffect(() => {
    if (order && showSavePrompt === 'yes') {
      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  }, [order, showSavePrompt]);

  if (!order) {
    return (
      <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
        <p className='text-red-600'>Order not found.</p>
        <button 
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handleSaveResponse = (response) => {
    setShowSavePrompt(response);
  };

  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>
      <div className='p-4 border rounded-lg bg-gray-100'>
        <p className='font-semibold mb-2'>Order Number: {order.id}</p>
        
        <div className='mt-4'>
          <h3 className='text-md font-semibold mb-2'>Shipping Information</h3>
          <p>{order.shippingInformation.address}</p>
          <p>{order.shippingInformation.city}</p>
          <p>{order.shippingInformation.zip}</p>
        </div>
        
        <div className='mt-4'>
          <h4 className='text-md font-semibold mb-2'>Products Ordered</h4>
          {order.products.map(product => (
            <div key={product.id} className='flex justify-between mt-2'>
              <p>{product.name} x {product.quantity}</p>
              <p>${product.price.toFixed(2)} x {product.quantity}</p>
            </div>
          ))}
        </div>
        
        <div className='mt-4 flex justify-between'>
          <span className='font-semibold'>Total Price: </span>
          <span className='font-semibold'>${order.totalPrice.toFixed(2)}</span>
        </div>

        {showSavePrompt === 'pending' && (
          <div className='mt-4 p-4 border rounded-lg bg-gray-200'>
            <p>Would you like to save this order to local storage?</p>
            <button 
              className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
              onClick={() => handleSaveResponse('yes')}
            >
              Yes
            </button>
            <button 
              className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-4'
              onClick={() => handleSaveResponse('no')}
            >
              No
            </button>
          </div>
        )}

        <div className='mt-4'>
          <button 
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
            onClick={() => setShowSavePrompt('pending')}
          >
            Save Order
          </button>
          <button 
            className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 ml-4'
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
