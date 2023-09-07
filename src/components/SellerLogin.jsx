// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import loginvalidation from "../loginvalidation"

// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Button from 'react-bootstrap/Button';
// import image from "./images/Animalshelter.png";
// import Figure from "react-bootstrap/Figure";
// import swal from "sweetalert2"
// function SellerLogin(){
//     const dispatch=useDispatch()
//     const [user,setUser]=useState({
//         "userid":"",
//         "pwd":""
//     })
//     const [errors,setErrors]=useState({})
//     const [submitted,setSubmitted]=useState(false)
//     const history=useHistory()

//     const handleInput=(e)=>{
//         setUser({...user,[e.target.name]:e.target.value})
//     }

//     const handleSubmit=e=>{
//         e.preventDefault()
//         setErrors(loginvalidation(user))
//         setSubmitted(true)
//     }

//     useEffect(()=>{
//         console.log(errors)
//         if(Object.keys(errors).length===0 && submitted){
//             console.log(user)
//             axios.post("http://localhost:9090/api/sellers/validate",user)
//             .then(resp=>{
//                 let result=resp.data.data;
//                 console.log(resp.data.data)
//                 sessionStorage.setItem("userid",result.userid)
//                 sessionStorage.setItem("uname",result.name)
//                 sessionStorage.setItem("role","seller")
//                 sessionStorage.setItem("id",result.id)
//                 dispatch({type:'IsLoggedIn'})
//                 history.push("/sprofile")
//             })
//             .catch(error=>{
//                 console.log("Error",error);
//                 swal.fire({
//                     icon: "error",
//                     title: "Invalid Username and Password!",
//                     text: "",
//                 });
//             })
//         }
//     },)

//     return (
//         <div style={{ marginTop: "5%", marginBottom: "10%" }}>
//         <Container>
//           <Row className="my-4">
//             <Col className="" style={{ margin: "auto" }}>
//             <Figure>
//                   <Figure.Image
//                     width={400}
//                     height={400}
//                     alt="400x400"
//                     src={image}
//                   />
//                 </Figure>
//             </Col>
//             <Col className="py-4" style={{ borderLeft: "2px solid black" }}>
//               <Card style={{backgroundColor:"#DAF7E2"}}>
//                 <Card.Body>
//                   <Form method="post" onSubmit={handleSubmit}>
//                     <h3>Login</h3>
//                     <br />
//                     <Form.Group className="mb-3" md="4">
//                       <InputGroup hasValidation>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Email"
//                           name="userid"
//                           value={user.userid}
//                           onChange={handleInput}
//                           isInvalid={!!errors.userid}
//                         />
//                         <InputGroup.Text>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="currentColor"
//                             className="bi bi-envelope-fill"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
//                           </svg>
//                         </InputGroup.Text>
//                         <Form.Control.Feedback type="invalid">
//                           {errors.userid}
//                         </Form.Control.Feedback>
//                       </InputGroup>
//                     </Form.Group>
//                     <Form.Group className="mb-3" md="4">
//                       <InputGroup hasValidation>
//                         <Form.Control
//                           type="password"
//                           placeholder="Enter Password"
//                           name="pwd"
//                           value={user.pwd}
//                           onChange={handleInput}
//                           isInvalid={!!errors.pwd}
//                         />
//                         {/* {showpass ?
//                                                   <InputGroup.Text onClick={() => setShowpass(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
//                                                       <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
//                                                       <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
//                                                   </svg></InputGroup.Text>
//                                                   :
//                                                   <InputGroup.Text onClick={() => setShowpass(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
//                                                       <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
//                                                       <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
//                                                   </svg></InputGroup.Text>
//                                               } */}
//                         <Form.Control.Feedback type="invalid">
//                           {errors.pwd}
//                         </Form.Control.Feedback>
//                       </InputGroup>
//                     </Form.Group>
//                     <br />
//                     <Button variant="secondary" type="submit">
//                       Submit
//                     </Button>
//                   </Form>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//           <Row className="links">
//             <Col className="text-end" style={{ borderRight: "2px solid black" }}>
//               <a href="/register">Register Now</a>
//             </Col>
//             <Col>
//               <a href="/forgetpassword">Forgot Password ?</a>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
// }

// export default SellerLogin;
