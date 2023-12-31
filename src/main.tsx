import React from 'react'
import ReactDOM from 'react-dom/client'
import Map from './pages/Map/Map.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './index.scss'
import ErrorPageURL from './error/Error.tsx';
import { mapFormAction } from './pages/Map/utils.ts';
import Coordinate from './Coordinate.tsx';
import { DblockConfig } from './maps/sector27/Dblock.ts';

const router = createBrowserRouter([
  {
    path: '/map',
    element: <Map />,
    action: mapFormAction,
    errorElement: <ErrorPageURL />,
  },
  {
    path: '/getCords',
    element: <Coordinate mapConfig={DblockConfig} />,
    errorElement: <ErrorPageURL />,
  },
  {
    path: "*",
    element: <Navigate to={{
      pathname: '/map',
      search: '?block=D&sector=27'
    }}  replace />
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
