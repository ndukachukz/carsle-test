import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RootLayout from "./components/layout";
import "./App.css";

const Home = lazy(() => import("./components/home"));

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
