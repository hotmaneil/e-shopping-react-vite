import { useState, useEffect } from 'react'
import axios from 'axios'
import { useOutletContext, useParams } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { createAsyncMessage } from '../../slice/messageSlice'

const { VITE_APP_ApiUrl,VITE_APP_ApiPath } = import.meta.env

function ProductDetail() {
  const [product, setProduct] = useState([])
  const [carQuantity, setCarQuantity] = useState(1)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const { getCart } = useOutletContext()
//   const dispatch = useDispatch()

  const url=`${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}`

  console.log('cart page url', url)
  console.log('id', id)

  /**
   * 取得產品
   */
  const getProduct = async (id) => {
    const productRes = await axios.get(
      `${url}/product/${id}`
    )
    console.log('productRes', productRes)
    setProduct(productRes.data.product)
  }

  /**
   *加入購物車
   */
  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: carQuantity
      }
    }
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${url}/cart`,
        data
      )
      console.log('res', res)
    //   dispatch(createAsyncMessage(res.data))
      getCart()
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
    //   dispatch(createAsyncMessage(error.response.data))
    }
  }

  useEffect(() => {
    getProduct(id)
  }, [id])

  return (
    <div className="container">
      {/* ${product.imageUrl} */}
      <div
        style={{
          minHeight: '400px',
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: 'center center'
        }}
      ></div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0">{product.title}</h2>
          <p className="fw-bold">NT${product.price}</p>
          <p>{product.content}</p>
          <div className="my-4">
            <img src={product.imageUrl} alt="" className="img-fluid mt-4" />
          </div>
        </div>

        <div className="col-md-4">
          <div className="input-group mb-3 border mt-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                onClick={() =>
                  setCarQuantity((pre) => (pre === 1 ? pre : pre - 1))
                }
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
            <input
              type="number"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={carQuantity}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                onClick={() => setCarQuantity((pre) => pre + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark w-100 rounded-0 py-3"
            onClick={() => addToCart()}
            disabled={isLoading}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
