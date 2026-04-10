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

    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.pseudo}`;

    const newUser = {
      Pseudo: data.pseudo,
      Email: data.email,
      AvatarUrl: avatarUrl,
    };

    const response = await fetch(
      `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const users = await response.json();
    const usersArray = users ? Object.values(users) : [];

    const pseudoExiste = usersArray.some((user) => user.Pseudo === data.pseudo);

    if (pseudoExiste) {
      toast.error("Ce pseudo est déjà utilisé.");
      setLoading(false);
      return;
    }

    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const response = await fetch(
          `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          },
        );
        // Erro
        if (!response.ok) {
          throw new Error("Une erreur est intervenue");
        }
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main data-theme="lightX" className="min-h-screen bg-base-100">
      <div className="flex flex-col items-center justify-center gap-1 h-screen">
        <Logo />
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
                type="text"
                placeholder="Pseudo"
                className="input w-full border-2 border-base-300 focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
                {...register("pseudo", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Le pseudo doit contenir au moins 3 caractères.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Le pseudo ne doit pas dépasser 20 caractères.",
                  },
                })}
              />

              {errors.pseudo && (
                <p className="text-error mb-5">{errors.pseudo.message}</p>
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
              <Link to="/" className="text-primary font-bold">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
