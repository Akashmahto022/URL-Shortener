import React, { Children } from "react";
import Layout from "./Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import DeshBoard from "./pages/DeshBoard/DeshBoard";
import Link from "./pages/Link/Link";
import RedirectLink from "./pages/RedirectLink/RedirectLink";
import Authentication from "./pages/Auth/Authentication";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UrlProvider from "./Context/Context";
import RequiredAuth from "./components/RequiredAuth/RequiredAuth";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/deshboard",
        element: (
          <RequiredAuth>
            <DeshBoard />
          </RequiredAuth>
        ),
      },
      {
        path: "/auth",
        element: <Authentication />,
      },
      {
        path: "/link/:id",
        element: (
          <RequiredAuth>
            <Link />
          </RequiredAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
};

export default App;
