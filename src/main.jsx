import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();
import "./index.css";
// import Root from "./routes/root";
import ErrorPage from "./error-page";
import Index from "./routes/index";

import Root, {
  loader as rootLoader,
  action as rootAction,
  action,
} from "./routes/root";

import Login from "./pages/Login";
import SignUp from "./pages/Register";
import ListUsers from "./routes/ListUsers";
import MainData from "./routes/MainData";
import TestCreate from "./routes/testCreate";
import DataLayout from "./layout/DataLayout";
import MainDataPage from "./pages/MainDataPage";
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import TheamticData from "./pages/TheamticData";
import TopicData from "./pages/TopicData";
import DetailTopic from "./pages/DetailTopic";
import Dataset from "./pages/Dataset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataLayout />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Dataset />,
      },
    ],
  },

  {
    path: "main-data",
    element: <DataLayout />,
    errorElement: <div>Oops! There was an error.</div>,
    children: [
      {
        index: true,
        element: <MainDataPage />,
      },
      {
        index: false,
        path: "topic-data/",
        element: <TopicData />,
      },
      {
        index: false,
        path: "theamtic-data/:id",
        element: <TheamticData />,
      },
      {
        index: false,
        path: "detail-topic-data/",
        element: <DetailTopic />,
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

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
