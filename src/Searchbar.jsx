import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Menu from "./Menu";


function Searchbar({setSearchResults}) {
    const [query, setQuery] = useState("");
    
    useEffect(() => {
      if (query) {
        fetchAPI()
      }
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // This fetches the API
  const fetchAPI = () => {
    // #########################################
    // Just changed the URL
      fetch("http://127.0.0.1:8000/foodItem")
        // #########################################
        
      //This gets the response and allows me to use the filter method
      //otherwise I get an error in the console but it doesn't break
      .then((response) => response.json())
      .then((json) => {
        const searchResults = json.filter((entry) => {
          return (
            //These are two guards that ensure there was a change & an entry
            query &&
            entry &&
            (entry.name.toLowerCase().includes(query.toLowerCase()) ||
              entry.desc.toLowerCase().includes(query.toLowerCase()) ||
              entry.category.toLowerCase().includes(query.toLowerCase()))
          );
        });
        setSearchResults(searchResults);
        console.log("Search Results: ", searchResults);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      fetchAPI(); //Calls the API on submit as well
    };

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-center justify-content-start p-2 ms-4">
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search Food"
                value={query}
                onChange={handleChange}
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button
                className="btn-sm mt-1"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #007642ff, #87BD5Cff, #87BD5Cff, #CC2439ff)",
                  borderColor: "#87BD5Cff",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
}

export default Searchbar;