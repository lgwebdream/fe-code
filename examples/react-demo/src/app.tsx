import './index.scss';
import '@/assets/images/favicon.ico';

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./pages/app";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("water-app")
);
