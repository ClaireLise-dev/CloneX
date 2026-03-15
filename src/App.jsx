import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Main = lazy(() => import("./layouts/Main"));
const Signup = lazy(() => import("./pages/Signup"));
const Feed = lazy(() => import("./pages/Feed"));
const Profile = lazy(() => import("./pages/Profile"));
const TweetDetails = lazy(() => import("./pages/TweetDetails"));
const Error = lazy(() => import("./pages/Error"));

export default function App() {
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
                element: (
                  <Suspense>
                    <Home />
                  </Suspense>
                ),
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
