import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function useFollows(uid, targetUid) {
  // Variables
  const queryClient = useQueryClient();

  const fetchFollowings = async () => {
    const url = targetUid
      ? `/users/${uid}/following/${targetUid}.json`
      : `/users/${uid}/following.json`;

    const response = await fetch(
      `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app${url}`,
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
    if (targetUid) {
      return data === true;
    } else {
      if (!data) return [];
      return Object.entries(data).map(([id, value]) => ({ id }));
    }
  };

  const addFollow = async (follow) => {
    const response = await fetch(
      `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/following/${targetUid}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(follow),
      },
    );

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  };

  const deleteFollow = async () => {
    const response = await fetch(
      `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/following/${targetUid}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  };

  const {
    data: followings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["followings", targetUid],
    queryFn: fetchFollowings,
  });

  const { mutate: addFollowMutation } = useMutation({
    mutationFn: addFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followings", targetUid] });
      queryClient.invalidateQueries({ queryKey: ["followings", undefined] });
    },
  });

  const { mutate: deleteFollowMutation } = useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followings", targetUid] });
      queryClient.invalidateQueries({ queryKey: ["followings", undefined] });
    },
  });

  return {
    followings,
    isLoading,
    isError,
    addFollow: addFollowMutation,
    deleteFollow: deleteFollowMutation,
  };
}
