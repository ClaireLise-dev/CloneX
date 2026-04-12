import useUserProfile from "../../Hooks/useUserProfile";
import { MessageCircle, Trash2 } from "lucide-react";

export default function TweetCard({ tweet }) {
  const { userProfile } = useUserProfile(tweet.authorId);
  return (
    <div className="flex flex-col bg-base-200 p-5 shadow-sm rounded-2xl w-full">
      <div className="flex flex-row items-center gap-3 mb-3">
        <img
          src={userProfile?.AvatarUrl}
          alt="Avatar"
          className="h-12 w-12 rounded-full shrink-0"
        />
        <span className="font-medium text-base-content">
          {userProfile?.Pseudo}
        </span>
      </div>
      <div className="pl-15">
        <p>{tweet.texte}</p>
        <div className="flex flex-row justify-between items-center mt-4">
          <MessageCircle className="h-5 w-5 mt-2 text-base-content" />
          <Trash2 className="h-5 w-5 mt-2 text-error" />
        </div>
      </div>
    </div>
  );
}
