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
  const { userProfile, refreshUserProfile } = useUserProfile(
    user ? user.uid : null,
  );

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

    // Réauthentification
    await reauthenticateWithCredential(currentUser, credential);

    const uid = currentUser.uid;
    const dbUrl =
      "https://clonex-421e0-default-rtdb.europe-west1.firebasedatabase.app";

    // Récupération des données
    const [tweetsRes, repliesRes, usersRes] = await Promise.all([
      fetch(`${dbUrl}/tweets.json`),
      fetch(`${dbUrl}/replies.json`),
      fetch(`${dbUrl}/users.json`),
    ]);

    const tweets = (await tweetsRes.json()) || {};
    const replies = (await repliesRes.json()) || {};
    const users = (await usersRes.json()) || {};

    // Suppression de mes tweets
    const myTweetIds = Object.entries(tweets)
      .filter(([id, tweet]) => tweet.authorId === uid)
      .map(([id]) => id);

    await Promise.all(
      myTweetIds.map((tweetId) =>
        fetch(`${dbUrl}/tweets/${tweetId}.json`, { method: "DELETE" }),
      ),
    );

    // Suppression de mes replies
    const replyDeletePromises = [];

    for (const [tweetId, tweetReplies] of Object.entries(replies)) {
      for (const [replyId, reply] of Object.entries(tweetReplies)) {
        if (reply.authorId === uid) {
          replyDeletePromises.push(
            fetch(`${dbUrl}/replies/${tweetId}/${replyId}.json`, {
              method: "DELETE",
            }),
          );
        }
      }
    }

    myTweetIds.forEach((tweetId) => {
      replyDeletePromises.push(
        fetch(`${dbUrl}/replies/${tweetId}.json`, { method: "DELETE" }),
      );
    });

    await Promise.all(replyDeletePromises);

    // Suppression de mon uid des following des autres
    const followDeletePromises = [];

    for (const [otherUid, otherUser] of Object.entries(users)) {
      if (otherUser.following && otherUser.following[uid]) {
        followDeletePromises.push(
          fetch(`${dbUrl}/users/${otherUid}/following/${uid}.json`, {
            method: "DELETE",
          }),
        );
      }
    }

    await Promise.all(followDeletePromises);

    // 6. Suppression de mon entrée user
    await fetch(`${dbUrl}/users/${uid}.json`, { method: "DELETE" });

    // 7. Suppression du compte Auth (en dernier)
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
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
