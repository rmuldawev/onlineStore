import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const searchProducts = createAsyncThunk<Product[], string>(
  'products/search',
  async query => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`,
    );
    const data: Product[] = await response.json();
    return data;
  },
);

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export const selectProducts = (state: RootState) => state.search.items;
export default SearchSlice.reducer;
