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
import PostDetail from "./page/PostDetail";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./page/ErrorPage";
import PasswordReset from "./page/ForgotPass";
import LoadingPage from "./components/component/ui_components/LoadingPage";
import MainLayout from "./components/component/MainLayout";
import Resetpassword from "./page/Resetpassword";
import CheckEmailPage from "./page/CheckEmailPage";
import { useTheme } from "./components/darkMode/theme-provider";
import Profile from "./page/Profile";
import AllPostByUser from "./components/component/ui_components/profileUI/AllPostProfileUI/AllPostByUser";
import LikePost from "./components/component/ui_components/profileUI/likePostProfileUI/LikePost";
import { ProfileLayout } from "./components/component/ProfileLayout";
import BookmarkSave from "./components/component/BookmarkSave";
import PopularPost from "./page/PopularPost";
axios.defaults.baseURL = `http://localhost:8000/api/`;
axios.defaults.withCredentials = true; // default

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
                <Route path={"post/:postId"} element={<PostDetail />} />
                <Route path="explore" element={<Explore />} />
                <Route path="popular" element={<PopularPost />} />
                {/* <Route path="newPost" element={<NewPost />} /> */}
                <Route path="setting" element={<Setting />} />

                <Route path="profile/:id" element={<Profile />}>
                  <Route element={<ProfileLayout />}>
                    <Route index element={<Navigate to="all" replace />} />
                    <Route path="all" element={<AllPostByUser />} />
                    <Route path="like" element={<LikePost />} />
                    <Route path="bookmarksave" element={<BookmarkSave />} />
                  </Route>
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
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
