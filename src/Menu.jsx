import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodieApiCall() {
axios
    .get("https://www.jsonkeeper.com/b/MDXW")
    .then(function (foodie) {
        console.log(foodie);
        let food = foodie.data;
        let cuisineTypes = [...new Set(food.map(yum => yum.category))];
        console.log("Cuisine Types: ", cuisineTypes);

        let cuisineCounts = food.reduce((counts, dish) => {
          counts[dish.cuisine_type] = (counts[dish.cuisine_type] || 0) + 1;
          return counts;
        }, {});

        console.log("Cuisine Counts: ", cuisineCounts);
        
     })
     .catch(function (spoiledFood) {
       //Handles error
       console.log("Foodie error: ", spoiledFood);
    //    errorMessage.style.visibility = "visible";
    //    alert("Enter a real zipcode");
    //    spinner.style.visibility = "hidden";
     })
     .finally(function () {
       //Always executed
     });
}

function Menu() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-between">
          <section className="col-5 m-2 p-3 border">
            <h3 className="text-center">Starters</h3>
            <p>Name</p>
            <p>Description</p>
            <p>Name</p>
            <p>Description</p>
            <p>Name</p>
            <p>Description</p>
          </section>

          <section className="col-5 m-2 p-3 border">
            <h3 className="text-center">Desserts</h3>
            <p>Name</p>
            <p>Description</p>
            <p>Name</p>
            <p>Description</p>
            <p>Name</p>
            <p>Description</p>
          </section>
        </div>

        <div className="row justify-content-center text-center">
          <main className="col m-3 p-3 border">
            <h2>Entrees</h2>
            <p>Name</p>
            <p>Description</p>
            <p>Name</p>
            <p>Description</p>
            <p>Name</p>
            <p>Description</p>
          </main>
        </div>

        <div className="row justify-content-between">
          <section className="col-5 m-2 p-3 border">
            <h3>Alcohol</h3>
            <p>Name</p>
            <p>Description</p>
            <p>Name</p>
            <p>Description</p>
          </section>

          <section className="col-5 m-2 p-3 border">
            <h3>Reg Bevs</h3>
            <p>Name</p>
            <p>desciption</p>
            <p>Name</p>
            <p>desciption</p>
          </section>
        </div>
      </div>
      <FoodieApiCall />
    </>
  );
}

export default Menu;

