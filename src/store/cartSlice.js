import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd';

const findItemIndex = (cart, newItem) => {
    return cart.findIndex(item => item.uid === newItem.uid);
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

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex].quantity += 1;
                
            notification['info']({
                message: 'Item already in cart',
                placement: 'bottomRight',
                duration: 1
            });

            } else {
                state.cart.push(newItem);
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
            state.cart = state.cart.filter(item => item.id !== itemIdToRemove);
        },
    }
})


export const { updateCart, removeCart } = cartSlice.actions

export default cartSlice
