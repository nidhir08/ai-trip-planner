import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./createTrip";
import Header from "./components/custom/header";
import { Toaster } from "./components/ui/sonner";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>

  },
  {
    path: '/createTrip',
    element: <CreateTrip/>

  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <Toaster/>
    
    <RouterProvider router ={router} />
  </React.StrictMode>,
)
