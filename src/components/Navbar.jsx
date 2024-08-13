// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';
import { setSearchTerm, setFilteredData, selectProducts } from '../redux/productSlice';

const Navbar = () => {
  const products = useSelector(selectProducts);
  const cart = useSelector((state) => state.cart); // Get cart state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));

    // Filter the products based on the search term
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    dispatch(setFilteredData(filteredProducts));
    navigate('/filter-data'); // Navigate to the page that displays filtered products
  };

  const openSignUp = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };

  const openLogin = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-lg font-bold text-white'>
          <Link to="/">e-shop</Link>
        </div>
        <div className='relative flex-1 mx-4'>
          <form onSubmit={handleSearch} className='relative'>
            <input 
              type="text" 
              placeholder="Search Product" 
              className='w-full border py-2 px-4 rounded'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className='absolute top-3 right-3 text-red-600'>
              <FaSearch />
            </button>
          </form>
        </div>
        <div className='flex items-center space-x-4'>
          <Link to="/cart" className='relative'>
            <FaShoppingCart className='text-lg text-white' />
            {cart.totalQuantity > 0 && (
              <span className='absolute top-0 right-0 text-xs w-4 h-4 bg-red-600 rounded-full flex justify-center items-center text-white'>
                {cart.totalQuantity}
              </span>
            )}
          </Link>
          <button className='hidden md:block text-white' onClick={() => setIsModalOpen(true)}>
            Login | Register
          </button>
          <button className='block md:hidden text-white'>
            <FaUser/>
          </button>
        </div>
      </div>
      <div className='flex items-center justify-center space-x-10 py-4 text-sm font-bold text-white'>
        <Link to="/" className='hover:underline'>Home</Link>
        <Link to="/about" className='hover:underline'>About</Link>
        <Link to="/shop" className='hover:underline'>Shop</Link>
        <Link to="/contact-us" className='hover:underline'>Contact</Link>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {isLogin ? <Login openSignUp={openSignUp}/> : <Register openLogin={openLogin}/>}
      </Modal>
    </nav>
  );
};

export default Navbar;
