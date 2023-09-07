import { useSelector } from "react-redux";
import image from "./images/logo1.PNG";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";

function Header() {
  const state = useSelector((state) => state);
  console.log("Header ", state.loggedin.Username);
  return (
    <div
      className="jumbotron p-1 mb-0 rounded-0  text-dark"
      style={{ backgroundColor: "#DAF7E2" }}
    >
      {/* <img src={'images.jfif'} style={{height:"50px",width:"100px"}} className="float-left"/> */}
      {state.loggedin.IsLoggedIn ? (
        <>
          {/* <h5 className="float-left">Role : {state.loggedin.Role}</h5> */}
          <h5 className="float-right">
            Welcome {state.loggedin.Username} !
          </h5>{" "}
        </>
      ) : (
        ""
      )}
      <h2
        className="text-center"
        style={{
          fontFamily: "Kanit",
        }}
      >
        Welcome to The Pet Shop
      </h2>
    </div>
  );
}

export default Header;
