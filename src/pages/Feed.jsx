import TweetComposer from "../components/TweetComposer/TweetComposer";
import ConnectedLayout from "../layouts/ConnectedLayout";
import useTweets from "../Hooks/useTweets";
import { Bars } from "react-loader-spinner";
import TweetCard from "../components/TweetCard/TweetCard";

export default function Feed() {
  // Variables
  const { data: tweets, isLoading } = useTweets();

  // States

  if (isLoading) {
    return (
      <div>
        <Bars color="#7c3aed" />
      </div>
    );
  }

  return (
    <ConnectedLayout>
      <div className="flex flex-col bg-base-300 p-3 h-screen">
        <div className="flex flex-col items-center gap-4 p-5 h-1/8 w-full h-screen bg-base-100 shadow-sm rounded-2xl">
          <h1 className="text-2xl font-bold text-base-content mb-5">
            Fil d'actualité
          </h1>
          <TweetComposer />
          {tweets?.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
