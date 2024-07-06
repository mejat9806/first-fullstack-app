import { Navigate, Route, Routes } from "react-router-dom";
import Setting from "./page/Setting";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTheme } from "./components/darkMode/theme-provider";
// import NewPost from "./page/NewPost";
import { ErrorBoundary } from "react-error-boundary";
import LoadingPage from "./components/component/ui_components/LoadingPage";
import MainLayout from "./components/component/ui_components/MainLayout";

import { ProfileLayout } from "./components/component/ui_components/profileUI/ProfileLayout";

import { PostSearch } from "./components/component/searchComponent/searchResult/PostSearch";
import { UserSearch } from "./components/component/searchComponent/searchResult/UserSearch";
import { CommentSearch } from "./components/component/searchComponent/searchResult/CommentSearch";
import SearchResultLayout from "./page/SearchResultLayout";

import { PostLayout } from "./components/component/ui_components/PostComponent/PostLayout";
import PostDeepIntoComment from "./components/component/ui_components/PostComponent/PostDeepIntoComment";
import CommentLayout from "./components/component/ui_components/PostComponent/CommentLayout";
import { CommentItem } from "./components/component/ui_components/PostComponent/CommentItem";
import AllPostByUser from "./components/component/ui_components/profileUI/AllPostProfileUI/AllPostByUser";
import LikePost from "./components/component/ui_components/profileUI/likePostProfileUI/LikePost";
import BookmarkSave from "./components/component/ui_components/profileUI/bookmarksave/BookmarkSave";
const Home = lazy(() => import("./page/Home"));
const PrivateRoute = lazy(() => import("./page/PrivateRoute"));
const LoginPage = lazy(() => import("./page/LoginPage"));
const RegisterPage = lazy(() => import("./page/RegisterPage"));
const Explore = lazy(() => import("./page/Explore"));
const ErrorPage = lazy(() => import("./page/ErrorPage"));
const Resetpassword = lazy(() => import("./page/Resetpassword"));
const CheckEmailPage = lazy(() => import("./page/CheckEmailPage"));
const PasswordReset = lazy(() => import("./page/ForgotPass"));
const PopularPost = lazy(() => import("./page/PopularPost"));
const WrongPathPage = lazy(() => import("./page/WrongPathPage"));

function App() {
  const { theme } = useTheme();
  const [isLoading, setLoading] = useState(true);

  function someRequest() {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));
  }
  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader-container");

      if (loaderElement) {
        loaderElement.remove();
        setLoading(!isLoading);
      }
    });
  });

  if (isLoading) {
    //
    return null;
  }

  //before react email
  return (
    <div
      className={`${
        theme === "dark" ? "text-white bg-black" : "text-black bg-slate-100"
      } h-full`}
    >
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoadingPage />}>
          {/* <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} /> */}
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="post" element={<PostLayout />}>
                  <Route element={<CommentLayout />}>
                    <Route path=":postId" element={<CommentItem />} />
                    <Route
                      path=":postId/:commentId"
                      element={<PostDeepIntoComment />}
                    />
                  </Route>
                </Route>

                <Route path="explore" element={<Explore />} />
                <Route path="popular" element={<PopularPost />} />
                {/* <Route path="newPost" element={<NewPost />} /> */}
                <Route path="setting" element={<Setting />} />
                <Route />

                <Route path="profile/:id" element={<ProfileLayout />}>
                  <Route index element={<Navigate to="all" replace />} />
                  <Route path="all" element={<AllPostByUser />} />
                  <Route path="like" element={<LikePost />} />
                  <Route path="bookmarksave" element={<BookmarkSave />} />
                </Route>
                <Route path="search" element={<SearchResultLayout />}>
                  <Route index element={<Navigate to="post" />} />
                  <Route path="post" element={<PostSearch />} />
                  <Route path="user" element={<UserSearch />} />
                  <Route path="comment" element={<CommentSearch />} />
                </Route>
              </Route>
            </Route>
            <Route path="forgotPassword" element={<PasswordReset />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="checkEmail" element={<CheckEmailPage />} />
            <Route
              path="resetPassword/:resetToken"
              element={<Resetpassword />}
            />
            <Route path="*" element={<WrongPathPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
