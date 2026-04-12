import Logo from "../Logo/Logo";
import { Home, LogOut, User, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";

export default function Sidebar() {
  const { logOut, user, userProfile } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-between items-center w-80 bg-base-100 p-3 h-full">
      <div className="flex flex-col w-full">
        <div className="p-5">
          <Logo className="h-20 w-20 mb-5" />
        </div>
        <div className="flex flex-col gap-6 w-full text-primary text-lg font-mediul">
          <Link
            to="/"
            className="flex flex-row gap-5 items-center group hover:bg-base-300 rounded-lg w-full p-3"
          >
            <Home
              className="h-6 w-6 group-hover:fill-current transition-all"
              color="#7c3aed"
            />
            <p>Accueil</p>
          </Link>
          <Link
            to={`/profile/${user?.uid}`}
            className="flex flex-row gap-5 items-center group hover:bg-base-300 rounded-lg w-full p-3"
          >
            <User
              className="h-6 w-6 group-hover:fill-current transition-all"
              color="#7c3aed"
            />
            <p>Profil</p>
          </Link>
          <button
            onClick={() => logOut()}
            className="flex flex-row gap-5 items-center hover:bg-base-300 rounded-lg w-full p-3 "
          >
            <LogOut className="h-6 w-6" color="#7c3aed" />
            <p>Déconnexion</p>
          </button>
        </div>
      </div>

      {/* Bas : profil utilisateur */}
      <div className="bg-base-200 flex flex-row justify-between w-full border border-base-300 items-center shadow-sm rounded-2xl p-3 gap-4">
        <img
          src={userProfile?.AvatarUrl}
          alt="Avatar"
          className="h-12 w-12 rounded-full shrink-0"
        />
        <span>{userProfile?.Pseudo}</span>{" "}
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <input
            type="checkbox"
            value="nightX"
            className="toggle theme-controller"
          />
          <Moon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
