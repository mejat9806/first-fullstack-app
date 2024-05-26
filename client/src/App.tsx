import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import PrivateRoute from "./page/PrivateRoute";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import Setting from "./page/Setting";
import { Suspense, useEffect, useState } from "react";
import Explore from "./page/Explore";
import NewPost from "./page/NewPost";
import PostDetail from "./page/PostDetail";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./page/ErrorPage";
import PasswordReset from "./page/ForgotPass";
import LoadingPage from "./components/component/ui_components/LoadingPage";
import MainLayout from "./components/component/MainLayout";
import Resetpassword from "./page/Resetpassword";
import CheckEmailPage from "./page/CheckEmailPage";
axios.defaults.baseURL = `http://localhost:8000/api/`;
axios.defaults.withCredentials = true; // default

function App() {
  const [isLoading, setLoading] = useState(true);
  function someRequest() {
    //Simulates a request; makes a "promise" that'll run for 2.5 seconds
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
    <>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoadingPage />}>
          {/* <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} /> */}
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={"post/:postId"} element={<PostDetail />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="explore" element={<Explore />} />
                <Route path="newPost" element={<NewPost />} />
                <Route path="setting" element={<Setting />} />
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
    </>
  );
}

export default App;
