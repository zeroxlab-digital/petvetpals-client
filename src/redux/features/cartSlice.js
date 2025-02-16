import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: [] },
    reducers: {
        setCart: (state, action) => {
            const { product, order_quantity } = action.payload;
            const { _id } = product;
            const existingProduct = state.cart.find(item => item.product._id === _id);
            if (existingProduct) {
                existingProduct.order_quantity += order_quantity;
            } else {
                state.cart.push({ product, order_quantity });
            }
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const productToUpdate = state.cart.find(item => item.product._id === productId);
            if (productToUpdate) {
                productToUpdate.order_quantity = quantity;
            }
        },
        removeProductFromCart: (state, action) => {
            const productId = action.payload;
            const filtered_products = state.cart.filter(item => item.product._id !== productId);
            state.cart = filtered_products;
        }
    }
});

export const { setCart, updateQuantity, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;