import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Link } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import SignUp from "./pages/Sign_Up";
import SignIn from "./pages/Sign_In";
import ForgetPassword from "./pages/ForgetPassword";
import OtpCode from "./pages/OtpCode";
import NewPass from "./pages/NewPass";
import ConfirmedPass from "./pages/ConfirmedPassword";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: 
    <div className="not_found">
    <h1>oops!</h1>
    <p>Page Not Found,  <Link to='./'>Go Home</Link></p>
    </div>,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/otpcode",
    element: <OtpCode />,
  },
  {
    path: "/newpass",
    element: <NewPass />,
  },
  // {
  //   path: "/confirmePassword",
  //   element: <ConfirmedPass />,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
