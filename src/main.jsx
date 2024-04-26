import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import About from './About'
import App from './App'
import ErrorPage from './ErrorPage'
import Footer from './Footer'
import Navigation from "./Navigation"
import Menu from "./Menu"
import Gallery from "./Gallery"
import Contact from "./Contact" 

const site = import.meta.env.BASE_URL


function Layout() {
  return (
    <>
      <Navigation />
      <div id="page-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
  ],
  {
    basename: site,
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
