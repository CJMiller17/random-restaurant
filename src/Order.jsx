import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Order() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="email" placeholder="ex. Reece" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="password" placeholder="ex. Nice Shirt" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="123 Fake St" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option value="">AL</option>
            <option value="">AK</option>
            <option value="">AZ</option>
            <option value="">AR</option>
            <option value="">AS</option>
            <option value="">CA</option>
            <option value="">CO</option>
            <option value="">CT</option>
            <option value="">DE</option>
            <option value="">FL</option>
            <option value="">GA</option>
            <option value="">HI</option>
            <option value="">ID</option>
            <option value="">IL</option>
            <option value="">IN</option>
            <option value="">IA</option>
            <option value="">KS</option>
            <option value="">KY</option>
            <option value="">LA</option>
            <option value="">ME</option>
            <option value="">MD</option>
            <option value="">MA</option>
            <option value="">MI</option>
            <option value="">MN</option>
            <option value="">MS</option>
            <option value="">MO</option>
            <option value="">MT</option>
            <option value="">NE</option>
            <option value="">NV</option>
            <option value="">NH</option>
            <option value="">NJ</option>
            <option value="">NM</option>
            <option value="">NY</option>
            <option value="">NC</option>
            <option value="">ND</option>
            <option value="">OH</option>
            <option value="">OK</option>
            <option value="">OR</option>
            <option value="">PA</option>
            <option value="">RI</option>
            <option value="">SC</option>
            <option value="">SD</option>
            <option value="">TN</option>
            <option value="">TX</option>
            <option value="">UT</option>
            <option value="">VT</option>
            <option value="">VA</option>
            <option value="">WA</option>
            <option value="">WV</option>
            <option value="">WI</option>
            <option value="">WY</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Delivery?" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Order;