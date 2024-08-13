// src/redux/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    setOrders(state, action) {
      return action.payload;
    },
    addOrder(state, action) {
      state.push(action.payload);
    },
    updateOrder(state, action) {
      const index = state.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setOrders, addOrder, updateOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
