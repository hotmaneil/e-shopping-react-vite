import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ProductModal from '../../components/ProductModal'
import DeleteModal from '../../components/DeleteModal'
import Pagination from '../../components/Pagination'
import { Modal } from 'bootstrap'

const { VITE_APP_ApiUrl, VITE_APP_ApiPath } = import.meta.env

function AdminProducts() {
  const url = `${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}`
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({})

  // type:決定modal展開的用途
  const [type, setType] = useState('create')
  const [tempProduct, setTempProduct] = useState({})

  const productModal = useRef(null)
  const deleteModal = useRef(null)
  useEffect(() => { 
    productModal.current = new Modal('#productModal', {
      backdrop: 'static'
    })

    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static'
    })

    getProducts()
  }, [])

  /**
   * 取得產品列表
   */
  const getProducts = async (page = 1) => {
    const productRes = await axios.get(`${url}/admin/products?page=${page}`)
    console.log('productRes', productRes)
    setProducts(productRes.data.products)
    setPagination(productRes.data.pagination)
  }

  /**
   * 開啟產品Modal
   * @param {*} type
   * @param {*} product
   */
  const openProductModal = (type, product) => {
    setType(type)
    setTempProduct(product)
    productModal.current.show()
  }

  /**
   * 關閉產品Modal
   */
  const closeProductModal = () => {
    productModal.current.hide()
  }

  /**
   * 開啟刪除Modal
   * @param {*} type
   * @param {*} product
   */
  const openDeleteModal = (product) => {
    setType(type)
    setTempProduct(product)
    deleteModal.current.show()
  }

  /**
   * 關閉刪除Modal
   */
  const closeDeleteModal = () => {
    deleteModal.current.hide()
  }

  /**
   * 刪除產品
   * @param {*} id
   */
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${url}/admin/product/${id}`)
      if (res.data.success) {
        getProducts()
        deleteModal.current.hide()
      }
      console.log('res', res)
    } catch (error) {
      console.log('deleteProduct error', error)
    }
  }

  return (
    <div className="p-3">
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempProduct.title}
        handleDelete={deleteProduct}
        id={tempProduct.id}
      />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openProductModal('create', {})}
        >
          建立新商品
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openProductModal('edit', product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getProducts} />
    </div>
  )
}

export default AdminProducts
