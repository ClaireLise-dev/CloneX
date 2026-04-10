import { useState, useEffect } from "react";

const useUserProfile = (uid) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
        );
        const userData = await response.json();
        setUserProfile(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (uid) {
      fetchUserProfile();
    }
  }, [uid]);
  return { userProfile, loading };
};

export default useUserProfile;
