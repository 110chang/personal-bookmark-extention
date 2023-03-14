import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Complete from './pages/Complete'
import Home from './pages/Home'
import Login from './pages/Login'
import './index.css'

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
      {
        path: '/complete',
        element: <Complete />,
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
