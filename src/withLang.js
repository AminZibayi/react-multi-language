/* In the Name of Allah */

import React from "react";

const withLang = determinator => Component => class extends React.Component {
  state = {
    lang: document.body.lang,
    data: typeof determinator === "object"
      ? determinator
      : {}
  };

  addData = lang => content => {
    this.setState(state => ({
      data: {
        ...state.data,
        [lang]: content
      }
    }));
  }

  handleLanguage = lang => {
    this.setState({lang});
  }

  componentWillMount() {
    document.addEventListener("language", e => {
      this.handleLanguage(e.detail);
    });
    if (typeof determinator === "function") 
      document.addEventListener("language", e => {
        determinator(e.detail, this.addData(e.detail));
      })
  }

  render() {
    if (typeof determinator !== "object" && typeof determinator !== "function") 
      throw new TypeError('MultiLang: Excepted an object or a function or a string but recieved ' + typeof determinator);
    return <Component lang={this.state.lang} langProps={this.state.data[this.state.lang] || {}}/>;
  };
};

export default withLang;