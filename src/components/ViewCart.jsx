import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function ViewCart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState({
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  let payment1 = {
    cardno: "",
    nameoncard: sessionStorage.getItem("uname"),
    cvv: "123",
    amount: state.cart.reduce((a, item) => a + item.qty * item.price, 0),
  };
  const [payment, setPayment] = useState({
    // cardno: "132131",
    // nameoncard: "Test",
    // cvv: "",
    amount: state.cart.reduce((a, item) => a + item.qty * item.price, 0),
  });
  // const [payments, setPayments] = useState({});
  const deleteItem = (item) => {
    let resp = window.confirm("Are you sure to delete this item ?");
    if (resp) {
      dispatch({ type: "RemoveItem", payload: item });
      let amount = state.cart.reduce((a, item) => a + item.qty * item.price, 0);
      console.log("Amount ", amount);
    }
  };
  const handleAddressInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // const handlePaymentInput = (e) => {
  //   setPayment({ ...payment, [e.target.name]: e.target.value });
  // };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    let amount = state.cart.reduce((a, item) => a + item.qty * item.price, 0);
    setPayment({ ...payment, amount: amount });
    console.log("Amount => ", amount);
  }, [state.cart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setSubmitted(true)
    console.log("/*/*//**/*/*/*/*/*/*/*/*/*");
  };

  const persist = async (id) => {
    console.log(id + "-*-*-*-*-*-*-*-*-*-*-*-*");
    let amount = state.cart.reduce((a, item) => a + item.qty * item.price, 0);
    console.log("Amount ", payment.amount);
    // console.log(payment)
    // setPayment({ ...payment, amount: amount });
    // await setPayment({ ...payment, cardno:id  });
    payment1.cardno = id;

    console.log(payment);
    // setPayments(payment=>{...payment,'cardno':id});
    // setPayment(payment=>({payment:{...payment.payment, cardno:cid}}));

    let data = {
      cart: state.cart,
      payment: payment1,
      address: address,
      customerid: sessionStorage.getItem("id"),
    };
    console.log(data);
    axios.post("http://localhost:9090/api/orders", data).then((resp) => {
      console.log(resp);
      dispatch({ type: "Clear" });
      // history.push("/myorders");
    });
  };

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript;
    if (!res) {
      alert("you are offline !!!");
    }

    axios
      .post("http://localhost:9090/api/orders/create_order", {
        amount: payment.amount,
        info: "order_request",
        customerid: sessionStorage.getItem("id"),
      })
      .then((resp) => {
        console.log(resp);

        const options = {
          key: "rzp_test_IDGo0fRhePWaG8", // Enter the Key ID generated from the Dashboard
          amount: resp.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "The Pet Shop",
          description: "Test Transaction",
          order_id: resp.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            //  setPayment({...payment, cardno:response.razorpay_payment_id})
            // handleSubmit();
            console.log(resp.data.id + "49494949449494949494949494949494");
            persist(resp.data.id);
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
            console.log("Payment successful !!");
            //alert("congrates!! Payment successful !!");
            Swal.fire(
              "Good job!",
              "Congrates!! Payment successful !!",
              "success"
            );
            history.push("/myorders");
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: "The Pet Shop",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((error) => {
        Swal.fire("Failed!", "Oops!! Payment Failed", "error");
        console.log("helloo");
        console.log(error);
      });
  };

  return (
    <div className="container-fluid text-center text-dark">
      {state.cart.length > 0 ? (
        <div className="row">
          <div className="col-sm-7">
            <h4 className="p-2">Cart View</h4>
            <table
              className="table table-bordered  "
              style={{ backgroundColor: "#DAF7E2" }}
            >
              <thead>
                <tr>
                  <th>Prodid</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.map((item) => (
                  <tr key={item.prodid}>
                    <td>{item.prodid}</td>
                    <td>
                      <img
                        className="mr-2 float-left"
                        src={"http://localhost:9090/" + item.photo}
                        width="100"
                      />
                      {item.pname}
                    </td>
                    <td>&#8377; {item.price}</td>
                    <td>{item.qty}</td>
                    <td>&#8377; {item.qty * item.price}</td>
                    {/* var amt=item.qty*item.price; */}
                    <td>
                      <button
                        onClick={(e) => deleteItem(item)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="4">Total Amount</th>
                  <th>
                    &#8377;{" "}
                    {state.cart.reduce(
                      (a, item) => a + item.qty * item.price,
                      0
                    )}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="col-sm-4 text-dark">
            <form onSubmit={handleSubmit}>
              <h5 className="p-2">Address Information</h5>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">City</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="city"
                    required
                    value={address.city}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">State</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="state"
                    required
                    value={address.state}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Zip</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="zip"
                    required
                    value={address.zip}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Country</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="country"
                    required
                    value={address.country}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>

              <h5 className="p-2">Payment Information</h5>
              {/* <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Card No</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="cardno"
                    value={payment.cardno}
                    onChange={handlePaymentInput}
                    className="form-control"
                    maxLength="16"
                  />
                </div>
              </div> */}
              {/* <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Name on Card
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="nameoncard"
                    value={payment.nameoncard}
                    onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div> */}
              {/* <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Expiry Date
                </label>
                <div className="col-sm-8">
                  <input type="month" required className="form-control" />
                </div>
              </div> */}
              {/* <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">CVV</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    maxLength="3"
                    value={payment.cvv}
                    onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div> */}
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Billed Amount
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    maxLength="3"
                    readOnly
                    value={payment.amount}
                    // onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div>
              <button
                id="payment-btn"
                className="btn float-right"
                style={{ backgroundColor: "#6cba82" }}
                onClick={displayRazorpay}
              >
                Place Order
              </button>
            </form>
            {/* <h1>{&&payment}</h1> */}
          </div>
        </div>
      ) : (
        <h1>Cart is Empty</h1>
      )}
    </div>
  );
}

export default ViewCart;
