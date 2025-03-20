import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './common/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

let router=createBrowserRouter(
  [
    {
      path:'/', //http://localhost:5173/
      element:<MainLayout/>,
      children:[
        {
          path:'/', //http://localhost:5173/
          element:<Home/>
        },
        {
          path:'/product', //http://localhost:5173/product
          element:<Product/> 
        },
        {
          path:'/cart', //http://localhost:5173/product
          element:<Cart/> 
        },
        {
          path:'/login', //http://localhost:5173/product
          element:<Login/> 
        },
        {
          path:'/register', //http://localhost:5173/product
          element:<Register/> 
        }
      ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
