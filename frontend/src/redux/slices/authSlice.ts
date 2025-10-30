import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user.ts";

// --- Estado inicial ---
export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Define ou atualiza o utilizador autenticado
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    // Limpa o utilizador (logout, token expirado, ...)
    clearUser(state) {
      state.user = null;
    },
  },
});

// --- Exports ---
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
