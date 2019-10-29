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

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      price: "",
      image: "",
      description: "",
      redirect: false
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://yelpcamp-dollyp-api.herokuapp.com/campgrounds/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
          description: response.data.description
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      description: this.state.description
    };
    const token = localStorage.getItem("token");
    axios
      .patch(
        "https://yelpcamp-dollyp-api.herokuapp.com/campgrounds/" +
          this.props.match.params.id,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() =>
        this.props.history.push(
          "/campgrounds/" + this.props.match.params.id + "/show"
        )
      );
    // this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/campgrounds" />;
    }

    return (
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center my-5 pb-5">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <p className="h4 text-center py-2">Edit {this.state.name}</p>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={this.state.price}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      value={this.state.image}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </div>
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
