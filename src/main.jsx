import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
// import Root from "./routes/root";
import ErrorPage from "./error-page";
import EditContact, {
  action as editAction
} from "./routes/Edit";
import Contact, {
  loader as contactLoader,
} from "./routes/Contact";
import Index from "./routes/index";

import Root, { loader as rootLoader, 
              action as rootAction,
              action, 
} from "./routes/root";

// import Root from "./routes/root"
import { action as destroyAction } from "./routes/destroy";
import Login from "./pages/Login";
import SignUp from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);