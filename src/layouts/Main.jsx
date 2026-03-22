import { Outlet } from "react-router-dom";
import { Bars } from "react-loader-spinner";

export default function Main() {
  return (
    <>
      <div
        data-theme="lightX"
        className="flex items-center justify-center h-screen"
      >
        <Bars color="#7c3aed" />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
