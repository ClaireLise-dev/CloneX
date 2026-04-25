import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";
import BottomNav from "../components/BottomNavbar/BottomNavbar";

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
    <div className="flex h-screen bg-primary p-2 lg:p-4 gap-4">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-base-100 rounded-2xl shadow-xl pb-20 lg:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
