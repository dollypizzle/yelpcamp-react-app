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

class newCampground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      image: "",
      description: "",
      redirect: false
    };
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handlePriceChange = event => {
    this.setState({
      price: event.target.value
    });
  };

  handleImageChange = event => {
    this.setState({
      image: event.target.value
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      description: this.state.description
    };
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post("https://yelpcamp-dollyp-api.herokuapp.com/campgrounds", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.setState({ redirect: true });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/campgrounds"} />;
    }

    if (!localStorage.getItem("token")) {
      return <Redirect to={"/campgrounds"} />;
    }

    return (
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center my-5 pb-5">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <p className="h4 text-center py-2">Add New Campground</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                  <br />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={this.state.price}
                    onChange={this.handlePriceChange}
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image"
                    value={this.state.image}
                    onChange={this.handleImageChange}
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
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

export default newCampground;
