import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { VITE_APP_ApiUrl, VITE_APP_ApiPath } = import.meta.env

function Login() {
//   const url = `${VITE_APP_ApiUrl}/v2/api/${VITE_APP_ApiPath}`

  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const [loginState, setLoginState] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setData({ ...data, [name]: value })
  }

  const submit = async () => {
    try {
      const submitUrl = `${VITE_APP_ApiUrl}/v2/admin/signin`
      console.log('submitUrl', submitUrl)
      const res = await axios.post(submitUrl, data)
      console.log('res', res)

      const { token, expired } = res.data
      document.cookie = `hexToken=${token};expires=${new Date(expired)}`

      if (res.data.success) {
        navigate('/admin/products')
      }
    } catch (error) {
      console.log('error', error)
      setLoginState(error.response.data)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>登入帳號</h2>

          <div
            className={`alert alert-danger ${
              loginState.message ? 'd-block' : 'd-none'
            }`}
            role="alert"
          >
            {loginState.message}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label w-100">
              Email
              <input
                id="email"
                className="form-control"
                name="username"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label w-100">
              密碼
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="name@example.com"
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>
            登入
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
