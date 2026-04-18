import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTweet() {
  // Variables
  const queryClient = useQueryClient();

  // Fonctions
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

  const deleteTweet = async (id) => {
    const response = await fetch(
      `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/tweets/${id}.json`,
      {
        method: "DELETE",
        headers: {},
      },
    );

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  };

  const {
    data: tweets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
  });

  const { mutate: deleteTweetMutation } = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  return { tweets, isLoading, isError, deleteTweet: deleteTweetMutation };
}
