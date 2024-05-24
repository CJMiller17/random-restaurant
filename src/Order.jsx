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
    const { name, value } = e.target;
    const newFormData = { ...formData };
    if (name === "foodItem") {
      newFormData.foodItems[index].id = value;
    } else if (name === "qty") {
      newFormData.foodItems[index].qty = value;
    } else {
      newFormData[name] = value;
    }
    setFormData(newFormData);
  };

  const handleAddFoodItem = () => {
    setFormData({
      ...formData,
      foodItems: [...formData.foodItems, { id: "", qty: 1 }],
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // Step 1: Send customer data to the customer endpoint
  axios
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
      const customerData = customerResponse.data;
      console.log("Customer created with ID:", customerData.id);

      // Step 2: Send order details to the order details endpoint
      const orderDetailsPromises = formData.foodItems.map((item) =>
        axios.post("http://127.0.0.1:8000/order_details/", {
          food_id: item.id,
          qty: item.qty,
          special_instructions: formData.specialInstructions,
          order_id: null, // Temporarily setting order_id to null
        })
      );

      return Promise.all(orderDetailsPromises).then(
        (orderDetailsResponses) => ({
          orderDetailsResponses,
          customerId: customerData.id,
        })
      );
    })
    .then(({ orderDetailsResponses, customerId }) => {
      const orderDetailsIds = orderDetailsResponses.map(
        (response) => response.data.id
      );
      console.log("Order details created with IDs:", orderDetailsIds);

      // Ensure `customerId` is correctly passed to the order creation request
      console.log("Customer ID being used for order creation:", customerId);

      // Step 3: Create the order using customer and order details
      return axios.post("http://127.0.0.1:8000/orders/", {
        name: customerId,
        status: "Received", // Ensure this matches one of the choices in STATUS
        delivery: false, // or set this dynamically based on form input if applicable
        special_instructions: formData.specialInstructions,
        food_items: orderDetailsIds, // List of order detail IDs
      });
    })
    .then((orderResponse) => {
      console.log("Order created successfully: ", orderResponse.data);
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
