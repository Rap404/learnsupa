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

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

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
        <Route path="/crud" element={<CrudPage />} />
        <Route path="/crud/:id" element={<CrudPage />} />
        <Route path="*" element={<CustomErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
