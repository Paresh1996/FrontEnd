import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import productvalidation from "./productvalidation";
import swal from "sweetalert2";


function AddProduct(){
    const sellerid=sessionStorage.getItem("id")
    const [product,setProduct]=useState({
        "pname":"",
        "pcat":"",
        "price":"",
        "brand":"",
        "sellerId":sellerid
    })
    const [errors,setErrors]=useState({})
    const [selectedPhoto,setSelectedPhoto]=useState(null)
    const [submitted,setSubmitted]=useState(false)
    const history=useHistory()

    const handleInput=e=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleFileInput=e=>{
        setSelectedPhoto(e.target.files[0])
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(productvalidation(product))    
        setSubmitted(true)
    }

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            const formData=new FormData()
            formData.append("pic",selectedPhoto)
            formData.append("pname",product.pname)
            formData.append("pcat",product.pcat)
            formData.append("price",product.price)
            formData.append("brand",product.brand)
           // formData.append("sellerId",sellerid)
           formData.append("sellerId",sellerid)
            console.log(product)
            axios.post("http://localhost:9090/api/products",formData)
            .then(resp=>{
                let result=resp.data.data;
                console.log(result) 
                swal.fire({
                    icon: "Success",
                    title: "product added Succesfully!!",
                    text: "saved",
                  });              
                history.push("/myproducts")
            })
            .catch(error=>{
                console.log("Error",error);
                swal.fire("Error saving product")
            })            
        }
    },)
    return (
        <div className="container " >
        
                <div className="card shadow  text-dark mt-4" >
                    <div className="card-body" style={{backgroundColor:"#DAF7E2"}}>
                    <div className="row">
                        <div className="col-sm-6 mx-auto">
                            <h4 className="text-center p-2">
                                Add Product Form
                            </h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Product Name</label>
                                <div className="col-sm-8">
                                    <input type="text" name="pname" value={product.pname} onChange={handleInput} className="form-control" />
                                    {errors.pname && <small className="text-danger float-right">{errors.pname}</small>}
                                </div>
                                
                            </div>                            
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Category</label>
                                <div className="col-sm-8">
                                    <select name="pcat" value={product.pcat} onChange={handleInput} className="form-control">
                                        <option value="">Select Category</option>
                                        <option>FOOD</option>     
                                        <option>Treats and Chews</option>     
                                        <option>Health And Wellness</option>     
                                        <option>Accessories </option>     
                                        {/* <option>Washing Machines</option>     
                                        <option>Refrigerators</option>  
                                        <option>Audio</option> 
                                        <option>AC</option>  */}
                                    </select>   
                                    {errors.pcat && <small className="text-danger float-right">{errors.pcat}</small>}                    
                                </div>                        
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Price</label>
                                <div className="col-sm-8">
                                    <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" />
                                    {errors.price && <small className="text-danger float-right">{errors.price}</small>}
                                </div>                                
                            </div>
                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Brand</label>
                                <div className="col-sm-8">
                                    <select name="brand" value={product.brand} onChange={handleInput} className="form-control">
                                        <option value="">Select Brand</option>
                                        <option>Royal</option>
                                        <option>Padigree</option>
                                        <option>Whiskas</option>
                                        <option>Sheba</option>
                                        <option>Drools</option>
                                        <option>Chip-Chop</option>
                                        <option>Fur Buddies</option>
                                        <option>Trixie</option>
                                        <option>Acana</option>
                                        <option>Orijen</option>
                                        <option>Iams</option>
                                        <option>Himalaya</option>
                                        <option>Super Coat</option>
                                        <option>DogHolic</option>
                                        <option>Other</option>
                                    </select>
                                    {errors.brand && <small className="text-danger float-right">{errors.brand}</small>}
                                </div>                                
                            </div>

                            <div className="form-group form-row">
                                <label className="col-sm-4 form-control-label">Photo</label>
                                <div className="col-sm-8">
                                    <input type="file" required name="photo" value={product.photo} onChange={handleFileInput} className="form-control-file" />                                    
                                </div>                                
                            </div>
                            
                            <button className="btn float-right" style={{backgroundColor:"#6cba82"}}>Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
               
                </div>
    )
}

export default AddProduct;
