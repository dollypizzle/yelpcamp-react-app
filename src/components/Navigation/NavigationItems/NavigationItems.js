import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class navigationItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      isOpen: false,
      authUser: null
    };
    this.logout = this.logout.bind(this);
  }

  // componentDidMount() {
  //   console.log("Navbar Mount");
  //   const token = localStorage.getItem("token");
  //   this.setState(() => ({ authUser: token !== null }));
  // }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/campgrounds");
  }

  render() {
    console.log("Navbar component");
    // if (this.state.redirect === true) {
    //   return <Redirect to={"/campgrounds"} />;
    // }

    const token = localStorage.getItem("token");

    return (
      <MDBNavbar
        dark
        expand="md"
        style={{ marginBottom: "20px", backgroundColor: "purple" }}
      >
        <MDBNavbarBrand>
          <MDBNavLink to="/">
            <strong className="white-text">Yelpcamp</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link" to="/campgrounds">
                  Campgrounds
                </Link>
              </li>

              {token !== null ? (
                <li className="nav-item" onClick={this.logout}>
                  <a className="nav-link">Logout</a>
                </li>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Sign In
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default withRouter(navigationItems);
