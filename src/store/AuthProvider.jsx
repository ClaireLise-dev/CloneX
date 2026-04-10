import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import useUserProfile from "../Hooks/useUserProfile";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useUserProfile(user ? user.uid : null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logOut = () => {
    return signOut(auth);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const deleteCurrentUser = async (password) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("Aucun utilisateur connecté.");
    }

    if (!currentUser.email) {
      throw new Error("Aucun email associé à cet utilisateur.");
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password,
    );

    await reauthenticateWithCredential(currentUser, credential);
    await deleteUser(currentUser);
  };

  const authValue = {
    user,
    loading,
    logOut,
    createUser,
    loginUser,
    deleteCurrentUser,
    userProfile,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
