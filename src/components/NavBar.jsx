import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import image from "../components/images/the-pet-shop-logo.png";
import logo from "../components/images/the-pet-shop-logo.png";
import Figure from "react-bootstrap/Figure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";

const { Fragment } = require("react");
function NavBar() {
  const state = useSelector((state) => state);
  console.log("LoggedIn ", state.loggedin);
  console.log("Cart ", state.cart);
  return (
    <Fragment>
      <div className="clearfix"></div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white position-sticky"
        style={{ top: 0, zIndex: "1000" }}
      >
        <Link className="navbar-brand text-black" to="/">
          <Figure>
            <Figure.Image width={100} height={100} alt="100x100" src={image} />{" "}
          </Figure>{" "}
          <b
            style={{
              fontFamily: "Poppins",
              fontWeight: "800",
            }}
          ></b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* <li className="nav-item active">
                        <Link className="nav-link" to="/"style={{color:"#6cba82"}}><h3>Home</h3></Link>
                    </li> */}

            {/* <li className="nav-item active">
                        <Link className="nav-link" to="/qna" style={{color:"#6cba82"}}><h3>Q&A</h3></Link>
                    </li> */}
            <li className="nav-item active">
              <Link className="nav-link" to="/qna" style={{ color: "#6cba82" }}>
                <h4>
                  Feedback <FontAwesomeIcon icon={faCommentDots} /> |{" "}
                </h4>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link "
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <h4 style={{ color: "#6cba82" }}>
                  Categories <FontAwesomeIcon icon={faList} />
                </h4>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/cats?cat=FOOD">
                  FOOD
                </Link>
                <Link className="dropdown-item" to="/cats?cat=Treats and Chews">
                  Treats and Chews
                </Link>
                <Link
                  className="dropdown-item"
                  to="/cats?cat=Health And Wellness"
                >
                  Health And Wellness
                </Link>
                <Link className="dropdown-item" to="/cats?cat=Accessories">
                  Accessories
                </Link>
                <Link className="dropdown-item" to="/#">
                  ALL
                </Link>
              </div>
            </li>
          </ul>
          <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;
