import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

function MyProducts(){
    const sellerid=sessionStorage.getItem("id");
    const [products,setProducts]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:9090/api/products?sellerid="+sellerid)
        .then(resp=>{
            console.log(resp.data)
            setProducts(resp.data.data)
            console.log(products)
        })
    },[])

    const deleteProduct = (prodid)=>{
      let resp = swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          });
        if(resp){
            axios.delete("http://localhost:9090/api/products/"+prodid)
                    if (resp.isConfirmed) {
                      swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
                
            
                axios.get("http://localhost:9090/api/products?sellerid="+sellerid)
                .then(resp=>{
                    console.log(resp.data)
                    setProducts(resp.data.data)
                    console.log(products)
                })
                        
        }
    }
    
    return (
        <div className="container">
            <div className="card shadow  text-dark mt-5" style={{backgroundColor:"#DAF7E2"}}>
                <div className="card-body">                    
            <h4>My Products</h4>
            <table className="table table-bordered-dark table-light"style={{backgroundColor:"#DAF7E2"}}>
                <thead className="table-light"style={{backgroundColor:"#DAF7E2"}}>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand Name</th>
                        <th>Price</th>
                        <th>Action</th>                                
                    </tr>
                </thead>
                <tbody>
                {products.map(x=>(
                    <tr key={x.prodid}>
                        <td><img width="100" src={"http://localhost:9090/"+x.photo} className="img-thumnail" />{x.pname}</td>
                        <td>{x.pcat}</td>
                        <td>{x.brand}</td>
                        <td>{x.price}</td>
                        <td>
                            <Link to={"/edit/"+x.prodid} className="btn btn-sm mr-2" style={{backgroundColor:"#6cba82"}}>Edit</Link>
                            <button onClick={()=>deleteProduct(x.prodid)} className="btn btn-danger btn-sm">Delete</button>
                        </td>                                
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
        </div>
            </div>
    )
}

export default MyProducts;