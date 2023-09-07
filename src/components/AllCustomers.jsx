import axios from "axios";
import { useEffect, useState } from "react";

function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/users/customers").then((resp) => {
      setCustomers(resp.data.data);
      console.log(customers);
    });
  }, []);

  return (
    <div className="container-fluid">
      <h4 className="text-white p-2 text-center">All Customers</h4>
      <table
        className="table table-bordered  table-hover"
        style={{ background: "#DAF7E2" }}
      >
        <thead className="#DAF7E2">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>User Id</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((x) => (
            <tr key={x.id}>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.gender}</td>
              <td>{x.phone}</td>
              <td>{x.userid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCustomers;
