import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "../components/layout";

const HomeLayout = ({ children, navbar, props }) => (
  <React.Fragment>
    <main className="home-layout">
      {/* {!leftbar && <Leftbar />} */}
      <div className="content-wrapper">
        {!navbar && <Navbar />}
        {children}
      </div>
    </main>
  </React.Fragment>
);

HomeLayout.propTypes = {
  navbar: PropTypes.bool,
  leftbar: PropTypes.bool
};

HomeLayout.defaultProps = {
  navbar: false,
  leftbar: false
};

export default HomeLayout;