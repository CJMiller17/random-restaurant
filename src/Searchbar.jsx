import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Searchbar({setSearchResults}) {
    const [query, setQuery] = useState("");

    const fetchAPI = (value) => {
        fetch("https://www.jsonkeeper.com/b/MDXW")
            .then((response) => response.json())
            .then(json => {
                console.log("JSON: ", json);
                const searchResults = json.filter((entry) => {
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
                console.log("Search Results: ", searchResults);
                setSearchResults(searchResults);
            });
    };

    const handleChange = (value) => {
        setQuery(value)
        fetchAPI(value)
    };

    return (
      <div>
        <Form>
          <Row>
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
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
}

export default Searchbar;