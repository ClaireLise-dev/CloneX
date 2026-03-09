import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <div>
        <h1>Main Layout</h1>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
