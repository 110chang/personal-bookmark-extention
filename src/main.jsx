import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import Login from './Login'
import Home from './Home'
import './index.css'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
];

const router = createMemoryRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
