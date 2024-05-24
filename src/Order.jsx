import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Order() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    foodItems: [{ id: "", qty: 1 }],
    specialInstructions: "",
    customerId: null,
    orderId: null,
  });

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = () => {
    axios
      .get("http://127.0.0.1:8000/foodItem/")
      .then((response) => {
        console.log("Response: ", response.data);
        setFoodItems(response.data); // FoodItems becomes the response data right here
      })
      .catch((error) => {
        console.error("Error fetching food items: ", error);
      });
  };

  const handleChange = (e, index) => {
    // Name is the name of the input field to keep things straight. Thats an AHA. The value is the actual entry
    const { name, value } = e.target;
    const newFormData = { ...formData }; //Variable used to help update state and not be 1 behind.

    // Has to treat foodItems differently because its an array
    if (name === "foodItem") {
      newFormData.foodItems[index].id = value;
    } else if (name === "qty") {
      newFormData.foodItems[index].qty = value;
    } else {
      // Handles all other forms of information 
      newFormData[name] = value;
    }
    setFormData(newFormData);
  };

  const handleAddFoodItem = () => {
    // Triggers rerender to show the food item added
    setFormData({
      ...formData,
      // foodItems gets all the properties of formData into it
      // Comma represents the aspect you are updating
      foodItems: [...formData.foodItems, { id: "", qty: 1 }], // New Food Item from form
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // Sends customer data to the customer endpoint
  axios
    // The post creates the customer object. The keys correspond to the database while the values correspond to the state object
    .post("http://127.0.0.1:8000/customers/", {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
    })

    .then((customerResponse) => {
      // The server sends back a response. The POST isn't just a one way street, which makes sense why we can get 400 errors
      const customerData = customerResponse.data;
      console.log("Customer created with ID:", customerData.id); // The id is coming from the database

      // Sends order details to the order details endpoint
      // Maps over the foodItems array because there can be many foodItems from the form
      const orderDetailsPromises = formData.foodItems.map((item) =>
        axios.post("http://127.0.0.1:8000/order_details/", {
          food_id: item.id,
          qty: item.qty,
          special_instructions: formData.specialInstructions,
          order_id: null, // Temporarily setting order_id to null
        })
      );

      // Promise. Then. Return. Waits for all the promises to come back resolved. They come back with their database object info and the customer id
      return Promise.all(orderDetailsPromises).then(
        (orderDetailsResponses) => ({
          orderDetailsResponses,
          customerId: customerData.id, // Linked from previous response
        })
      );
    })

    .then(({ orderDetailsResponses, customerId }) => {  // Passes order details and customer id from previous response. Dont have to deal with nested object
      const orderDetailsIds = orderDetailsResponses.map(
        (response) => response.data.id //Relates to the foodItem array
      );

      // Creates the order using customer and order details
      return axios.post("http://127.0.0.1:8000/orders/", {
        
        // Fed from the Order Details Response
        name: customerId,
        status: "Received", // Ensure this matches one of the choices in STATUS
        delivery: false, // or set this dynamically based on form input if applicable
        special_instructions: formData.specialInstructions,
        food_items: orderDetailsIds, // List of order detail IDs
      });
    })

    .catch((error) => {
      console.error(
        "Error creating order: ",
        error.response ? error.response.data : error.message
      );
    });
};


  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="number"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>
        <Col>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={(e) => handleChange(e)}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={(e) => handleChange(e)}
            maxLength={2}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      {formData.foodItems.map((foodItem, index) => (
        <Row key={index} className="mb-3">
          <Col>
            <Form.Control
              as="select"
              name="foodItem"
              value={foodItem.id}
              onChange={(e) => handleChange(e, index)}
            >
              <option value={null}>Select Food Item</option>
              {foodItems.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Quantity"
              name="qty"
              value={foodItem.qty}
              onChange={(e) => handleChange(e, index)}
              min="1"
            />
          </Col>

          {index === formData.foodItems.length - 1 && (
            <Col>
              <Button
                onClick={handleAddFoodItem}
                className="btn-sm mt-1"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #007642ff, #87BD5Cff, #87BD5Cff, #CC2439ff)",
                  borderColor: "#87BD5Cff",
                }}
                type="button"
              >
                Add Food Item
              </Button>
            </Col>
          )}
        </Row>
      ))}

      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Special Instructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
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
    </Form>
  );
}

export default Order;
