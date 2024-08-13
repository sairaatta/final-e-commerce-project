// src/redux/productSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://api.escuelajs.co/api/v1/products');
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    filteredProducts: [],
    searchTerm: '',
    status: null,
  },
  reducers: {
    setFilteredData: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    }
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { editProduct, deleteProduct, setFilteredData , setSearchTerm , setProducts , addProduct} = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectFilteredProducts = (state) => state.product.filteredProducts;

export default productSlice.reducer;
