import React from "react";

import Aux from "../Aux/Aux";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";

const Layout = props => {
  console.log("Layout Component Render");
  return (
    <Aux>
      <NavigationItems />
      {props.children}
    </Aux>
  );
};

export default Layout;
