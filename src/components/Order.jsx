import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Redirect or display an error if no order details are available
  if (!order) {
    return (
      <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
        <p className='text-red-600'>No order details available.</p>
        <button 
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zip: Yup.string().required('Required')
  });

  const initialValues = {
    email: '',
    address: order.shippingInformation.address || '',
    city: order.shippingInformation.city || '',
    zip: order.shippingInformation.zip || ''
  };

  const onSubmit = (values) => {
    console.log('Form data', values);
    setShowOrderSummary(true);
  };

  const handleOrder = () => {
    console.log('Placing order');
    setShowOrderSummary(true);
  };

  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>
      <p>Your order has been placed successfully. You will receive an email confirmation.</p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className='mt-4'>
            <div className='mb-4'>
              <label className='block text-sm font-medium'>Email</label>
              <Field
                type='email'
                name='email'
                className='mt-1 p-2 border rounded w-full'
              />
              <ErrorMessage name='email' component='div' className='text-red-600 text-sm' />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium'>Address</label>
              <Field
                type='text'
                name='address'
                className='mt-1 p-2 border rounded w-full'
              />
              <ErrorMessage name='address' component='div' className='text-red-600 text-sm' />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium'>City</label>
              <Field
                type='text'
                name='city'
                className='mt-1 p-2 border rounded w-full'
              />
              <ErrorMessage name='city' component='div' className='text-red-600 text-sm' />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium'>Zip</label>
              <Field
                type='text'
                name='zip'
                className='mt-1 p-2 border rounded w-full'
              />
              <ErrorMessage name='zip' component='div' className='text-red-600 text-sm' />
            </div>

            <button
              type='submit'
              className='w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800'
            >
              Place Order
            </button>
          </Form>
        )}
      </Formik>

     {showOrderSummary && (
        <div className='mt-6 p-4 border rounded-lg bg-gray-100'>
          <h1 className='text-lg font-semibold mb-2'>Order Summary</h1>
          <p>Order Number: {order.orderNumber}</p>
          <div className='mt-4'>
            <h2 className='text-md font-semibold mb-2'>Shipping Information</h2>
            <p>{order.shippingInformation.address}</p>
            <p>{order.shippingInformation.city}</p>
            <p>{order.shippingInformation.zip}</p>
          </div>
          <div className='mt-4'>
            <h3 className='text-md font-semibold mb-2'>Products Ordered</h3>
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
        </div>
      )}

      <div className='mt-4'>
        <button 
          className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
      </div>
  );
};

export default Order;