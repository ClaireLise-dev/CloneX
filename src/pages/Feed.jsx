import TweetComposer from "../components/TweetComposer/TweetComposer";
import ConnectedLayout from "../layouts/ConnectedLayout";
import UsersSuggestions from "../components/UserSuggestions/UserSuggestions";
import useTweets from "../Hooks/useTweets";
import useFollows from "../Hooks/useFollows";
import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { Bars } from "react-loader-spinner";
import TweetCard from "../components/TweetCard/TweetCard";

export default function Feed() {
  // Variables
  const { user } = useContext(AuthContext);
  const { tweets, isLoading } = useTweets();
  const { followings } = useFollows(user?.uid);
  const filteredTweets = tweets?.filter(
    (tweet) =>
      tweet.authorId === user?.uid ||
      followings?.some((following) => following.id === tweet.authorId),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Bars color="#7c3aed" />
      </div>
    );
  }

  return (
    <ConnectedLayout>
      <div className="flex flex-row scroll-auto gap-4 lg:gap-8 pb-24 lg:pb-8 bg-base-100 justify-center min-h-screen p-2 lg:p-4 lg:p-8">
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          <h1 className="text-2xl lg:text-3xl text-center text-primary font-bold mt-5 lg:mt-0 mb-5">
            Fil d'actualité
          </h1>
          <div className="lg:hidden">
            <UsersSuggestions limit={1} mobile />
          </div>
          <TweetComposer />
          {filteredTweets?.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="hidden lg:block">
          <UsersSuggestions />
        </div>
      </div>
    </ConnectedLayout>
  );
}
