import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer position="top-right" />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
