import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi } from '../../services/mockApi';

const authUserKey = 'hf_auth_user';

const readStoredUser = () => {
  const raw = localStorage.getItem(authUserKey);
  return raw ? JSON.parse(raw) : null;
};

const saveStoredUser = (user) => {
  if (user) {
    localStorage.setItem(authUserKey, JSON.stringify(user));
    return;
  }
  localStorage.removeItem(authUserKey);
};

export const registerUser = createAsyncThunk('auth/registerUser', async (payload, thunkApi) => {
  try {
    const user = await registerUserApi(payload);
    return user;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (payload, thunkApi) => {
  try {
    const user = await loginUserApi(payload);
    return user;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: readStoredUser(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      saveStoredUser(null);
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveStoredUser(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed.';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveStoredUser(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed.';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
