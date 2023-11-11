import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  password: string;
}

interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

export const getUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching users';
      });
  },
});

export const selectUsers = (state: RootState) => state.login.users;
export const selectError = (state: RootState) => state.login.error;
export default userSlice.reducer;
