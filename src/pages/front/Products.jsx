import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'

const { VITE_APP_ApiUrl,VITE_APP_ApiPath } = import.meta.env

function Products() {
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({})

  /**
   * 取得產品列表
   */
  const getProducts = async (page = 1) => {
    const productRes = await axios.get(
      `${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}/products?page=${page}`
    )
    console.log('productRes', productRes)
    setProducts(productRes.data.products)
    setPagination(productRes.data.pagination)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-3" key={product.id}>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0 object-cover"
                    height={300}
                    alt="..."
                  />

                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-2">
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                    <p className="text-muted mt-3">NT$ {product.price}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <nav className="d-flex justify-content-center">
          <Pagination pagination={pagination} changePage={getProducts} />
        </nav>
      </div>
    </>
  )
}

export default Products
