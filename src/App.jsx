import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CrudPage from "./pages/CrudPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import CustomErrorPage from "./pages/CustomErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      console.log("Data token dari storage:", data);
      setToken(data);
    }
    setLoading(false);
  }, []);
  console.log({ token });

  if (loading) return <>loading...</>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LoginPage setToken={setToken} />} />
        <Route path="/signin" element={<SignUpPage />} />
        {token ? (
          <Route path="/home" element={<HomePage token={token} />} />
        ) : (
          ""
        )}

        {token ? (
          <Route path="/profile" element={<Profile token={token} />} />
        ) : (
          ""
        )}

        {/* Gunakan ProtectedRoute untuk membatasi akses ke halaman CRUD */}
        <Route
          path="/crud"
          element={
            <ProtectedRoute token={token} allowedRoles={["admin"]}>
              <CrudPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crud/:id"
          element={
            <ProtectedRoute token={token} allowedRoles={["admin"]}>
              <CrudPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} allowedRoles={["admin", "user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Jika rute tidak ditemukan */}
        <Route path="*" element={<CustomErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
