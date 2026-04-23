import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  // Fonctions
  const fetchUsers = async () => {
    const response = await fetch(
      "https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users.json",
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

    return Object.entries(data).map(([uid, user]) => ({
      id: uid,
      ...user,
    }));
  };
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { users, isLoading, isError };
}
