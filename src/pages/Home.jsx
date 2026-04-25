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
    <main className="min-h-screen bg-base-100">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 px-4 lg:p-2 min-h-screen">
        <div>
          <Logo className="h-30 lg:h-40 w-30 lg:w-40 mb-5 lg:mb-10 mx-auto lg:mx-0" />
          <h1 className="text-2xl lg:text-4xl text-center lg:text-left font-bold text-base-content">
            Rejoins la conversation
          </h1>
          <h2 className="text-xl lg:text-2xl text-center lg:text-left font-light text-primary mt-4">
            Partage tes idées et connecte-toi au monde
          </h2>
        </div>
        <div className="w-full lg:w-auto">
          <div className="card bg-base-100 mt-6 lg:mt-0 shadow-2xl w-full lg:w-150 ">
            <div className="card-body p-6 lg:p-15">
              <div className="card-title text-2xl lg:text-3xl text-primary font-bold mb-4">
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
