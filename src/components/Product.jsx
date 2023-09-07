function Product(props) {
  const { x, showModal } = props;
  return (
    <div className="box col-sm-3" key={x.prodid}>
      <div
        className="card text-center text-dark mb-3 "
        style={{ boxShadow: "0 0 3px 3px white" }}
      >
        <div className="card-header p-1 border-bottom border-dark">
          <h5>{x.pname}</h5>
        </div>
        <div className="card-body py-1">
          <img
            style={{ width: "90%", height: "250px", marginBottom: "10px" }}
            src={"http://localhost:9090/" + x.photo}
            className="img-thumnail"
          />
          <h6 className="float-left">Brand :{x.brand}</h6>
          <h6 className="float-right">Price: &#8377; {x.price}</h6>
        </div>
        <div className="card-footer p-1">
          <button
            onClick={(e) => showModal(x)}
            className="btn btn-sm"
            style={{ backgroundColor: "#6cba82" }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;

// function Product(props){
//     const {x,showModal}=props
//     return (
//         <>
//         <div className="box col-md-3" key={x.prodid}>
//         <div class="card">
//             <div class="card-side front">
//                 <div>
//                     <img style={{width:"90%",height:"250px",marginBottom:"10px"}} src={"http://localhost:9090/"+x.photo} className="img-thumnail" />
//                 </div>
//                 <div>
//                     <h6 className="float-right">Price: &#8377; {x.price}</h6>
//                 </div>
//             </div>
//             <div class="card-side back">
//                 <div className="card-header p-1 border-bottom border-dark">
//                     <h5>{x.pname}</h5>
//                 </div>
//                 <div>
//                     <h6 className="float-left">Brand :{x.brand}</h6>
//                 </div>
//                 <div className="buybtn">
//                      <button onClick={e=>showModal(x)} className="btn btn-lg" style={{backgroundColor:"#6cba82"}}>Buy Now</button>                   </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Product;
