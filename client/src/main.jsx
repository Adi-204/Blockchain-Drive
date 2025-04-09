import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Files from './components/Files.jsx'
import Share from './components/Share.jsx'
import Layout from './components/Layout.jsx'
import NotFound from './components/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Layout><NotFound /></Layout>,
    children: [
      {
        path: '',
        element: <App />
      },
      {
        path: '/files',
        element: <Files />
      },
      {
        path: '/share',
        element: <Share />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  }
])
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
