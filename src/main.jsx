import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import store from './store.jsx'
import {Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store}>
        <App />
    </Provider>, 
        
   
    
);
