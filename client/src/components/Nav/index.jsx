import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Auth from "../../utils/auth";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.png';
import './index.css';
import { Link } from 'react-router-dom';


function Navigation() {
  const categories = [
    'Beauty', 'Fragrances', 'Furniture', 'Groceries', 'Home Decoration',
    'Kitchen Accessories', 'Laptops', 'Mens Shirts', 'Mens Shoes', 'Mens Watches',
    'Mobile Accessories', 'Motorcycle', 'Skin Care', 'Smartphones', 'Sports Accessories',
    'Sunglasses', 'Tablets', 'Tops', 'Vehicle', 'Womens Bags', 'Womens Dresses',
    'Womens Jewellery', 'Womens Shoes', 'Womens Watches'
  ];

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className='nav-links'>
<Nav.Link as={Link} to="/" onClick={() => Auth.logout()}>Logout</Nav.Link>

<Nav.Link as={Link} to="/orderHistory">My Account</Nav.Link> 
        </div>
        
      )



    } else {

      return (
        <NavDropdown title="Create Account /Login" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/signup">Create Account</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/login">
            Login
          </NavDropdown.Item>

        </NavDropdown>
      )
    }

  }

  return (
    <Navbar expand="lg"  className="bg-body-tertiary nav-container">
    <Container >
 
  
      <Navbar.Brand as={Link} to="/">
       THE SHOP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link> */}
          <NavDropdown className="full-width-dropdown" title="Categories" id="basic-nav-dropdown">
          {categories.map((category, index) => (
              <NavDropdown.Item key={index} href={`#${category}`}>
                {category}
                </NavDropdown.Item>
            ))}
           
          </NavDropdown>

        </Nav>
<Nav>
{showNavigation()}
</Nav>

      </Navbar.Collapse>
    </Container>
  </Navbar>
  )



}



export default Navigation;
















// import Auth from "../../utils/auth";
// import { Link } from "react-router-dom";
// import './index.css';
// import logo from '../assets/logoMain.jpg';

// import { useState } from "react";


// function Nav() {
//   const [menu, setMenu] = useState("A")

//   return (
//     <>
//       <div className="navbar">
//         <div className="nav-logo">
//           <img src={logo} alt="" />
//         </div>

//         <div className="nav-div">
//           <ul className="nav-menu">
//             <li onClick={() => { setMenu("A") }}>A{menu === "A" ? <hr /> : <></>}</li>
//             <li onClick={() => { setMenu("B") }}>B{menu === "B" ? <hr /> : <></>}</li>
//             <li onClick={() => { setMenu("C") }}>C{menu === "C" ? <hr /> : <></>}</li>
//             <li onClick={() => { setMenu("D") }}>D{menu === "D" ? <hr /> : <></>}</li>

//           </ul>
//         </div>

//         <div className="nav-login">
//           {/* <div className="icon">
//           <FontAwesomeIcon icon={faUser} />
//           </div> */}

//           <button id="acc">Create Account</button>
//           <button>Log In</button>
//         </div>
//         {/* add to cart */}

//         <div>

//         </div>
//       </div>
//     </>

//   )

// }
//  export default Nav;