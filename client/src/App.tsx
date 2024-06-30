import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import PrivateRoute from "./page/PrivateRoute";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import Setting from "./page/Setting";
import { Suspense, useEffect, useState } from "react";
import Explore from "./page/Explore";
// import NewPost from "./page/NewPost";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./page/ErrorPage";
import PasswordReset from "./page/ForgotPass";
import LoadingPage from "./components/component/ui_components/LoadingPage";
import MainLayout from "./components/component/ui_components/MainLayout";
import Resetpassword from "./page/Resetpassword";
import CheckEmailPage from "./page/CheckEmailPage";
import { useTheme } from "./components/darkMode/theme-provider";
import AllPostByUser from "./components/component/ui_components/profileUI/AllPostProfileUI/AllPostByUser";
import LikePost from "./components/component/ui_components/profileUI/likePostProfileUI/LikePost";
import { ProfileLayout } from "./components/component/ui_components/profileUI/ProfileLayout";
import PopularPost from "./page/PopularPost";
import WrongPathPage from "./page/WrongPathPage";

import { PostSearch } from "./components/component/searchComponent/searchResult/PostSearch";
import { UserSearch } from "./components/component/searchComponent/searchResult/UserSearch";
import { CommentSearch } from "./components/component/searchComponent/searchResult/CommentSearch";
import SearchResultLayout from "./page/SearchResultLayout";
import BookmarkSave from "./components/component/ui_components/profileUI/bookmarksave/BookmarkSave";
import { PostLayout } from "./components/component/ui_components/PostComponent/PostLayout";
import PostDeepIntoComment from "./components/component/ui_components/PostComponent/PostDeepIntoComment";
import CommentLayout from "./components/component/ui_components/PostComponent/CommentLayout";
import { CommentItem } from "./components/component/ui_components/PostComponent/CommentItem";
axios.defaults.baseURL =
  import.meta.env.Vite_ENV === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEVELOPMENT_URL;
axios.defaults.withCredentials = true; // default
axios.defaults.headers.common["Accept"] = "application/json, text/plain, */*";
axios.defaults.headers.common["Content-Type"] = "application/json";

console.log(axios.defaults.baseURL, "env");
function App() {
  const { theme } = useTheme();
  const [isLoading, setLoading] = useState(true);

  function someRequest() {
    //Simulates a request; makes a "promise" that'll run for 2.5 seconds
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));
  }
  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader-container");
      // if (theme === "dark") {
      //   loaderElement?.classList.add("bg-black");
      // } else {
      //   loaderElement?.classList.add("bg-white");
      // }
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
