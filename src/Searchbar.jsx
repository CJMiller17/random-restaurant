import React { useState } from "react";

function Searchbar() {
    const [query, setQuery] = useState("");

    const fetchAPI = (value) => {
        fetch("https://www.jsonkeeper.com/b/MDXW")
            .then((response) => response.json())
            .then(json => {
            console.log("JSON: ", json);
                const searchResults = json.filter((entry) => {
                    return entry && entry.title && entry.title.toLowerCase().includes(value)
                });
                console.log("Search Results: ", searchResults);
        });
    }

    const handleChange = (value) => {
        setQuery(value)
        fetchAPI(value)
    }

    return (
        <div>
            <input
                placeholder="Search Food"
                value={query}
                onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}

export default Searchbar;