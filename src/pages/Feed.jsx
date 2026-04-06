import ConnectedLayout from "../layouts/ConnectedLayout";
import { AuthContext } from "../store/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router";

export default function Feed() {
  const { logOut, user } = useContext(AuthContext);
  return (
    <ConnectedLayout>
      <div className="flex flex-col items-center justify-center gap-1 h-screen">
        <button
          className="btn btn-error btn-lg disabled:cursor-not-allowed disabled:opacity-90"
          onClick={() => logOut()}
        >
          Déconnexion
        </button>
        <Link
          to={`/profile/${user?.uid}`}
          className="btn btn-primary btn-lg disabled:cursor-not-allowed disabled:opacity-90"
        >
          Profil
        </Link>
      </div>
    </ConnectedLayout>
  );
}
