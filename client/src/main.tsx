import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./shadcnComponent/ui/toaster.tsx";
import { ThemeProvider } from "./components/darkMode/theme-provider.tsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <UserContextProvider>
            <App />
            <Toaster />
          </UserContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
    <ReactQueryDevtools client={queryClient} />
  </React.StrictMode>,
);
