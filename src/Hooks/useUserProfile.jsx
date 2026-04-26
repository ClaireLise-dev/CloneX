import { useState, useEffect, useCallback } from "react";

const useUserProfile = (uid) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✨ Cette fonction prend un uid en paramètre
  const fetchUserProfile = useCallback(async (uidToFetch) => {
    console.log("🔵 fetchUserProfile - uidToFetch:", uidToFetch);

    if (!uidToFetch) {
      console.log("🟡 pas de uid, on sort");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users/${uidToFetch}.json`,
      );
      const userData = await response.json();
      console.log("🟢 userData reçu:", userData);
      setUserProfile(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []); // ← plus de dépendance à uid

  useEffect(() => {
    fetchUserProfile(uid); // ← on passe l'uid actuel
  }, [uid, fetchUserProfile]);

  return { userProfile, isLoading, refreshUserProfile: fetchUserProfile };
};

export default useUserProfile;
