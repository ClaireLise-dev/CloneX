import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function useReplies(tweetId) {
  // Variables
  const queryClient = useQueryClient();

  const fetchReplies = async () => {
    const response = await fetch(
      `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/replies/${tweetId}.json`,
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

  const addReply = async (reply) => {
    const response = await fetch(
      `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/replies/${tweetId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
      },
    );

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  };

  const {
    data: replies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["replies", tweetId],
    queryFn: fetchReplies,
  });

  const { mutate: addReplyMutation } = useMutation({
    mutationFn: addReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies", tweetId] });
    },
  });

  return { replies, isLoading, isError, addReply: addReplyMutation };
}
