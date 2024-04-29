import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Menu from "./Menu";


function Searchbar({setSearchResults}) {
    const [query, setQuery] = useState("");
    
    useEffect(() => {
      fetchAPI();
    }, [query]);

    const handleChange = (value) => {
        setQuery(value);
    };

    // This fetches the API
    const fetchAPI = () => {
        fetch(
          "https://raw.githubusercontent.com/bootcamp-students/random-restaurant-json/main/foodList.json"
        ) //This gets the response and allows me to use the filter method
          //otherwise I get an error in the console but it doesn't break  
          .then((response) => response.json())
          .then((json) => {
            const searchResults = json.filter((entry) => {
              return (
                //These are two guards that ensure there was a change & an entry
                query &&
                entry &&
                (entry.title.toLowerCase().includes(query) ||
                  entry.description.toLowerCase().includes(query) ||
                  entry.category.toLowerCase().includes(query) ||
                  entry.cuisine_type.toLowerCase().includes(query)
                )
              );
            });
            setSearchResults(searchResults);
            console.log("Search Results: ", searchResults);
          });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                onChange={(e) => handleChange(e.target.value)}
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