import { AuthContext } from "../store/AuthProvider";
import ConnectedLayout from "../layouts/ConnectedLayout";
import TweetCard from "../components/TweetCard/TweetCard";
import useTweets from "../Hooks/useTweets";
import useUserProfile from "../Hooks/useUserProfile";
import useFollows from "../Hooks/useFollows";
import FollowingCard from "../components/FollowingCard.jsx/FollowingCard";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  // Contexte
  const { user, deleteCurrentUser } = useContext(AuthContext);

  // Variables
  const navigate = useNavigate();
  const { tweets } = useTweets();

  const { uid } = useParams();
  const { userProfile: profileData } = useUserProfile(uid);
  const userTweets = tweets?.filter((tweet) => tweet.authorId === uid) ?? [];
  const {
    followings: isFollowing,
    addFollow,
    deleteFollow,
  } = useFollows(user?.uid, uid);
  const { followings } = useFollows(user?.uid);

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
            src={profileData?.AvatarUrl}
            alt="Avatar"
            className="h-30 w-30 rounded-full shrink-0"
          />
          <span className="text-2xl text-base-content font-medium">
            {profileData?.Pseudo}
          </span>
          <span className="text-sm text-neutral">@{profileData?.Pseudo}</span>
          {user.uid === uid && followings?.length > 0 && (
            <>
              <button
                className="btn btn-base-300 border-base-300 text-base-content  disabled:cursor-not-allowed disabled:opacity-90 mb-4"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                {followings?.length} abonnements
              </button>
              <dialog
                id="my_modal_5"
                className="modal modal-middle sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-3">Abonnements</h3>
                  {followings?.map((following) => (
                    <div className="flex flex-row">
                      <FollowingCard key={following.id} uid={following.id} />
                    </div>
                  ))}
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn border-base-300">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
          {user.uid === uid ? null : isFollowing ? (
            <button
              className="btn btn-primary border-primary disabled:cursor-not-allowed disabled:opacity-90 mb-4"
              onClick={() => deleteFollow()}
            >
              Ne plus suivre
            </button>
          ) : (
            <button
              className="btn btn-primary border-primary disabled:cursor-not-allowed disabled:opacity-90 mb-4"
              onClick={() => addFollow(true)}
            >
              Suivre
            </button>
          )}
          {userTweets.length === 0 ? (
            <p>Tu n'as encore publié aucun tweet.</p>
          ) : (
            userTweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))
          )}

          {user.uid === uid && (
            <button
              className="text-sm text-error/50 hover:text-error transition-colors cursor-pointer mt-auto mb-5"
              onClick={() => handleDeleteAccount()}
            >
              Supprimer le compte
            </button>
          )}
        </div>
      </div>
    </ConnectedLayout>
  );
}
