import { Outlet } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";

export default function Main() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Bars color="#7c3aed" />
      </div>
    );
  }
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}
