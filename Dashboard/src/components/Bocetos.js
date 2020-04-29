import React from "react";

import Categoria from "./Categoria";


export default class Boceto extends React.Component {
    constructor() {
      super();
      this.state = {
        title: "Welcome",
      };
    }
  
    changeTitle(title) {
      this.setState({title});
    }
  
    render() {
      return (
        <div>
          <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
          <Footer />
        </div>
      );
    }
  }