import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Searchbar from "./Searchbar";
import Menu from "./Menu";

function Navigation() {
  
  const [searchResults, setSearchResults] = useState([]);

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
          <Searchbar setSearchResults={setSearchResults} />
        </Container>
      </Navbar>
      <Menu searchResults={searchResults} />
    </>
  );
}

export default Navigation;
