import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../../helpers/api-config';

const initialState = {
  data: [],
};

export const saveUser = createAsyncThunk(
  'user',
  async ({ deviceId, payload, token }, { rejectWithValue }) => {
    try {
      const response = await request.post('user/saveUser',
        {
          deviceId,
          payload,
          token
        });
      return response;
    } catch (err) {
      return rejectWithValue('Oops, there seems to be an error');
    }
  },
);

export const checkUser = createAsyncThunk(
  'checkAccount',
  async ({ deviceId, payload, token }, { rejectWithValue }) => {
    try {
      const response = await request.post(
        `user/check-user`,
        {
          deviceId,
          payload,
          token
        });
      return response;
    } catch (err) {
      return rejectWithValue('Oops, there seems to be an error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AddUser: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: {},
});

export const { AddUser } = userSlice.actions;

export default userSlice.reducer;
