import React, { useState } from 'react'
import * as Pages from "./pages/index"


import { 
  createBrowserRouter,
  Outlet,
  Route,
  Link,
  RouterProvider
} from "react-router-dom";

// use react router dom to navigate through pages
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
