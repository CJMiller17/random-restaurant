import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


function Searchbar({setSearchResults}) {
    const [query, setQuery] = useState("");
    
        useEffect(() => {
        fetchAPI();
        }, [query]);

    const handleChange = (value) => {
        setQuery(value);
        // fetchAPI(value);
    };

    
    const fetchAPI = (value) => {
        fetch("https://www.jsonkeeper.com/b/MDXW")
        .then((response) => response.json())
        .then(json => {
            console.log("JSON: ", json);
            const searchResults = json.filter((entry) => {
                console.log("HERE!!!", value, entry)
                return (
                    value &&
                      entry &&
                        (
                            entry.title.toLowerCase().includes(value) ||
                            entry.description.toLowerCase().includes(value) ||
                            entry.category.toLowerCase().includes(value) ||
                            entry.cuisine_type.toLowerCase().includes(value)
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