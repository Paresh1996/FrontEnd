import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert2";
function CustomerProfile() {
  const [uname, setUname] = useState(sessionStorage.getItem("uname"));
  const userid = sessionStorage.getItem("userid");
  const id = sessionStorage.getItem("id");

  const [user, setUser] = useState({
    id: sessionStorage.getItem("id"),
    name: "",
    city: "",
    userid: "",
    pwd: "",
    phone: "",
    gender: "",
    role: "",
  });

  useEffect(() => {
    axios.get("http://localhost:9090/api/users/" + id).then((resp) => {
      console.log(resp.data.data);
      setUser(resp.data.data);
    });
  }, []);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:9090/api/users/" + id, user).then((resp) => {
      swal.fire("Profile updated successfully");
      setUname(user.name);
    });
  };

  return (
    <div className="container text-dark">
      <div className="row">
        <div className="col-sm-7 mx-auto">
          <div
            className="card shadow  mt-3"
            style={{ backgroundColor: "#DAF7E2" }}
          >
            <div className="card-body">
              <h4 className="p-2 text-center">Welcome {uname}</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Customer Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">City</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="city"
                      value={user.city}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Gender</label>
                  <div className="col-sm-8">
                    <select
                      required
                      name="gender"
                      value={user.gender}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Email Id
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      readOnly
                      name="userid"
                      value={user.userid}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Phone</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      maxLength="10"
                      name="phone"
                      value={user.phone}
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
                      readOnly
                      //   name="password"
                    />
                  </div>
                </div>
                <button
                  className="btn float-right"
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

export default CustomerProfile;
