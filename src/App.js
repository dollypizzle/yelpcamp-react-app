import React, { Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Campgrounds from "./components/Campgrounds/Campgrounds";
import Landing from "./components/Landing/Landing";
import Edit from "./components/Campgrounds/Edit/Edit";

const Login = React.lazy(() => {
  return import("./containers/Login/Login");
});

const Register = React.lazy(() => {
  return import("./containers/Register/Register");
});

const New = React.lazy(() => {
  return import("./containers/NewCampgrounds/New");
});

const Show = React.lazy(() => {
  return import("./components/Campgrounds/Show/Show");
});

function App(props) {
  const [isLoggedIn, setisLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setisLoggedIn(token !== null);
  });

  const logOut = () => {
    localStorage.clear();
    props.history.push("/campgrounds");
  };

  console.log("App Component Render");

  let routes = (
    <Switch>
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Route path="/register" render={props => <Register {...props} />} />
      <Route
        path="/campgrounds"
        exact
        render={props => <Campgrounds {...props} />}
      />
      <Route path="/campgrounds/new" render={props => <New {...props} />} />
      <Route
        path="/campgrounds/:id"
        exact
        render={props => <Edit {...props} />}
      />
      <Route
        path="/campgrounds/:id/show"
        exact
        render={props => <Show {...props} />}
      />
      <Route path="/" exact component={Landing} />
    </Switch>
  );

  return (
    <div>
      <Layout />
      <Suspense fallback={<p>Just a moment ...</p>}>{routes}</Suspense>
    </div>
  );
}

export default withRouter(App);
