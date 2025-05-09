import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const { VITE_APP_ApiUrl,VITE_APP_ApiPath } = import.meta.env

function Home() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const url=`${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}/products?category=Maintenance`
    console.log('url',url)
    const productRes = await axios.get(url)
    console.log('productRes',productRes)
    setProducts(productRes.data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img
              src="https://www.ez-life99.com/product/image/pics/%E7%82%AD%E7%9A%821.jpg"
              className="img-fluid"
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">竹炭專賣推薦商品</h2>
            <h5 className="font-weight-normal text-muted mt-2">天然健康</h5>
          </div>
        </div>

        <div className="row mt-5">
          {products?.map((product) => {
            return (
              <div className="col-md-6 mt-md-4" key={product.id}>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-4">{product.title}</h4>
                    <Link
                      to={`/product/${product.id}`}
                      className='btn btn-outline-dark rounded-0 text-nowrap mt-2'
                    >
                      查看
                    </Link>
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
