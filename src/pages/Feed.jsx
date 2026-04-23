import TweetComposer from "../components/TweetComposer/TweetComposer";
import ConnectedLayout from "../layouts/ConnectedLayout";
import UsersSuggestions from "../components/UserSuggestions/UserSuggestions";
import useTweets from "../Hooks/useTweets";
import { Bars } from "react-loader-spinner";
import TweetCard from "../components/TweetCard/TweetCard";

export default function Feed() {
  // Variables
  const { tweets, isLoading } = useTweets();

  // States

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Bars color="#7c3aed" />
      </div>
    );
  }

  return (
    <ConnectedLayout>
      <div className="flex flex-row scroll-auto gap-8 bg-base-100 justify-center min-h-screen p-8">
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          <h1 className="text-3xl text-center text-primary font-bold mb-5">
            Fil d'actualité
          </h1>
          <TweetComposer />
          {tweets?.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div>
          <UsersSuggestions />
        </div>
      </div>
    </ConnectedLayout>
  );
}
