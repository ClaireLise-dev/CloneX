import Logo from "../components/Logo/Logo";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../store/AuthProvider";

export default function CreateTweet() {
  // Variables
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // States
  const [loading, setLoading] = useState(false);

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
    navigate("/feed");
  };
  return (
    <main data-theme="lightX" className="min-h-screen bg-base-100">
      <div className="flex items-center justify-center md:gap-4 lg:gap-10 p-2 h-screen">
        <div>
          <Logo />
        </div>
        <div>
          <div className="card bg-base-100 shadow-2xl w-150">
            <div className="card-body p-15">
              <div className="card-title text-3xl text-primary font-bold mb-4">
                Créer un tweet
              </div>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <textarea
                  placeholder="texte"
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
          </div>
        </div>
      </div>
    </main>
  );
}
