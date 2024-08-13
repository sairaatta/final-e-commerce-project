// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import OrderSummary from './pages/OderSummary';
import FilteredData from './pages/FilteredData';
import ProductDetail from './pages/ProductDetail';
import Categorypage from './pages/Categorypage';
import OrderHistory from "./components/OrderHistory";
import About from './pages/About';
// import AdminPanel from './pages/AdminPanel';
import CategoriesComponent from './components/CategoriesComponent';
import AdminDashboard from './pages/AdminDashboard';
import ManageProductsPage from "./pages/ManageProductsPage";
import ManageUsersPage from './pages/ManageUserPage';
import ContactUs from './pages/ContactUs';
import Order from './components/Order';
import Checkout from './components/CheckOut';

const App = () => {
  const [order, setOrder] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order' element={<Order />} />

          <Route path='/contact-us' element={<ContactUs  />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path='/filter-data' element={<FilteredData />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/category/:category' element={<Categorypage />} />
          <Route path='/categories' element={<CategoriesComponent />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path="/manage-users" element={<ManageUsersPage />} />

          <Route path="/manage-products" element={<ManageProductsPage />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/admin-panel' element={<AdminPanel />} /> */}
          <Route path='/admin' element={<AdminDashboard />} />

         
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
