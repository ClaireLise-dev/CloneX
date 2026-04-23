import useUserProfile from "../../Hooks/useUserProfile";
import useTweet from "../../Hooks/useTweets";
import useReplies from "../../Hooks/useReplies";
import ReplyComposer from "../ReplyComposer/ReplyComposer";
import ReplyCard from "../ReplyCard/ReplyCard";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthProvider";
import { MessageCircle, Trash2 } from "lucide-react";

export default function TweetCard({ tweet }) {
  //States
  const [isOpen, setIsOpen] = useState(false);

  // Variables
  const { deleteTweet } = useTweet();
  const { replies } = useReplies(tweet.id);
  const { userProfile } = useUserProfile(tweet.authorId);
  const { user } = useContext(AuthContext);

  // Fonctions
  const handleDelete = () => {
    if (user.uid !== tweet.authorId) return;
    deleteTweet(tweet.id);
  };

  const toggleReplyComposer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col bg-base-100 p-5 shadow-xl rounded-2xl w-full">
      <div className="flex flex-row items-center gap-3 mb-3">
        <img
          src={userProfile?.AvatarUrl}
          alt="Avatar"
          className="h-12 w-12 rounded-full shrink-0"
        />
        <div className="flex flex-col">
          <span className="font-medium text-base-content">
            {userProfile?.Pseudo}
          </span>
          <span className="text-sm text-neutral">@{userProfile?.Pseudo}</span>
        </div>
      </div>
      <div className="pl-15">
        <p className="text-base-content">{tweet.texte}</p>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="flex flex-row items-center justify-center gap-1">
            <MessageCircle
              className="h-5 w-5 mt-2 text-neutral cursor-pointer"
              onClick={toggleReplyComposer}
            />{" "}
            <p className="mt-2 text-neutral">{replies?.length || 0}</p>
          </div>
          {user.uid === tweet.authorId && (
            <Trash2
              className="h-5 w-5 mt-2 text-error cursor-pointer"
              onClick={handleDelete}
            />
          )}
        </div>
        {isOpen && (
          <>
            {replies?.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
            <ReplyComposer tweetId={tweet.id} />
          </>
        )}
      </div>
    </div>
  );
}
