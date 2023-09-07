import React, { Component } from 'react';
import UserLoginAPI from "../../src/Service/UserLoginAPI.js";
// import ReactModuleLoader from 'react-module-loader';
import swal from "sweetalert2";
class EmailForForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            userid: '',
            token: '',
            message: null
        }

        this.submit = this.submit.bind(this);
    }

    submit = e => {
        e.preventDefault();

        this.setState({ loading: true });

        //Faking API call here
        setTimeout(() => {
            this.setState({ loading: false });
        }, 13000);

        UserLoginAPI.generateToken(this.state.userid)
            .then(response => {
                this.setState({
                    token: response.data,
                    message: "Token received"
                })
                swal.fire("Token has been sent to registered email!!!")
                this.props.history.push({

                    pathname: '/enter-token',
                    state: {
                        userid: this.state.userid,
                        token: this.state.token
                    }
                });
            })
            .catch(error => {
                console.error("in err ", error.response.data);
                swal.fire("Invalid Email");
                this.props.history.push('#');
            })

    }

    validateEmail() {
        let email = document.getElementById("email1").value;
        let emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(email) === true || email == '') {
            return true;
        }
        else {
            document.getElementById("emailVR").innerHTML = "Email format should be abc@xyz.com"
            return false;
        }
    }

    removeAlert() {
        document.getElementById("emailVR").innerHTML = "";

    }

    onChange = e => this.setState({ userid: e.target.value });

    render() {
        return (
            <>
                <h2 className="text-center mt-5 mb-3">Forgot Password?</h2>
                <form className="container bg-dark pt-2" style={{ width: "30vw" }}>
                    <div className="form-group">
                        <input type="email" id="email1" className="form-control text-center mt-3" placeholder="Enter Registered Email"  name="userid" value={this.state.userid} onChange={this.onChange} onBlur={this.validateEmail} onFocus={this.removeAlert} required /><span id="emailVR" style={{ color: "red" }}></span>
                    </div>
                    <button className="btn btn-primary my-3 offset-5" onClick={this.submit}>
                        {this.state.loading && (
                            <i
                                className="fas fa-spinner"
                                style={{ marginRight: "5px" }}
                            />
                        )}
                        {this.state.loading && <span>Submitting</span>}
                        {!this.state.loading && <span>Submit</span>}

                    </button>
                </form>
            </>
        )
    }
}

export default EmailForForgotPassword