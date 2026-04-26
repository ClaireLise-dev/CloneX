import { useState, useEffect, useCallback } from "react";

const useUserProfile = (uid) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // ← nouveau

  const fetchUserProfile = useCallback(async (uidToFetch) => {
    if (!uidToFetch) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users/${uidToFetch}.json`,
      );
      const userData = await response.json();
      setUserProfile(userData);
      setHasFetched(true); // ← on marque qu'on a bien récupéré
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile(uid);
  }, [uid, fetchUserProfile]);

  return {
    userProfile,
    isLoading,
    hasFetched, // ← exposé
    refreshUserProfile: fetchUserProfile,
  };
};

export default useUserProfile;
