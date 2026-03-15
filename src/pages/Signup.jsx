import Logo from "../components/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function Home() {
  // Variables
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  // States

  const [loading, setLoading] = useState(false);

  // Fonction
  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        navigate("/?success=true");
        toast.success("Inscription réussie !");
      })
      .catch((error) => {
        const { code, message } = error;
        if (code === "auth/email-already-in-use") {
          toast.error("Cette adresse email est déjà utilisée.");
        } else {
          toast.error(message);
        }
        setLoading(false);
      });
  };

  return (
    <main data-theme="lightX" className="min-h-screen bg-base-100">
      <div className="flex flex-row items-center justify-center gap-12 h-screen">
        <div>
          <Logo />
          <h1 className="text-4xl font-bold text-base-content">
            Rejoins la conversation
          </h1>
          <h2 className="text-2xl font-light text-primary mt-4">
            Partage tes idées et connecte-toi au monde
          </h2>
        </div>
        <div>
          <div className="card bg-base-100 shadow-2xl w-150">
            <div className="card-body p-15">
              <div className="card-title text-3xl text-primary font-bold mb-4">
                Inscription
              </div>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="input w-full border-2 border-base-300 focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Renseignez une adresse valide.",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-error mb-5">{errors.email.message}</p>
                )}

                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="input w-full border-2 border-base-300 focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message:
                        "Le mot de passe doit contenir au moins 8 caractères",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-error mb-5">{errors.password.message}</p>
                )}
                <button
                  className="btn btn-primary btn-lg disabled:cursor-not-allowed disabled:opacity-90"
                  disabled={isSubmitting}
                >
                  S'inscrire
                </button>
              </form>
              <div className="text-sm text-center text-base-content mt-4">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-primary font-bold">
                  Connexion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
