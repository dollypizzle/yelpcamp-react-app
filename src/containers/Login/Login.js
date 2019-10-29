import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("https://yelpcamp-dollyp-api.herokuapp.com/login", data)
      .then(response => {
        console.log(response);
        if (response.data) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.setState(() => ({ redirect: true }));
        } else {
          console.log("Login Error");
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={"/campgrounds"} />;
    }

    return (
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center my-5 pb-5">
          <MDBCol sm="12" md="8" lg="6">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <p className="h4 text-center py-2">Login</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    required
                  />
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    required
                  />
                  <div className="text-center py-4 mt-3">
                    <MDBBtn className="btn btn-outline-purple" type="submit">
                      Submit
                      <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Login;
