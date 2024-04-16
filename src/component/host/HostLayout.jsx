import { Outlet } from "react-router-dom";
import HostNav from "./HostNav";

function HostLayout() {
  return (
    <>
      <HostNav />
      <Outlet />
    </>
  );
}

export default HostLayout;
