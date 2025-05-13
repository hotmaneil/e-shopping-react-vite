import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const { VITE_APP_ApiUrl, VITE_APP_ApiPath } = import.meta.env

function Home() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const url = `${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}/products?category=Maintenance`
    console.log('url', url)
    const productRes = await axios.get(url)
    console.log('productRes', productRes)
    setProducts(productRes.data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {products?.map((product) => {
            return (
              <div className="col-md-4 mt-md-4">
                <div className="card border-0 mb-4">
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0 object-cover"
                    width="100%"
                    height="200"
                    alt="..."
                  />
                  <div className="card-body text-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="card-text text-muted mb-0"
                    >
                      <h5>{product.title}</h5>
                    </Link>
                     <p className="text-muted mt-3">NT$ {product.price}</p>
                    <div className="d-flex justify-content-between"> 
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home
