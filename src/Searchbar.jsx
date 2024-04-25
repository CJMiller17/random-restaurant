import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


function Searchbar({setSearchResults}) {
    const [query, setQuery] = useState("");
    useEffect(() => {
        fetchAPI();
    }, [query])
    const fetchAPI = () => {
        fetch("https://www.jsonkeeper.com/b/MDXW")
        .then((response) => response.json())
        .then(json => {
            console.log("JSON: ", json);
            const searchResults = json.filter((entry) => {
                console.log("HERE!!!", query, entry)
                return (
                    query &&
                      entry &&
                        (
                            entry.title.toLowerCase().includes(query) ||
                            entry.description.toLowerCase().includes(query) ||
                            entry.category.toLowerCase().includes(query) ||
                            entry.cuisine_type.toLowerCase().includes(query)
                        )
                    );
                });
                console.log("Search Results: ", searchResults);
                setSearchResults(searchResults);
            });
    };

    const handleChange = (value) => {
        setQuery(value)
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