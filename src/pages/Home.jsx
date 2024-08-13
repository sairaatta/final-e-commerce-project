// pages/Home.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProducts } from '../redux/productSlice';
import CategoriesComponent from '../components/CategoriesComponent';
import HeroImage from '../assets/Images/shop2.jpg';
import InfoSection from '../components/InfoSection';
import CategorySection from '../components/CategorySection';
import Shop from './Shop';
import ProductCard from '../components/ProductCard';
import { localProducts } from '../data/products'; // Import local products data
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  React.useEffect(() => {
    dispatch(setProducts(localProducts));
  }, [dispatch]);

  return (

    <div>
    {/* Navbar (if you have one) */}
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">E-Shop</div>
        <div>
         
          <Link to="/admin" className="bg-green-500 text-white py-2 px-4 hover:bg-green-600 rounded-lg">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>

    
      <div className='bg-white mt-2 px-4 md:px-16 lg:px-24 py-4'>
        <div className='container mx-auto py-4 flex flex-col md:flex-row space-x-2'>
          <div className='w-full md:w-3/12'>
            <div className='bg-red-600 text-white text-xs font-bold px-2 py-2.5'>Shop by Categories</div>
            <CategoriesComponent />
          </div>
          <div className='w-full md:w-9/12 mt-8 md:mt-0 h-96 relative'>
            <img src={HeroImage} alt="Hero" className='h-full w-full object-cover' />
            <div className='absolute top-16 left-8'>
              <p className='text-gray-600 mb-4'>SAIRA | e-shop</p>
              <h2 className='text-3xl font-bold'>WELCOME TO E-SHOP</h2>
              <p className='text-xl mt-2.5 font-bold text-gray-800'>MILLIONS+ PRODUCTS</p>
              <button className='bg-red-600 px-8 py-1.5 text-white mt-4 hover:bg-red-700 transform transition-transform duration-300 hover:scale-105'>
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
        <InfoSection />
        <CategorySection />



   

   

        <div className='container mx-auto py-12'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Top Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
            {products.length > 0 ? (
              products.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
      <Shop />
    </div>
  );
};

export default Home;
