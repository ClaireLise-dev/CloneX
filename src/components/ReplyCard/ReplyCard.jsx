import useUserProfile from "../../Hooks/useUserProfile";
import ReplyComposer from "../ReplyComposer/ReplyComposer";
import { AuthContext } from "../../store/AuthProvider";

export default function ReplyCard({ reply }) {
  // Variables
  const { userProfile } = useUserProfile(reply.authorId);

  // Fonctions

  return (
    <div className="flex flex-row p-3 gap-2 w-full">
      <img
        src={userProfile?.AvatarUrl}
        alt="Avatar"
        className="h-12 w-12 rounded-full shrink-0"
      />
      <div className="flex flex-col rounded-2xl bg-base-200 p-3 gap-1 w-auto">
        <span className="font-medium ">{userProfile?.Pseudo}</span>
        <p className="text-base-content">{reply.texte}</p>
      </div>
    </div>
  );
}
