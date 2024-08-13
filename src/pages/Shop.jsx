// pages/Shop.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { localProducts } from '../data/products'; // Import local products data

const Shop = () => {
  const dispatch = useDispatch();

  // Set local products in the Redux store
  React.useEffect(() => {
    dispatch(setProducts(localProducts));
  }, [dispatch]);

  return (
    <div className='container mx-auto px-4 md:px-16 lg:px-24 py-4'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Shop</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
        {localProducts.length > 0 ? (
          localProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
