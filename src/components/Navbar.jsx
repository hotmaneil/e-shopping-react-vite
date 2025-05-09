import { NavLink } from 'react-router-dom'

// export default function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <span className="navbar-brand" href="#">
//           Navbar
//         </span>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <NavLink
//                 className="nav-link"
//                 style={({ isActive }) => {
//                   return {
//                     color: isActive ? 'red' : ''
//                   }
//                 }}
//                 to="/"
//               >
//                 Home
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

function Navbar({ cartData }) {
  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <NavLink
            className="navbar-brand position-absolute"
            to="/"
            href="./index.html"
            style={{
              left: '50%',
              transform: 'translate(-50%, -50%)',
              top: '50%'
            }}
          >
            竹炭專賣店之購物網
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse bg-white custom-header-md-open"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link ps-0" to="products">
                  產品列表
                </NavLink>
              </li>
            </ul>

             <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link ps-0" to="login">
                  登入後台管理
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="d-flex">
            <NavLink to="/cart" className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              <span class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                {cartData?.carts?.length}
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
