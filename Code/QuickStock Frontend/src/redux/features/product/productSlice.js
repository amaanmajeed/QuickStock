import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService';
import { toast } from 'react-toastify';

const initialState = {
    product: null,
    products: [],
    isError: [],
    isSuccess: false,
    isLoading: false,
    message: "",
    totalStoreValue: 0,
    outOfStock: 0,
    category: "",

}

// Create New Products
export const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            console.log("Product Slice", formData)
            return await productService.createProduct(formData)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete Product
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        try {
            console.log("Product Slice");
            return await productService.deleteProduct(id)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action) {
            const products = action.payload;
            const array = []
            products.map((item) => {
                const { price, quantity } = item;
                const productValue = price * quantity;
                return array.push(productValue);
            });
            const totalValue = array.reduce((a, b) => {
                return a + b;
            }, 0)
            state.totalStoreValue = totalValue;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log(action.payload)
                state.products.push(action.payload)
                toast.success("Product added Successfully")
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                toast.success("Product deleted Successfully")
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })

    }
});

export const { CALC_STORE_VALUE } = productSlice.actions

export default productSlice.reducer
export const selectIsLoading = (state) => state.product.isLoading
export const selectTotalStoreValue = (state) => state.product.totalStoreValue
