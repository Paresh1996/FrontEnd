import axios from "axios";
import { useState } from "react";
import swal from "sweetalert2";

function AdminProfile() {
  const userid = sessionStorage.getItem("userid");
  const uname = sessionStorage.getItem("uname");
  const [user, setUser] = useState({
    uname: uname,
    userid: userid,
    pwd: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9090/api/admin", user)
      .then((resp) => {
        console.log(resp);
        swal.fire("Profile updated successfully");
        sessionStorage.setItem("uname", user.uname);
      })
      .catch((error) => console.log("Error", error));
  };

  return (
    <div className="container-fluid">
      <h4 className="p-2 text-white text-center">Welcome {user.uname}</h4>
      <div className="row">
        <div className="col-sm-5 mx-auto">
          <div
            className="card shadow  text-black"
            style={{ backgroundColor: "#DAF7E2" }}
          >
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Email Id
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="userid"
                      readOnly
                      value={user.userid}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="uname"
                      value={user.uname}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      name="pwd"
                      value={user.pwd}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <button
                  className="btn  float-right"
                  style={{ backgroundColor: "#6cba82" }}
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
