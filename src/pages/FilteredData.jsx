import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import NoProduct from '../assets/images/notfound.png';
import { selectFilteredProducts } from '../redux/productSlice';

const FilteredData = () => {
  const filterProducts = useSelector(selectFilteredProducts);

  return (
    <div className='container mx-auto px-4 md:px-16 lg:px-24 py-4'>
      {filterProducts && filterProducts.length > 0 ? (
        <>
          <h2 className='text-2xl font-bold mb-6 text-center'>Shop</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
            {filterProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-2xl font-bold text-center'>Product not found</h2>
          <img src={NoProduct} alt="No products found" className='mt-1'/>
        </div>
      )}
    </div>
  );
};

export default FilteredData;
