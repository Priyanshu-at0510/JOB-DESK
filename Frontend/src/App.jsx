import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authentication/Login.jsx'
import Signup from './components/authentication/Signup.jsx'
import   Home  from './components/components_lite/Home.jsx'

const appRouter=createBrowserRouter([
  {
    path:'/',element:<Home/>
  },
  {
    path:'/login',element:<Login/>
  },
  {
    path:'/signup',element:<Signup/>
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App