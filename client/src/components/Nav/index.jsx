import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './index.css';
import logo from '../assets/logoMain.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";


function Nav() {
  const [menu, setMenu] = useState("A")

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
        </div>

        <div className="nav-div">
          <ul className="nav-menu">
            <li onClick={() => { setMenu("A") }}>A{menu === "A" ? <hr /> : <></>}</li>
            <li onClick={() => { setMenu("B") }}>B{menu === "B" ? <hr /> : <></>}</li>
            <li onClick={() => { setMenu("C") }}>C{menu === "C" ? <hr /> : <></>}</li>
            <li onClick={() => { setMenu("D") }}>D{menu === "D" ? <hr /> : <></>}</li>

          </ul>
        </div>

        <div className="nav-login">
          {/* <div className="icon">
          <FontAwesomeIcon icon={faUser} />
          </div> */}

          <button id="acc">Create Account</button>
          <button>Log In</button>
        </div>
        {/* add to cart */}

        <div>

        </div>
      </div>
    </>

  )

}
// function Nav() {

//   function showNavigation() {
//     if (Auth.loggedIn()) {
//       return (
//         <ul className="flex-row">
//           <li className="mx-1">
//             <Link to="/orderHistory">
//               Order History
//             </Link>
//           </li>
//           <li className="mx-1">
//             {/* this is not using the Link component to logout or user and then refresh the application to the start */}
//             <a href="/" onClick={() => Auth.logout()}>
//               Logout
//             </a>
//           </li>
//         </ul>
//       );
//     } else {
//       return (
//         <ul className="flex-row">
//           <li className="mx-1">
//             <Link to="/signup">
//               Signup
//             </Link>
//           </li>
//           <li className="mx-1">
//             <Link to="/login">
//               Login
//             </Link>
//           </li>
//         </ul>
//       );
//     }
//   }

//   return (
//     <header className="flex-row px-1">
//       <h1>
//         <Link to="/">
//           <span role="img" aria-label="shopping bag">🛍️</span>
//           -Shop-Shop
//         </Link>
//       </h1>

//       <nav>
//         {showNavigation()}
//       </nav>
//     </header>
//   );
// }

export default Nav;




{/*search bar*/ }
//  <form className="ui form">
//  <div className="field">
//    <div className="input-group">
//      <input type="text" name="first-name" placeholder="search..."/>
//      <button className="ui button" type="submit">Submit</button>
//    </div>
//  </div>
// </form>