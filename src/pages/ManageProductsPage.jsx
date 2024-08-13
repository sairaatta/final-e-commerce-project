import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      title: 'New Product',
      price: 0,
      description: 'Description',
      category: 'Category',
      image: 'https://via.placeholder.com/150'
    };
    setProducts([newProduct, ...products]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleEditProduct = (productId, updatedProduct) => {
    setProducts(products.map((product) => (product.id === productId ? updatedProduct : product)));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <button
        onClick={handleAddProduct}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <img src={product.image} alt={product.title} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() =>
                handleEditProduct(product.id, {
                  ...product,
                  title: 'Updated Product',
                  price: product.price + 10,
                })
              }
              className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProductsPage;