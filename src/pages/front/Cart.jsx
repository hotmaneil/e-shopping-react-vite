import { Link, useOutletContext } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { createAsyncMessage } from '../../slice/messageSlice'

const { VITE_APP_ApiUrl, VITE_APP_ApiPath } = import.meta.env

function Cart() {
  const { cartData, getCart } = useOutletContext()
  const [loadingItems, setLoadingItems] = useState([])
//   const dispatch = useDispatch()

  const url = `${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}`

  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(`${url}/cart/${id}`)
      getCart()
      console.log('delete res', res)
    } catch (error) {
      console.log('error', error)
    }
  }

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity
      }
    }
    setLoadingItems([...loadingItems, item.id])
    console.log('loadingItems1', loadingItems)
    try {
      const res = await axios.put(`${url}/cart/${item.id}`, data)
      setLoadingItems(
        loadingItems.filter((loadingObject) => loadingObject !== item.id)
      )
      console.log('loadingItems2', loadingItems)
    //   dispatch(createAsyncMessage(res.data))
      getCart()
      console.log('put res', res)
    } catch (error) {
      console.log('error', error)
    //   dispatch(createAsyncMessage(error.response.data))
      setLoadingItems(
        loadingItems.filter((loadingObject) => loadingObject !== item.id)
      )
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-6 bg-white py-5"
          style={{ minHeight: 'calc(100vh - 56px - 76px)' }}
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">購物車明細</h2>
          </div>

          {cartData?.carts?.map((item) => {
            return (
              <div className="d-flex mt-4 bg-light" key={item.id}>
                <img
                  src={item.product.imageUrl}
                  alt=""
                  className="object-cover"
                  style={{
                    width: '120px'
                  }}
                />
                <div className="w-100 p-3 position-relative">
                  <button
                    type="button"
                    className="position-absolute"
                    style={{ top: '10px', right: '5px' }}
                    onClick={() => removeCartItem(item.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <p className="mb-0 fw-bold">{item.product.title}</p>
                  <p className="mb-1 text-muted" style={{ fontSize: '14px' }}>
                    {item.product.content}
                  </p>

                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="input-group w-50 align-items-center">
                      <select
                        name=""
                        className="form-select"
                        id=""
                        value={item.qty}
                        disabled={loadingItems.includes(item.id)}
                        onChange={(e) => {
                          updateCartItem(item, e.target.value * 1)
                        }}
                      >
                        {[...new Array(20)].map((i, num) => {
                          return (
                            <option value={num + 1} key={num}>
                              {num + 1}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <p className="mb-0 ms-auto">NT${item.final_total}</p>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
          </div>
          <Link
            to="/checkout"
            className="btn btn-dark w-100 mt-4 rounded-0 py-3"
          >
            確認
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
