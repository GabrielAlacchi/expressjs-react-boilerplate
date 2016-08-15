/**
 * Created by gabriel on 09/08/16.
 */

import React from "react";

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}