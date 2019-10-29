import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Body from "./Body/Body";

class Campgrounds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campground: null
      // redirect: false
    };
  }

  componentDidMount() {
    axios
      .get("https://yelpcamp-dollyp-api.herokuapp.com/campgrounds")
      .then(response => {
        console.log(response.data);
        this.setState({ campground: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    return (
      this.state.campground &&
      this.state.campground.map(function(object, i) {
        return <Body obj={object} key={i} />;
      })
    );
  }

  render() {
    const token = localStorage.getItem("token");
    if (!token) {
      return (
        <div className="container">
          <header className="jumbotron">
            <div className="container">
              <h1>Welcome To YelpCamp</h1>
              <p>View our hand picked campgrounds from all over the world</p>
              <p behavior="alternate">
                To Add New Campground, Kindly Login or Register
              </p>
            </div>
          </header>

          <div
            className="row text-center"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {this.tabRow()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <header className="jumbotron">
            <div className="container">
              <h1>Welcome To YelpCamp</h1>
              <p>View our hand picked campgrounds from all over the world</p>
              <p>
                <Link className="btn btn-purple btn-lg" to="/campgrounds/new">
                  Add New Campground
                </Link>
              </p>
            </div>
          </header>

          <div
            className="row text-center"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {this.tabRow()}
          </div>
        </div>
      );
    }
  }
}

export default Campgrounds;
