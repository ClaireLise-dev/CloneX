import ConnectedLayout from "../layouts/ConnectedLayout";
import { AuthContext } from "../store/AuthProvider";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { Plus } from "lucide-react";

export default function Feed() {
  // Variables
  const { logOut, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // States
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fonctions
  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    const newTweet = {
      texte: data.texte,
      authorId: user.uid,
      createdAt: new Date(),
    };

    const response = await fetch(
      "https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/tweets.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTweet),
      },
    );

    // Error
    if (!response.ok) {
      toast.error("Une erreur est intervenue");
      setLoading(false);
      return;
    }

    toast.success("Tweet publié !");
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <ConnectedLayout>
      <div
        className="flex flex-col items-center justify-center gap-1 h-screen"
        data-theme="lightX"
      >
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
        <button
          className="btn btn-primary rounded-full btn-lg disabled:cursor-not-allowed disabled:opacity-90"
          onClick={() => setIsOpen(true)}
        >
          <Plus />
        </button>
        {isOpen && (
          <>
            <dialog
              className="modal modal-open"
              onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
            >
              <div className="modal-box">
                <div>Créer un tweet</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    placeholder="text"
                    className="input w-full border-2 border-base-300 focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
                    {...register("texte", {
                      maxLength: { value: 140 },
                    })}
                  />
                  {errors.texte && (
                    <p className="text-color-error mb-5">
                      {errors.texte.message}
                    </p>
                  )}
                  <button
                    className="btn btn-primary btn-lg disabled:cursor-not-allowed disabled:opacity-90"
                    disabled={isSubmitting}
                  >
                    Publier
                  </button>
                </form>
              </div>
            </dialog>
          </>
        )}
      </div>
    </ConnectedLayout>
  );
}
