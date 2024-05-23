import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";

function Menu() {
  const [searchResults, setSearchResults] = useState([]);
  const [foodie, setFoodie] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/foodItem")
      .then(function (foodie) {
        console.log(foodie);
        setFoodie(foodie.data);
      })
      .catch(function (spoiledFood) {
        console.log("Foodie error: ", spoiledFood);
      });
  }, []);
  useEffect(() => { 
    console.log("Use Effect: ", searchResults)
  }, [searchResults])

  //This filters the API call object by category
  const starters = foodie.filter((item) => item.category === "Starters")
  const breakfast = foodie.filter((item) => item.category === "Breakfast");
  const lunch = foodie.filter((item) => item.category === "Lunch");
  const dinner = foodie.filter((item) => item.category === "Dinner");
  const drink = foodie.filter((item) => item.category === "Drinks");
    const dessert = foodie.filter((item) => item.category === "Desserts");

  //This will use a ternary function to display the original Menu or the altered Menu
  return (
    <>
      {/* This pulls in the searchabr component */}
      <Searchbar setSearchResults={setSearchResults} />
      <div className="container">
        {searchResults.length > 0 ? (
          <div>
            {/* This displays the customized menu */}
            <section className="col-5 m-2 p-3 border">
              <h3 className="text-center">Starters</h3>
              {searchResults.map((item) => (
                <div key={item.id}>
                  <p className="title">{item.name}</p>
                  <p className="description">{item.desc}</p>
                  <p className="price">{item.price}</p>
                </div>
              ))}
            </section>
          </div>
        ) : (
          //This displays the standard Menu
          <div>
            <div className="row justify-content-between">
              <section className="col-5 m-2 p-3 border">
                <h3 className="text-center">Starters</h3>
                {starters.map((item) => (
                  <div key={item.id}>
                    <p className="title">{item.name}</p>
                    <p className="description">{item.desc}</p>
                    <p className="price">{item.price}</p>
                  </div>
                ))}
              </section>

              <section className="col-5 m-2 p-3 border">
                <h3 className="text-center">Breakfast</h3>
                {breakfast.map((item) => (
                  <div key={item.id}>
                    <p className="title">{item.name}</p>
                    <p className="description">{item.desc}</p>
                    <p className="price">{item.price}</p>
                  </div>
                ))}
              </section>
            </div>

            <div className="row justify-content-center text-center">
              <main className="col m-3 p-3 border">
                <h2>Lunch</h2>
                {lunch.map((item) => (
                  <div key={item.id}>
                    <p className="title">{item.name}</p>
                    <p className="description">{item.desc}</p>
                    <p className="price">{item.price}</p>
                  </div>
                ))}
              </main>
            </div>

            <div className="row justify-content-between">
              <section className="col-5 m-2 p-3 border">
                <h3 className="text-center">Dinner</h3>
                {dinner.map((item) => (
                  <div key={item.id}>
                    <p className="title">{item.name}</p>
                    <p className="description">{item.desc}</p>
                    <p className="price">{item.price}</p>
                  </div>
                ))}
              </section>

              <section className="col-5 m-2 p-3 border">
                <h3 className="text-center">Drink</h3>
                {drink.map((item) => (
                  <div key={item.id}>
                    <p className="title">{item.name}</p>
                    <p className="description">{item.desc}</p>
                    <p className="price">{item.price}</p>
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

