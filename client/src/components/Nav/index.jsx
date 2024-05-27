import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Auth from "../../utils/auth";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./index.css";
import { Link } from "react-router-dom";
import Cart from "../Cart";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const categories = [
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
    "Laptops",
    "Motorcycle",
    "Smartphones",
    "Sunglasses",
    "Tablets",
    "Tops",
    "Vehicle",
  ];

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="nav-links">

          <Nav.Link as={Link} to="/orderHistory" style={{ whiteSpace: 'nowrap', fontWeight:' 500'}}>
            My Account
          </Nav.Link>
          <Nav.Link as={Link} to="/" onClick={() => Auth.logout()}>
            Logout
          </Nav.Link>


        </div>
      );
    } else {
      return (
        <NavDropdown title="Create Account /Login" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/signup">
            Create Account
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/login">
            Login
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary nav-container">
        <Container>
          <Navbar.Brand as={Link} to="/">
            THE SHOP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
         
              <NavDropdown
                className="full-width-dropdown"
                title="Categories"
                id="basic-nav-dropdown"
              >
                {categories.map((category, index) => (
                  <NavDropdown.Item
                    as={Link}
                    to={`/category/${category}`}
                    key={index}
                  >
                    {category}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Nav>{showNavigation()}</Nav>
          </Navbar.Collapse>
          <Cart />
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;

