import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import caterpillar from "/src/hungy-logo.png"

function Navigation() {

  return (
    <>
      <Navbar
        className="navbar mb-2"
        bg="myColor"
        data-bs-theme="dark"
        sticky="top"
      >
        <Container className="d-flex justify-content-start m-0">
          <img src={caterpillar} height={42} />
          <Nav className="">
            <Link className="nav-link align-content-center" to="/about">
              Our Story
            </Link>
            <Link className="nav-link align-content-center" to="/menu">
              Menu
            </Link>
            <Link className="nav-link align-content-center" to="/gallery">
              Gallery
            </Link>
            <Link className="nav-link align-content-center" to="/contact">
              Contact
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
