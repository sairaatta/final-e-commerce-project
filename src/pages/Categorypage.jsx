import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">{category.toUpperCase()}</h2>
      {isLoading ? (
        <div className="text-center">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
