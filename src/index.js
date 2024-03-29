import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppContext } from "./context/index";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppContext>
          <App />
          <ScrollToTop />
        </AppContext>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
