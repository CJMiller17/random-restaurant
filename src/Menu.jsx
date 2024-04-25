import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";

function Menu() {
  const [searchResults, setSearchResults] = useState([]);
  const [foodie, setFoodie] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.jsonkeeper.com/b/MDXW")
      .then(function (foodie) {
        console.log(foodie);
        setFoodie(foodie.data);
      })
      .catch(function (spoiledFood) {
        console.log("Foodie error: ", spoiledFood);
      })
      .finally(function () {
        //Always executed
      });
  }, []);
  useEffect(() => { 
    console.log("Use Effect: ", searchResults)
  }, [searchResults])
  
  const starters = foodie.filter((item) => item.category === "Appetizer")
  const breakfast = foodie.filter((item) => item.category === "Breakfast");
  const lunch = foodie.filter((item) => item.category === "Lunch");
  const dinner = foodie.filter((item) => item.category === "Dinner");
  const drink = foodie.filter((item) => item.category === "Drink");

  return (
    <>
      <Searchbar setSearchResults={setSearchResults} />
      <div className="container">
        {searchResults.length > 0 ? (
          <div className="thing">sdfgdfssfgfd</div>
        ) : (
          //loop through search results
          <div>
            <div className="row justify-content-between">
              <section className="col-5 m-2 p-3 border">
                <h3 className="text-center">Starters</h3>
                {starters.map((item) => (
                  <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </section>

              <section className="col-5 m-2 p-3 border">
                <h3 className="text-center">Breakfast</h3>
                {breakfast.map((item) => (
                  <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </section>
            </div>

            <div className="row justify-content-center text-center">
              <main className="col m-3 p-3 border">
                <h2>Lunch</h2>
                {lunch.map((item) => (
                  <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </main>
            </div>

            <div className="row justify-content-between">
              <section className="col-5 m-2 p-3 border">
                <h3>Dinner</h3>
                {dinner.map((item) => (
                  <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </section>

              <section className="col-5 m-2 p-3 border">
                <h3>Drink</h3>
                {drink.map((item) => (
                  <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;

