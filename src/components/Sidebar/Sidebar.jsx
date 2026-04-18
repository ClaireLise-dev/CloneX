import Logo from "../Logo/Logo";
import { Home, LogOut, User, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";

export default function Sidebar() {
  const { logOut, user, userProfile } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-between items-center w-80 p-3 h-full">
      <div className="flex flex-col w-full">
        <div className="p-5">
          <Logo className="h-20 w-20 mb-5 brightness-0 invert" />
        </div>
        <div className="flex flex-col gap-6 w-full text-lg font-medium">
          <Link
            to="/"
            className="flex flex-row gap-5 items-center text-white/50 hover:text-white rounded-lg w-full p-3  transition-colors"
          >
            <Home className="h-6 w-6 stroke-current" />
            <p>Accueil</p>
          </Link>

          <Link
            to={`/profile/${user?.uid}`}
            className="flex flex-row gap-5 items-center text-white/50 hover:text-white rounded-lg w-full p-3 transition-colors"
          >
            <User className="h-6 w-6 stroke-current" />
            <p>Profil</p>
          </Link>

          <button
            onClick={() => logOut()}
            className="flex flex-row gap-5 items-center text-white/50 hover:text-white cursor-pointer rounded-lg w-full p-3 transition-colors"
          >
            <LogOut className="h-6 w-6 stroke-current" />
            <p>Déconnexion</p>
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full items-center rounded-2xl p-3 gap-4">
        <div className="flex flex-row gap-1 items-center">
          <img
            src={userProfile?.AvatarUrl}
            alt="Avatar"
            className="h-12 w-12 rounded-full shrink-0"
          />
          <span className=" text-white/50">@{userProfile?.Pseudo}</span>
        </div>
        <div className="flex items-center  text-white/50 gap-1">
          <Sun className="h-4 w-4" />
          <input
            type="checkbox"
            value="nightX"
            className="toggle theme-controller  text-white/50"
          />
          <Moon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
