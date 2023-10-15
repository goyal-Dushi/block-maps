import React from 'react'
import ReactDOM from 'react-dom/client'
import Map from './pages/Map/Map.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './index.scss'
import ErrorPageURL from './error/Error.tsx';
import { mapFormAction } from './pages/Map/utils.ts';

const router = createBrowserRouter([
  // {
  //   path: "/getMap",
  //   element: <GetMapInfo />,
  //   action: getMapInfoAction,
  //   errorElement: <ErrorPageURL />
  // },
  {
    path: '/map',
    element: <Map />,
    action: mapFormAction,
    errorElement: <ErrorPageURL />,
  },
  {
    path: "*",
    element: <Navigate to={"/map?block=D&sector=27"} replace />
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
