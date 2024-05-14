import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function VanLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default VanLayout;
