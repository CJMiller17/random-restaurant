import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link className="navbar-brand" to="/">
            LOGO
          </Link>
          <Nav className="me-auto">
            <Link className="nav-link" to="/about">
              Our Story
            </Link>
            <Link className="nav-link" to="/menu">
              Menu
            </Link>
            <Link className="nav-link" to="/gallery">
              Gallery
            </Link>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
