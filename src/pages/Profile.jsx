import { AuthContext } from "../store/AuthProvider";
import ConnectedLayout from "../layouts/ConnectedLayout";
import TweetCard from "../components/TweetCard/TweetCard";
import useTweets from "../Hooks/useTweets";
import useUserProfile from "../Hooks/useUserProfile";
import useFollows from "../Hooks/useFollows";
import FollowingCard from "../components/FollowingCard.jsx/FollowingCard";
import { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

export default function Profile() {
  // Contexte
  const { user, deleteCurrentUser } = useContext(AuthContext);

  // Variables
  const navigate = useNavigate();
  const { tweets } = useTweets();

  const { uid } = useParams();
  const {
    userProfile: profileData,
    loading: profileLoading,
    hasFetched,
  } = useUserProfile(uid);
  const userTweets = tweets?.filter((tweet) => tweet.authorId === uid) ?? [];
  const {
    followings: isFollowing,
    addFollow,
    deleteFollow,
  } = useFollows(user?.uid, uid);
  const { followings } = useFollows(user?.uid);

  // States
  const [loading, setLoading] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  // Fonctions
  const handleDeleteAccount = async () => {
    if (loading) return;

    if (!deletePassword) {
      toast.error("Mot de passe requis.");
      return;
    }

    setLoading(true);

    await deleteCurrentUser(deletePassword)
      .then(() => {
        setLoading(false);
        setDeletePassword("");
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
        setDeletePassword("");
      });
  };

  if (profileLoading || !hasFetched) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Bars color="#7c3aed" />
      </div>
    );
  }

  if (!profileData) return <Navigate to="/404" replace />;

  return (
    <ConnectedLayout>
      {" "}
      <div className="flex flex-col items-center bg-base-100 min-h-screen p-2 lg:p-8 pb-20 lg:pb-8">
        <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
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
          {user?.uid === uid && followings?.length > 0 && (
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
          {user?.uid === uid ? null : isFollowing ? (
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

          {user?.uid === uid && (
            <>
              <button
                className="text-sm text-error/50 hover:text-error transition-colors cursor-pointer mt-12 mb-8 lg:mb-5"
                onClick={() =>
                  document.getElementById("delete_modal").showModal()
                }
              >
                Supprimer le compte
              </button>

              <dialog id="delete_modal" className="modal modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-error mb-3">
                    Supprimer le compte
                  </h3>
                  <p className="mb-4 text-base-content">
                    Cette action est <strong>irréversible</strong>. Tous tes
                    tweets, réponses et abonnements seront définitivement
                    supprimés. Entre ton mot de passe pour confirmer.
                  </p>
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="input w-full border-2 border-base-300 focus:border-2 focus:border-primary focus:outline-none focus:ring-0 mb-4"
                  />
                  <div className="modal-action">
                    <form method="dialog" className="flex gap-2">
                      <button
                        className="btn border-base-300 disabled:cursor-not-allowed disabled:opacity-90"
                        onClick={() => setDeletePassword("")}
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="btn btn-error border-error  disabled:cursor-not-allowed disabled:opacity-90"
                        disabled={loading}
                        onClick={() => {
                          document.getElementById("delete_modal").close();
                          handleDeleteAccount();
                        }}
                      >
                        {loading ? (
                          <Bars
                            height="20"
                            width="20"
                            color="#ffffff"
                            ariaLabel="loading"
                          />
                        ) : (
                          "Supprimer définitivement"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </ConnectedLayout>
  );
}
