import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const predefinedCategories = [
  'electronics', 'fashion', 'home and kitchen', 'sports', 'beauty', 'automotive'
];

const CategoriesComponent = () => {
  const [categories, setCategories] = useState(predefinedCategories);
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      const fetchedCategories = response.data.map(cat => cat.name.toLowerCase());
      setAllCategories(fetchedCategories);
      setCategories([...predefinedCategories, ...fetchedCategories]);
      setShowMore(true);
    } catch (error) {
      setError('Error fetching categories');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
      {error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <>
          <ul className="space-y-4 bg-gray-100 p-3 border">
            {categories.map((category, index) => (
              <li key={index} className="flex items-center text-sm font-medium">
                <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
                <Link
                  to={`/category/${category}`}
                  className="relative p-2 rounded-lg flex items-center justify-center overflow-hidden transition-transform transform hover:scale-105"
                >
                  <p className="relative text-lg font-semibold text-gray-800 transition-colors duration-300">
                    {category}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          {!showMore && (
            <div className="text-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'See More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesComponent;
