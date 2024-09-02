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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/crud" element={<CrudPage />} />
        <Route path="/crud/:id" element={<CrudPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
