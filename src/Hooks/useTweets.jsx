import { useQuery } from "@tanstack/react-query";

export default function useTweet() {
  const fetchTweets = async () => {
    const response = await fetch(
      "https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/tweets.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    const data = await response.json();
    if (!data) return [];

    return Object.entries(data)
      .map(([id, tweet]) => ({
        id,
        ...tweet,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return useQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
  });
}
