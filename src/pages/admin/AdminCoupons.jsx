import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import CouponModal from '../../components/CouponModal'
import DeleteModal from '../../components/DeleteModal'
import Pagination from '../../components/Pagination'
import { Modal } from 'bootstrap'

const { VITE_APP_ApiUrl, VITE_APP_ApiPath } = import.meta.env

function AdminCoupons() {
  const url = `${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}`
  const [coupons, setCoupons] = useState([])
  const [pagination, setPagination] = useState({})

  // type:決定modal展開的用途
  const [type, setType] = useState('create')
  const [tempCoupon, setTempCoupon] = useState({})

  const couponModal = useRef(null)
  const deleteModal = useRef(null)
  useEffect(() => {
    couponModal.current = new Modal('#couponModal', {
      backdrop: 'static'
    })

    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static'
    })

    getCoupons()
  }, [])

  /**
   * 取得優惠券列表
   */
  const getCoupons = async (page = 1) => {
    const couponRes = await axios.get(`${url}/admin/coupons?page=${page}`)
    console.log('couponRes', couponRes)
    setCoupons(couponRes.data.coupons)
    setPagination(couponRes.data.pagination)
  }

  /**
   * 開啟優惠券Modal
   * @param {*} type
   * @param {*} Coupon
   */
  const openCouponModal = (type, coupon) => {
    setType(type)
    setTempCoupon(coupon)
    couponModal.current.show()
  }

  /**
   * 關閉優惠券Modal
   */
  const closeModal = () => {
    couponModal.current.hide()
  }

  /**
   * 開啟刪除Modal
   * @param {*} type
   * @param {*} coupon
   */
  const openDeleteModal = (coupon) => {
    setType(type)
    setTempCoupon(coupon)
    deleteModal.current.show()
  }

  /**
   * 關閉刪除Modal
   */
  const closeDeleteModal = () => {
    deleteModal.current.hide()
  }

  /**
   * 刪除優惠券
   * @param {*} id
   */
  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(
        `${url}/admin/coupon/${id}`
      )
      if (res.data.success) {
        getCoupons()
        deleteModal.current.hide()
      }
      console.log('res', res)
    } catch (error) {
      console.log('deleteCoupon error', error)
    }
  }

  return (
    <div className="p-3">
      <CouponModal
        closeModal={closeModal}
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />
      <h3>優惠券列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal('create', {})}
        >
          建立新優惠券
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.percent}</td>
                <td>{new Date(product.due_date).toDateString()}</td>
                <td>{product.code}</td>
                <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal('edit', product)}
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
      <Pagination pagination={pagination} changePage={getCoupons} />
    </div>
  )
}

export default AdminCoupons
