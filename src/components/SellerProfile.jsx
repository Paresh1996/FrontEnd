import axios from "axios"
import { useEffect, useState } from "react"
// import picturess from  "./images/Welcome-bro.png"
//import picturess from "./images/Welcome-bro.png";
function SellerProfile(){
    const id=sessionStorage.getItem("id")
    const [user,setUser]=useState({
        "id":sessionStorage.getItem("id"),
        "name":"",
        "city":"",
        "userid":"",
        "pwd":"",
        "phone":""
    })

    useEffect(()=>{
        axios.get("http://localhost:9090/api/users/"+id)
        .then(resp=>{
            console.log(resp.data.data)
            setUser(resp.data.data)
        })
    },)
    return (
        
        <div className="container flex-column mt-1" >
                 <div className="row">
                   <div className="col-3"></div>
        <div className="col-6 justify-content-center align-items-center">
          <div className="card shadow m-3 p-2  text-dark text-center align-items-center">
            {/* <div className="col-12 justify-content-center align-items-center">
              <img
                src={picturess}
                style={{ height: "200px", width: "300px" }}
                alt=""
              />
            </div> */}
            <h4
              className="p-2"
              style={{
                borderBottom: "2px solid green",
                width: "300px",
                margin: "auto",
              }}
            >
              Seller Profile Page
            </h4>
            <br />
            <h4>Welcome {user.name}</h4>
            <h5>City : {user.city}</h5>
            <h5>Email Id : {user.userid}</h5>
            <h5>Contact No : {user.phone}</h5>
          </div>
        </div>
        <div className="col-3"></div>
      </div>

        </div>
    )
}

export default SellerProfile;