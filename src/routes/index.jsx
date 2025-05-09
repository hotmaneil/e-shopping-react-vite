// import {Home } from '../pages/front'
import { NotFound } from '../pages/NotFound.jsx'
import Home from '../pages/front/Home'
import App from '../App.jsx'
import { createHashRouter } from 'react-router-dom'
import FrontLayout2 from '../pages/front/FrontLayout2.jsx'
import Products from '../pages/front/Products.jsx'
import ProductDetail from '../pages/front/ProductDetail.jsx'
import Cart from '../pages/front/Cart.jsx'
import Dashboard from '../pages/admin/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import AdminProducts from '../pages/admin/AdminProducts.jsx'
import AdminOrders from '../pages/admin/AdminOrders.jsx'
import AdminCoupons from '../pages/admin/AdminCoupons.jsx'

const routes = [
  {
    path: '/',
    // element: <App></App>,
    element: <FrontLayout2></FrontLayout2>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'products',
        element: <Products></Products>
      },
      {
        path: '/product',
        children: [
          {
            path: ':id',
            element: <ProductDetail></ProductDetail>
          }
        ]
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },

      {
        path: '/login',
        element: <Login></Login>
      }
    ]
  },
  {
    path: '/admin',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'products',
        element: <AdminProducts></AdminProducts>
      },
      {
        path: 'orders',
        element: <AdminOrders></AdminOrders>
      },
      {
        path: 'coupons',
        element: <AdminCoupons></AdminCoupons>
      }
    ]
  },
  {
    path: 'about',
    element: <NotFound></NotFound>
  }
]
const router = createHashRouter(routes)

export default router
