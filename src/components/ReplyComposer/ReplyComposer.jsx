import { AuthContext } from "../../store/AuthProvider";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function ReplyComposer({ tweetId }) {
  // Variables
  const queryClient = useQueryClient();
  const { user, userProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // States
  const [loading, setLoading] = useState(false);

  // Fonctions
  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    const newReply = {
      texte: data.texte,
      authorId: user.uid,
      createdAt: new Date(),
      tweetId: tweetId,
    };

    const response = await fetch(
      "https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/replies.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReply),
      },
    );

    // Error
    if (!response.ok) {
      toast.error("Une erreur est intervenue");
      setLoading(false);
      return;
    }

    toast.success("Réponse publiée !");
    reset();
    queryClient.invalidateQueries({ queryKey: ["replies", tweetId] });
    setLoading(false);
  };

  return (
    <div className="flex flex-row items-center bg-base-100 gap-4 p-5 shadow-xl rounded-2xl w-full">
      <img
        src={userProfile?.AvatarUrl}
        alt="Avatar"
        className="h-12 w-12 rounded-full shrink-0"
      />

      <form
        className="flex flex-row items-center gap-4 flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          placeholder="Quoi de neuf ?"
          className="flex-1 bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none resize-none h-10"
          rows={1}
          {...register("texte", {
            maxLength: { value: 140 },
            required: "Le commentaire ne peut pas être vide",
          })}
        />
        <button
          className="btn btn-primary border-primary disabled:cursor-not-allowed disabled:opacity-90"
          disabled={isSubmitting}
        >
          Publier
        </button>
      </form>
    </div>
  );
}
