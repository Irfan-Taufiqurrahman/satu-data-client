import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import "./index.css";
// import Root from "./routes/root";
import ErrorPage from "./error-page";
import Index from "./routes/index";

import Root, { loader as rootLoader, 
              action as rootAction,
              action, 
} from "./routes/root";

import Login from "./pages/Login";
import SignUp from "./pages/Register";
import ListUsers from "./routes/ListUsers";
import MainData from "./routes/MainData";
import TestCreate from "./routes/testCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [      
      {
        index: true, 
        element: <Index />
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: "register",
    element: <SignUp />,
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: "accounts",
    element: <ListUsers />,
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: "maindata",
    element: <MainData />,
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: "testcreate",
    element: <TestCreate />,
    errorElement: <div>Oops! There was an error.</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);