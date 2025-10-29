import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../api/auth.ts";

export type AuthState = { user: AuthUser | null };
const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
