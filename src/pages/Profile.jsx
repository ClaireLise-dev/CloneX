import { AuthContext } from "../store/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  // Variables

  const navigate = useNavigate();

  // States

  const [loading, setLoading] = useState(false);

  // Contexte
  const { deleteCurrentUser } = useContext(AuthContext);

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
    <div className="flex flex-col items-center justify-center gap-1 h-screen">
      <button
        className="btn btn-error btn-lg disabled:cursor-not-allowed disabled:opacity-90"
        onClick={() => handleDeleteAccount()}
      >
        Supprimer le compte
      </button>
    </div>
  );
}
