/* In the Name of Allah */

import React from "react";

const withLang = children => Component => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: document.body.lang,
      data: typeof children === "object"
        ? children
        : {}
    };
    this.handleLanguage.bind(this);
    this.addData.bind(this);
    this.listener = e => {
      this.handleLanguage(e.detail);
      if (typeof children === "function") 
        children(e.detail, this.addData(e.detail));
    };
    this.determinator = ({children, till}) => {
      if (typeof children === "string") 
        return children;
      else if (typeof children !== "object") 
        throw new TypeError('MultiLang: Expected an object or a string but recieved ' + typeof children);
      
      return children[this.state.lang] || till || null;
    };
  }

  addData(lang) {
    return content => {
    this.setState(state => ({
      data: {
        ...state.data,
        [lang]: content
      }
    }));
  }}

  handleLanguage(lang) {
    this.setState({lang});
  }

  componentWillMount() {
    document.addEventListener("language", this.listener);
  }

  componentWillMount() {
    document.removeEventListener("language", this.listener);
  }

  render() {
    if (typeof children !== "object" && typeof children !== "function") 
      throw new TypeError('MultiLang: Expected an object or a function but recieved ' + typeof children);
    return <Component lang={this.state.lang} langProps={this.state.data[this.state.lang] || {}} determinator={this.determinator} {...this.props}/>;
  };
};

export default withLang;