import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import AppProvider from "./components/app-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={"loading..."}>
      <AppProvider>
        <App />
      </AppProvider>
    </Suspense>
  </React.StrictMode>
);
