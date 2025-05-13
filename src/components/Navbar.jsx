import { NavLink } from 'react-router-dom'
import SearchTextBox from './SearchTextBox'

function Navbar({ cartData }) {
  return (
    <div className="position-relative">
      <div
        className="position-absolute"
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage:
            'url(https://caede-kyoto-asia.com/wp/wp-content/uploads/2020/09/01-16.jpg)',
          backgroundPosition: 'center center',
          opacity: 0.1
        }}
      ></div>
      <div
        className="container d-flex flex-column"
        style={{ minHeight: '50vh' }}
      >
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="./index.html">
            竹炭專賣店之購物網
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            
            {/* 因API沒有提供關鍵字搜尋故放棄 <div className="row">
              <div className="col-sm-10">
                <SearchTextBox></SearchTextBox>
              </div>
            </div> */}

            <div className="navbar-nav">
              <NavLink className="nav-item nav-link me-4" to="findImage">
                找圖
              </NavLink>

              <NavLink className="nav-item nav-link me-4" to="login">
                登入後台管理
              </NavLink>

              <NavLink className="nav-item nav-link me-4" to="products">
                產品列表
              </NavLink>

              <NavLink to="/cart" className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartData?.carts?.length}
                </span>
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="row justify-content-center my-auto">
          <div className="col-md-4 text-center">
            <h2>竹炭專賣店之購物網</h2>
            <p className="text-muted mb-0">天然健康</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
