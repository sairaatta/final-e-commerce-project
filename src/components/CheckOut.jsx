import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons

const Checkout = ({ setOrder }) => {
  const cart = useSelector((state) => state.cart);
  const [billingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(true);
  const [paymentToggle, setPaymentToggle] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zip: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = () => {
    // Check if setOrder is defined and is a function
    if (typeof setOrder === 'function') {
      const newOrder = {
        products: cart.products,
        orderNumber: "12345", // Example order number
        shippingInformation: shippingInfo,
        totalPrice: cart.totalPrice,
      };
      
      // Save the order to local storage
      localStorage.setItem('currentOrder', JSON.stringify(newOrder));
      
      // Optionally, call the setOrder function if needed
      setOrder(newOrder);
  
      // Clear the cart
      dispatch(clearCart());
  
      // Display success message
      alert('Order placed successfully!');
  
      // Navigate to the order summary page
      navigate('/order-summary');
    } else {
      console.error('setOrder is not defined or is not a function');
    }
  };

  return (
    <div className='container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24'>
      <div>
        <h3 className='text-2xl font-semibold mb-4'>Checkout</h3>
        <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
          <div className='md:w-2/3'>
            {/* Billing Toggle */}
            <div className='border p-2 mb-6'>
              <div className='flex items-center justify-between cursor-pointer' onClick={() => setBillingToggle(!billingToggle)}>
                <h3 className='text-lg font-semibold mb-2'>Billing Information</h3>
                {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>
              <div className={`space-y-4 ${billingToggle ? "" : "hidden"}`}>
                <div>
                  <label className='block text-gray-700'>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder='Enter Name'
                    className='w-full px-3 py-2 border'
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder='Enter Email'
                    className='w-full px-3 py-2 border'
                  />
                </div>
                <div>
                  <label className='block text-gray-700'>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder='Enter Phone #'
                    className='w-full px-3 py-2 border'
                  />
                </div>
              </div>
            </div>

            {/* Shipping Toggle */}
            <div className='border p-2 mb-6'>
              <div className='flex items-center justify-between cursor-pointer' onClick={() => setShippingToggle(!shippingToggle)}>
                <h3 className='text-lg font-semibold mb-2'>Shipping Information</h3>
                {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>
              <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
                <div>
                  <label className='block text-gray-700'>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder='Enter Address'
                    className='w-full px-3 py-2 border'
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder='Enter City'
                    className='w-full px-3 py-2 border'
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className='block text-gray-700'>ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    placeholder='Enter ZIP Code'
                    className='w-full px-3 py-2 border'
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className='border p-2 mb-6'>
              <div className='flex items-center justify-between cursor-pointer' onClick={() => setPaymentToggle(!paymentToggle)}>
                <h3 className='text-lg font-semibold mb-2'>Payment Method</h3>
                {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
              </div>
              <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
                {/* Cash on Delivery */}
                <div className='flex items-center mb-2'>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label className='block text-gray-700 ml-2'>Cash On Delivery</label>
                </div>
                {/* Debit Card */}
                <div className='flex items-center mb-2'>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "dc"}
                    onChange={() => setPaymentMethod("dc")}
                  />
                  <label className='block text-gray-700 ml-2'>Debit Card</label>
                </div>
                {paymentMethod === "dc" && (
                  <div className='mt-4'>
                    <h3 className='text-lg font-semibold mb-2'>Debit Card Information</h3>
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-gray-700'>Card Number</label>
                        <input
                          type="text"
                          placeholder='Enter Card Number'
                          className='w-full px-3 py-2 border'
                        />
                      </div>
                      <div>
                        <label className='block text-gray-700'>Card Holder Name</label>
                        <input
                          type="text"
                          placeholder='Enter Card Holder Name'
                          className='w-full px-3 py-2 border'
                        />
                      </div>
                      <div className='flex space-x-4'>
                        <div className='flex-1'>
                          <label className='block text-gray-700'>Expire Date</label>
                          <input
                            type="text"
                            placeholder='MM/YY'
                            className='w-full px-3 py-2 border'
                          />
                        </div>
                        <div className='flex-1'>
                          <label className='block text-gray-700'>CVV</label>
                          <input
                            type="text"
                            placeholder='CVV'
                            className='w-full px-3 py-2 border'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='mt-8'>
              <button
                onClick={handleOrder}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Place Order
              </button>
            </div>
          </div>

          <div className='md:w-1/3'>
            {/* Order Summary */}
            <div className='border p-4'>
              <h3 className='text-xl font-semibold mb-4'>Order Summary</h3>
              {cart.products.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                cart.products.map((product, index) => (
                  <div key={index} className='flex items-center mb-4'>
                    <img src={product.image} alt={product.name} className='w-16 h-16 object-cover mr-4' />
                    <div>
                      <h4 className='font-semibold'>{product.name}</h4>
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
              <div className='flex justify-between font-semibold mt-4'>
                <span>Total Price:</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
