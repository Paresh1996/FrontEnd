import React, { Component } from 'react';
import UserLoginAPI from "../../src/Service/UserLoginAPI.js";

class ResetPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pwd: '',
            confirmPassword: '',
            message
            : null
        }

        this.submit = this.submit.bind(this);
    }

    submit = e => {
        e.preventDefault();
        console.log(this.props.location.state.userid)
        console.log(this.state.pwd)
        if(this.state.pwd===this.state.confirmPassword){
            UserLoginAPI.resetPassword(this.props.location.state.userid,this.state.pwd)
            .then(response => {
                console.log(response.data);
                this.setState({message: "Password changed successfully!!!"});
                alert(this.state.message);
                this.props.history.push('/userLogin');
            })
            .catch(error =>  {
                alert("Password is same as previous password!!!");
                this.props.history.push('/userLogin');
            })
        }
        else{
            alert("Password mismatch!!!");
            this.props.history.push(
                {
                    pathname : '/reset-password',
                    state:{
                        userid:this.props.location.state.userid
                    }
                }
            );
        
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <>
                <h2 className="text-center mt-3 ">Reset Password</h2>
                <form className="container bg-dark pt-2 mt-3" style={{ width: "30vw" }}>
                    <div className="form-group">
                        <input type="password" className="form-control text-center mt-3" placeholder="New Password" name="pwd" value={this.state.pwd} onChange={this.onChange} required />
                    </div>
                    <div className="form-group my-3">
                        <input type="password" className="form-control text-center" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange} required />
                    </div>
                    <button className="btn btn-primary my-3 offset-5" onClick={this.submit}>SUBMIT</button>
                </form>
            </>
        )
    }
}

export default ResetPassword
