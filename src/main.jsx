import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./createTrip";
import Header from "./components/custom/header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>

  },
  {
    path: '/createTrip',
    element: <CreateTrip/>

  },
  {
   path: '/viewTrip/:tripId',
   element: <ViewTrip/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <Header/>
    <Toaster/>
    
    <RouterProvider router ={router} />
   </GoogleOAuthProvider>
  </React.StrictMode>
)
