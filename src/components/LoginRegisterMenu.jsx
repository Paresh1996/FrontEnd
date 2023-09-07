import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { FaSistrix } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import AllProduct from "./AllProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";

function LoginRegisterMenu() {
  const [query, setQuery] = useState("");
  const [inputText, setInput] = useState("");
  const [productlist, setproductlist] = useState([]);
  let text;
  const handleQuery = (e) => {
    setInput(e.target.value);
    //console.log(e.target.value);
    inputText = sessionStorage.setItem(e.target.value);
  };
  const ShowCategory = (e) => {
    // console.log("Search clicked" + e.target.value);
    console.log(inputText);
    axios
      .get(`http://localhost:9090/api/products/find/${inputText}`)
      .then((resp) => {
        console.log(resp.data);
        setproductlist(resp.data);
        // <AllProduct list={productlist}></AllProduct>
      });
  };
  return (
    <ul className="navbar-nav ml-auto">
      <li>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="input-group">
                {/* <input
                  class="form-control border-success py-2"
                  type="text"
                  onChange={handleQuery}
                  value={inputText}
                ></input> */}
                <div class="input-group-append">
                  {/* <button
                    class="btn"
                    style={{ backgroundColor: "#6cba82" }}
                    type="button"
                    // onChange={(e) => setQuery(e.target.value)}
                    // onChange={handleQuery}
                    onClick={ShowCategory}
                  >
                    <FaSistrix />
                    <i class="fa fa-search"></i>
                  </button> */}
                  {/* <ul>
                            {filterdItems.map((item) =>(
                            <h1
                                key={item.pname}>{item.pname}</h1>
                                ))}

                        </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <NavLink
        className="btn btn-link btn-lg btn-outline-light button1 text-uppercase text-decoration-none mx-2"
        to="/clogin"
        style={{ color: "#6cba82" }}
      >
        Log in <FontAwesomeIcon icon={faRightToBracket} beatFade />{" "}
      </NavLink>

      <NavLink
        className="btn btn-link btn-lg btn-outline-light button1 text-uppercase text-decoration-none mx-2"
        style={{ color: "#6cba82" }}
        to="/register"
      >
        Sign Up <FontAwesomeIcon icon={faUserPlus} beatFade />
      </NavLink>
      {/* {inputText!='' && <AllProduct list={productlist}></AllProduct>}  */}
    </ul>
  );
}

export default LoginRegisterMenu;
