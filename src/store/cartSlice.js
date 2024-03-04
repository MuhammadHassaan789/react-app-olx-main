import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd';

const findItemIndex = (cart, newItem) => {
    return cart.findIndex(item => item.adId === newItem.adId);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        updateCart: (state, data) => {
            const newItem = data.payload;
            const existingItemIndex = findItemIndex(state.cart, newItem);

            console.log('existingItemIndex', existingItemIndex)
            console.log('newItem', newItem)

            if (existingItemIndex !== -1) {
                console.log('Quantity Increasing')
                state.cart[existingItemIndex].qty += 1;

                notification['info']({
                    message: 'Item already in cart',
                    placement: 'bottomRight',
                    duration: 1
                });

            } else {
                console.log('Added')
                state.cart.push({ ...newItem, qty: 1 });
                notification['success']({
                    message: 'Item added to the cart',
                    placement: 'bottomRight',
                    duration: 1
                });
            }

            console.log('updating cart', state.cart);
        },

        removeCart: (state, action) => {
            const itemIdToRemove = action.payload;
            state.cart = state.cart.filter(item => item.adId !== itemIdToRemove);
        },
    }
})


export const { updateCart, removeCart } = cartSlice.actions

export default cartSlice
