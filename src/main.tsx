import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { store } from "./app/store";
import router from "./router";
import AppRouter from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />

      <ToastContainer />
    </Provider>
  </React.StrictMode>,
);
