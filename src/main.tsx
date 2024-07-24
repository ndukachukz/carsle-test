import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import AppWrapper from "./components/app-wrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={"loading..."}>
      <AppWrapper>
        <App />
      </AppWrapper>
    </Suspense>
  </React.StrictMode>
);
