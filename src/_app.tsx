import React, { useState } from 'react'
import * as Pages from "./pages/index"

// import reactLogo from './assets/react.svg'
// import viteLogo from './vite.svg'

import { 
  createBrowserRouter,
  Outlet,
  Route,
  Link,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages.Dashboard />
  },
  {
    path: "/login",
    element: <Pages.Login />
  },
  {
    path: "/register",
    element: <Pages.Register />
  },
  {
    path: "*",
    element: <Pages.Error />
  }
])

function App () { 


  return (
    <>
      <div id='layout' className='layout'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
