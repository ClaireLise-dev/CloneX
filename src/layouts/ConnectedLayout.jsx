import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ConnectedLayout({ children }) {
  // Variables
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (loading) {
    return <div>...</div>;
  }

  if (!loading && !user) {
    navigate("/");
    toast.error("Page réservée aux membres connectés");
    return <div></div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
