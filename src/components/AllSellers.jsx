import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AllSellers() {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/users/sellers").then((resp) => {
      //console.log(resp.data.data)
      setSellers(resp.data.data);
      console.log(sellers);
    });
  }, []);

  const deleteSeller = (id) => {
    let response = Swal.fire({
      title: "Are you sure to delete this seller?",
      //   text: "User will have Admin Privileges",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });

    // let response = window.confirm("Are you sure to delete this seller ?");
    if (response) {
      console.log(id);
      axios
        .delete("http://localhost:9090/api/users/sellers/" + id)
        .then((resp) => {
          axios.get("http://localhost:9090/api/users/sellers").then((resp) => {
            //console.log(resp.data.data)
            setSellers(resp.data.data);
          });
        });
    }
  };

  return (
    <div className="container-fluid text-white">
      <h4 className="p-2 text-center">All Sellers</h4>
      <table
        className="table table-bordered   table-hover"
        style={{ background: "#DAF7E2" }}
      >
        <thead className="#DAF7E2">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>User Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.phone}</td>
              <td>{x.userid}</td>
              <td>
                <button
                  onClick={(e) => deleteSeller(x.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllSellers;
