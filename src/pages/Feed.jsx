import TweetComposer from "../components/TweetComposer/TweetComposer";
import Logo from "../components/Logo/Logo";
import { LogOut } from "lucide-react";
import ConnectedLayout from "../layouts/ConnectedLayout";
import { AuthContext } from "../store/AuthProvider";
import { useContext, useState } from "react";
import { Link } from "react-router";

export default function Feed() {
  // Variables
  const { logOut, user, userProfile } = useContext(AuthContext);

  // States
  const [loading, setLoading] = useState(false);

  return (
    <ConnectedLayout>
      <div className="flex flex-col bg-base-300 gap-1 p-3 h-screen">
        <div className="flex flex-col items-center p-5 h-1/8 w-full h-screen bg-base-100 shadow-sm rounded-2xl">
          <h1 className="text-2xl font-bold text-base-content mb-5">
            Fil d'actualité
          </h1>
          <TweetComposer />
        </div>
      </div>
    </ConnectedLayout>
  );
}
