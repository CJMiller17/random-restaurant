import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Navigation() {
  return (
    <>
      <Navbar className="mb-2" bg="dark" data-bs-theme="dark" sticky="top">
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
          <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
