import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ConfigState = {
  theme: "light" | "dark";
};

const initialState: ConfigState = {
  theme: "light",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = configSlice.actions;
export default configSlice.reducer;
