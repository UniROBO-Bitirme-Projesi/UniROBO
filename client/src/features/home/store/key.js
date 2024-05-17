import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../../helpers/api-config';

const initialState = {
  publicKey: null,
  opsToken: null
};

export const getPublicKey = createAsyncThunk(
  'publicKey',
  async ({ deviceId, callback }, { rejectWithValue }) => {
    try {
      const response = await request.get(`key/getKey?deviceId=${deviceId}`, {
        headers: {},
      });
      if (response.status === 200) {
        callback();
      }
      return response
    } catch (err) {
      return rejectWithValue('Oops, there seems to be an error');
    }
  },
);

const keySlice = createSlice({
  name: 'key',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPublicKey.fulfilled, (state, action) => {
      state.publicKey = action.payload.data.publicKey;
      state.opsToken = action.payload.data.opsToken;
    });
  },
});

export default keySlice.reducer;
