import Logo from "../components/Logo/Logo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../store/AuthProvider";

export default function Home() {
  // Variables
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useContext(AuthContext);

  // States
  const [loading, setLoading] = useState(false);

  // Fonction
  const onSubmit = (data) => {
    if (loading) return;

    loginUser(data.email, data.password)
      .then((userCredential) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const { code, message } = error;
        if (code == "auth/user-not-found") {
          toast.error("Cet email n'existe pas.");
        } else if (code == "auth/invalid-credential") {
          toast.error("La combinaison est incorrecte.");
        } else {
          toast.error(code);
        }
      });
  };

  return (
    <main data-theme="lightX" className="min-h-screen bg-base-100">
      <div className="flex flex-row items-center justify-center md:gap-4 lg:gap-10 p-2 h-screen">
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
                Connexion
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
                  <p className="text-color-error mb-5">
                    {errors.email.message}
                  </p>
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
                  <p className="text-color-error mb-5">
                    {errors.password.message}
                  </p>
                )}
                <button className="btn btn-primary btn-lg">Se connecter</button>
              </form>
              <div className="text-sm text-center text-base-content mt-4">
                Pas de compte ?{" "}
                <Link to="/signup" className="text-primary font-bold">
                  Inscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
