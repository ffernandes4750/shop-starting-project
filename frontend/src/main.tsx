import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./redux/store.js";
import App from "./App.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const theme = saved ?? (prefersDark ? "dark" : "light");
document.documentElement.dataset.theme = theme;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
