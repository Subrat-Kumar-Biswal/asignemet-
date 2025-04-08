import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID =
  "833589828607-bmqq1od0ct7vjubq1r44tvtloqogalcd.apps.googleusercontent.com";
import "./index.css";
import App from "./App.jsx";
import About from "./page/Client_crud.jsx";
import Login from "./component/Login.jsx";
import RegisterForm from "./component/Register.jsx";
import Contacts from "./component/Contact.jsx";
import ForgotPasswordForm from "./component/ForgotPassowrd.jsx";
import HomePage from "./page/Home.jsx";
import Client_crud from "./page/Client_crud.jsx";
import dotenv from "dotenv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/client",
        element: <Client_crud />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordForm />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </GoogleOAuthProvider>
  </StrictMode>
);
