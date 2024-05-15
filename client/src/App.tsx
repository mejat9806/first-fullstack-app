import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import PrivateRoute from "./page/PrivateRoute";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import MainLayout from "./component/MainLayout";
import Setting from "./page/Setting";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "./component/ui_components/LoadingPage";
import Explore from "./page/Explore";
import NewPost from "./page/NewPost";
import PostDetail from "./page/PostDetail";

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
  return (
    <>
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
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
