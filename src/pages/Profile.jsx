import { AuthContext } from "../store/AuthProvider";
import ConnectedLayout from "../layouts/ConnectedLayout";
import TweetCard from "../components/TweetCard/TweetCard";
import useTweets from "../Hooks/useTweets";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  // Contexte
  const { user, userProfile, deleteCurrentUser } = useContext(AuthContext);

  // Variables
  const navigate = useNavigate();
  const { tweets } = useTweets();
  const userTweets =
    tweets?.filter((tweet) => tweet.authorId === user.uid) ?? [];

  // States
  const [loading, setLoading] = useState(false);

  // Fonctions
  const handleDeleteAccount = async () => {
    if (loading) return;

    const password = window.prompt(
      "Entre ton mot de passe pour confirmer la suppression du compte :",
    );

    if (!password) return;

    setLoading(true);

    await deleteCurrentUser(password)
      .then(() => {
        setLoading(false);
        toast.success("Suppression du compte réussie !");
        navigate("/?success=true");
      })

      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Mot de passe incorrect.");
        } else if (error.code === "auth/requires-recent-login") {
          toast.error("Reconnecte-toi puis réessaie.");
        } else {
          toast.error(error.message || "Impossible de supprimer le compte.");
        }
        setLoading(false);
      });
  };

  return (
    <ConnectedLayout>
      {" "}
      <div className="flex flex-col items-center bg-base-100 min-h-screen p-8">
        <div className="flex flex-col items-center gap-2 w-full max-w-2xl min-h-[calc(100vh-4rem)]">
          <h1 className="text-3xl text-center text-primary font-bold mb-5">
            Profil
          </h1>
          <img
            src={userProfile?.AvatarUrl}
            alt="Avatar"
            className="h-30 w-30 rounded-full shrink-0"
          />
          <span className="text-2xl text-base-content font-medium">
            {userProfile?.Pseudo}
          </span>
          <span className="text-sm text-neutral">@{userProfile?.Pseudo}</span>

          {userTweets.length === 0 ? (
            <p>Tu n'as encore publié aucun tweet.</p>
          ) : (
            userTweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))
          )}
          <button
            className="text-sm text-error/50 hover:text-error transition-colors cursor-pointer mt-auto mb-5"
            onClick={() => handleDeleteAccount()}
          >
            Supprimer le compte
          </button>
        </div>
      </div>
    </ConnectedLayout>
  );
}
