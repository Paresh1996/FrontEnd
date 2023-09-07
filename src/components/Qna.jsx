import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import swal from "sweetalert2";
import QnaCard from "./QnaCard";

function Qna() {
  const [question, setquestions] = useState([]);
  let [que, setQue] = useState("");
  let userid = sessionStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:9090/getAllQuestions`)

      .then((response) => {
        setquestions(response.data);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    let Question = {
      question: que,
      user: { id: userid },
    };
    if (userid === null) {
      swal.fire({
        icon: "error",
        title: "please Login before posting here!",
        text: "",
      });
    } else {
      axios
        .post(`http://localhost:9090/postQuestion`, Question)
        .then((response) => {
          console.log(response.data);

          setquestions([response.data, ...question]);
        });
    }
  };

  return (
    <div class=" row justify-content-md-center ">
      <hr />
      <div class="col-md-8">
        <h3 className="align-middle" style={{ color: "#6cba82" }}>
          Share Some Stories
        </h3>
        <Form onSubmit={(e) => submit(e)}>
          <Form.Group className="md-3 shadow">
            <Form.Control
              as="textarea"
              id="que"
              placeholder="Write here...."
              rows={2}
              value={que}
              name="question"
              onChange={(e) => setQue(e.target.value)}
            />
            <div class="invalid-feedback fs-6 fw-bold">{que}</div>
          </Form.Group>

          <span>
            <div className="d-flex justify-content-start mt-3">
              <button
                class="btn"
                style={{ backgroundColor: "#6cba82" }}
                type="submit"
              >
                Post Here
              </button>
            </div>
          </span>

          <div className="mt-2">
            {/* {question?.map((item) => (
            //   <p>
            //     <h6>{item?.user?.name}</h6>
            //     {/* <h6>Username:-{sessionStorage.getItem("uname")}</h6> */}
            {/* //     {item?.question}
            //   </p> */}
            {/* <QnaCard data={item}></QnaCard> */}
            {question.length > 0
              ? question.map((item) => (
                  <QnaCard key={item.queId} Details={item} />
                ))
              : "You Have Not Posted Any Jobs Yet.."}
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Qna;
