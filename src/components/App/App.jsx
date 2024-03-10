import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AnimePage from "../../pages/AnimePage/AnimePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import Main from "../../pages/Main/Main";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../redux/entities/User/thunks/checkAuth";
import PageWrapper from "../PageWrapper/PageWrapper";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageWrapper></PageWrapper>}>
      <Route path="/" element={<Main />}></Route>
      <Route path="/anime/:animeId" element={<AnimePage />}></Route>
      <Route path="/signup" element={<RegisterPage />}></Route>
      <Route path="/signin" element={<LoginPage />}></Route>
      <Route
        path="/profile"
        element={<ProtectedRoute element={ProfilePage}></ProtectedRoute>}
      ></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
