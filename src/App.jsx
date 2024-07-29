import React, { Children } from 'react'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage/LandingPage'
import DeshBoard from './pages/DeshBoard/DeshBoard'
import Link from './pages/Link/Link'
import RedirectLink from './pages/RedirectLink/RedirectLink'
import Authentication from './pages/Auth/Authentication'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      {
        path:"/",
        element: <LandingPage/>,
      },
      {
        path:"/deshboard",
        element:<DeshBoard/>
      },
      {
        path:"/auth",
        element:<Authentication/>
      },
      {
        path:"/link/:id",
        element:<Link/>
      },
      {
        path:"/:id",
        element:<RedirectLink/>
      }
    ]
  }
])


const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App