import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import Availablility_page from './AvailableHotelsComponents/Availablilty_page.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import {ErrorPage} from './error-page.tsx'; 
import React from "react";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },

  {
    path: "/offers",
    element: <Availablility_page/>,
    errorElement: <ErrorPage/>
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(  
  
  <RouterProvider router={router} />
);


