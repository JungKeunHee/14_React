import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./common.css";

function Layout() {
  return (
    <>
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
