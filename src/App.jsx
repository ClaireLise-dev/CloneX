import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./store/AuthProvider";

const Home = lazy(() => import("./pages/Home"));
const Main = lazy(() => import("./layouts/Main"));
const Signup = lazy(() => import("./pages/Signup"));
const Feed = lazy(() => import("./pages/Feed"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateTweet = lazy(() => import("./pages/CreateTweet"));
const Error = lazy(() => import("./pages/Error"));
const TweetDetails = lazy(() => import("./pages/TweetDetails"));

export default function App() {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      <ToastContainer theme="dark" position="bottom-right" />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: (
              <Suspense>
                <Main />
              </Suspense>
            ),
            errorElement: (
              <Suspense>
                <Error />
              </Suspense>
            ),
            children: [
              {
                path: "/",
                element: <Suspense>{user ? <Feed /> : <Home />}</Suspense>,
                index: true,
              },
              {
                path: "signup",
                element: (
                  <Suspense>
                    <Signup />
                  </Suspense>
                ),
              },
              {
                path: "feed",
                element: (
                  <Suspense>
                    <Feed />
                  </Suspense>
                ),
              },
              {
                path: "profile/:uid",
                element: (
                  <Suspense>
                    <Profile />
                  </Suspense>
                ),
              },
              {
                path: "create-tweet",
                element: (
                  <Suspense>
                    <CreateTweet />
                  </Suspense>
                ),
              },
              {
                path: "tweet/:id",
                element: (
                  <Suspense>
                    <TweetDetails />
                  </Suspense>
                ),
              },
            ],
          },
        ])}
      />
    </>
  );
}
