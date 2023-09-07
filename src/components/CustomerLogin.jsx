import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import image from "./images/Animalshelter.png";
import Figure from "react-bootstrap/Figure";
import swal from "sweetalert2";
import Footer from "./Footer";

function CustomerLogin() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    userid: "",
    pwd: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .post("http://localhost:9090/api/users/validate", user)
        .then((resp) => {
          let result = resp.data.data;
          console.log(resp.data.data);
          sessionStorage.setItem("userid", result.userid);

          sessionStorage.setItem("uname", result.name);
          //sessionStorage.setItem("role", "customer");
          sessionStorage.setItem("role", result.userType);
          sessionStorage.setItem("id", result.id);
          dispatch({ type: "IsLoggedIn" });
          //   if (result.usertype === "Seller") {
          //     history.push("/sprofile");
          //   } else {
          history.push("/");
          //}
        })
        .catch((error) => {
          console.log("Error", error);
          swal.fire("Invalid username or password");
        });
    }
  }, [errors]);

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row className="my-4">
          <Col className="" style={{ margin: "auto" }}>
            <Figure>
              <Figure.Image
                width={400}
                height={400}
                alt="400x400"
                src={image}
              />
            </Figure>
          </Col>
          <Col className="py-4" style={{ borderLeft: "2px solid black" }}>
            <Card style={{ backgroundColor: "#DAF7E2" }}>
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <h3>Login </h3>
                  <br />
                  <Form.Group className="mb-3" md="4">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        name="userid"
                        value={user.userid}
                        onChange={handleInput}
                        isInvalid={!!errors.userid}
                      />
                      <InputGroup.Text>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-envelope-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                        </svg>
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.userid}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" md="4">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="pwd"
                        value={user.pwd}
                        onChange={handleInput}
                        isInvalid={!!errors.pwd}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pwd}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <br />
                  <Button variant="secondary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="links">
          <Col className="text-end" style={{ borderRight: "2px solid black" }}>
            <a href="/register">Register Now</a>
          </Col>
          <Col>
            <a href="/email-for-forgot-password">Forgot Password ?</a>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default CustomerLogin;
