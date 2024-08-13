import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <h3 className='text-2xl font-semibold mb-4'>Order Summary</h3>
      <div className='flex flex-col md:flex-row justify-between space-x--10 mt-8'>
        <div className='md:w-2/3'>
          {cart.products.map((product) => (
            <div
              key={product.id}
              className='flex justify-between border-b py-4 text-sm font-bold'
            >
              <div className='md:flex items-center space-x-4'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-16 h-16 object-contain rounded'
                />
                <div className='flex-1 ml-4'>
                  <h3 className='text-lg font-semibold'>{product.name}</h3>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </div>
              <div className='flex space-x-12 items-center'>
                <p>${product.price}</p>
                <p>${(product.quantity * product.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='md:w-1/3 bg-white p-6 rounded-lg shadow-md border'>
          <h3 className='text-sm font-semibold mb-5'>Order Total</h3>
          <div className='flex justify-between mb-4'>
            <span>Total Price:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <button
            className='w-full bg-blue-600 text-white py-2 hover:bg-blue-800'
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
