import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import About from "./page/Client_crud";
import Login from "./component/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <Header />
      <Outlet />
      <Footer />

    </>
  );
}

export default App;
