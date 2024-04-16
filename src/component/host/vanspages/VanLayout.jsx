import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import VanPhoto from "./VanPhoto";

function VanLayout() {
  return (
    <>
      <VanPhoto/>
      <Nav />
      <Outlet />
    </>
  );
}

export default VanLayout;
