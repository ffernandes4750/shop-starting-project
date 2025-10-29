import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.ts";
import authReducer from "./slices/authSlice.ts";
import configReducer from "./slices/configSlice.ts";

import type { CartType } from "../types/cart.ts";
import type { AuthState } from "./slices/authSlice.ts";
import type { ConfigState } from "./slices/configSlice.ts";

const LS_KEY = "appState_v1";

function loadState(): Partial<{
  cart: CartType;
  auth: AuthState;
  config: ConfigState;
}> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      cart: parsed.cart,
      config: parsed.config,
    };
  } catch {
    return {};
  }
}

function saveState(state: RootState) {
  try {
    const toPersist = {
      cart: state.cart,
      config: state.config,
    };
    localStorage.setItem(LS_KEY, JSON.stringify(toPersist));
  } catch {
    // ignora erros de storage
  }
}

// --- Criar o root reducer ---
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  config: configReducer,
});

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
