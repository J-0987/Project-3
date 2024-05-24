import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.png';
import './index.css';



function Navigation() {
  const categories = [
    'Beauty', 'Fragrances', 'Furniture', 'Groceries', 'Home Decoration',
    'Kitchen Accessories', 'Laptops', 'Mens Shirts', 'Mens Shoes', 'Mens Watches',
    'Mobile Accessories', 'Motorcycle', 'Skin Care', 'Smartphones', 'Sports Accessories',
    'Sunglasses', 'Tablets', 'Tops', 'Vehicle', 'Womens Bags', 'Womens Dresses',
    'Womens Jewellery', 'Womens Shoes', 'Womens Watches'
  ];
  return (
    <Navbar expand="lg"  className="bg-body-tertiary nav-container">
      <Container >
   
    
        <Navbar.Brand href="#home">
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

            <NavDropdown title="Create Account /Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Create Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               Login
              </NavDropdown.Item>
              
            </NavDropdown>
        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
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