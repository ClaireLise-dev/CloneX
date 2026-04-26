import { useState, useEffect, useCallback } from "react";

const useUserProfile = (uid) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    if (!uid) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
      );
      const userData = await response.json();
      setUserProfile(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { userProfile, isLoading, refreshUserProfile: fetchUserProfile };
};

export default useUserProfile;
