import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
