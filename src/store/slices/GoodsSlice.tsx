import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface Good {
  id: number;
  username: string;
  password: string;
}

interface GoodState {
  items: Good[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const getGoods = createAsyncThunk('goods/getGoods', async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState: GoodState = {
  items: [],
  status: 'idle',
  error: null,
};

const GoodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getGoods.pending, state => {
        state.status = 'loading';
      })
      .addCase(getGoods.fulfilled, (state, action: PayloadAction<Good[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching goods';
      });
  },
});

export const selectGoods = (state: RootState) => state.goods.items;
export default GoodsSlice.reducer;
