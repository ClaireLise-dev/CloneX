import { NavLink } from "react-router-dom";
import { Home, User, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";

export default function BottomNav() {
  const { logOut, user } = useContext(AuthContext);

  return (
    <nav className="bg-primary fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center py-2 lg:hidden">
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          `p-3 transition-colors ${
            isActive ? "text-white" : "text-white/50 hover:text-white"
          }`
        }
      >
        <Home className="h-6 w-6 stroke-current" />
      </NavLink>
      <NavLink
        to={`/profile/${user?.uid}`}
        className={({ isActive }) =>
          `p-3 transition-colors ${
            isActive ? "text-white" : "text-white/50 hover:text-white"
          }`
        }
      >
        <User className="h-6 w-6 stroke-current" />
      </NavLink>
      <button
        onClick={() => logOut()}
        className="text-white/50 hover:text-white cursor-pointer p-3 transition-colors"
      >
        <LogOut className="h-6 w-6 stroke-current" />
      </button>
    </nav>
  );
}
