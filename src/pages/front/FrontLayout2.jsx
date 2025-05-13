import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import MessageToast from '../../components/MessageToast'

const { VITE_APP_ApiUrl,VITE_APP_ApiPath } = import.meta.env

function FrontLayout2() {
  const [cartData, setCartData] = useState({})
  const getCart = async () => {
    try {
      const url=`${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}`

      const res = await axios.get(
        `${url}/cart`
      )
      console.log('cart res', res)
      setCartData(res.data.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <>
      <Navbar cartData={cartData} />
      {/* <MessageToast /> */}
      <Outlet context={{ getCart, cartData }}></Outlet>

      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2025 LOGO All Rights Reserved.</p>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default FrontLayout2
