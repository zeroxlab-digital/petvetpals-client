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
        }
    }
});

export const { setCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;