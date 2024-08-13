import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-20 px-4 md:px-16 lg:px-24'>
      <div className='flex flex-col md:flex-row justify-between items-start text-base font-normal space-y-8 md:space-y-0'>
        <div className='md:w-1/3'>
          <h3 className='text-lg font-semibold'>e-shop</h3>
          <p>Your one-shop is all you need. Shop with us and experience the best online shopping experience.</p>
        </div>
        <div className='md:w-1/3 flex flex-col'>
          <h3 className='text-lg font-semibold'>Quick Links</h3>
          <ul className='mt-4 space-y-2'>
            <li>
              <Link to="/" className='hover:underline'>Home</Link>
            </li>
            <li>
              <Link to="/about" className='hover:underline'>About</Link>
            </li>
            <li>
              <Link to="/contact" className='hover:underline'>Contact</Link>
            </li>
            <li>
              <Link to="/shop" className='hover:underline'>Shop</Link>
            </li>
          </ul>
        </div>
        <div className='md:w-1/3'>
          <h4 className='text-lg font-semibold'>Follow us</h4>
          <div className='flex space-x-4 mt-4'>
            <a href="#" className='hover:text-gray-400'><FaFacebook /></a>
            <a href="#" className='hover:text-gray-400'><FaTwitter /></a>
            <a href="#" className='hover:text-gray-400'><FaWhatsapp /></a>
            <a href="#" className='hover:text-gray-400'><FaInstagram /></a>
          </div>
          <form className='flex items-center mt-8'>
            <input type="email" placeholder="Enter email" className='w-full p-2 rounded-l-lg bg-gray-800 border border-gray-600' />
            <button className='bg-red-600 text-white px-4 py-2 rounded-r-lg border border-gray-600'>Subscribe</button>
          </form>
        </div>
        
      </div>
      <div className='mt-8 border-t border-gray-700 pt-4 '>
          <div className='container mx-auto
           flex flex-col md:flex-row justify-between items-center'>
            <p>&copy; 2024 e-shop All rights reserved. 
              <div className='flex justify-center md:justify-end mt-4 md:mt-0 space-x-96'>
               <a href="#" className='hover:underline'>Privacy Policy</a>
               <a href="#" className='hover:underline'>Terms & Conditions</a>
              </div>
            </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;