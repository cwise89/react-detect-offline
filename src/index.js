import React, { Component } from "react";
import PropTypes from "prop-types";

// base class that detects offline/online changes
class Base extends Component {
  constructor() {
    super();
    this.state = {
      online: navigator.onLine,
    };
    // bind event handlers
    this.goOnline = this.goOnline.bind(this);
    this.goOffline = this.goOffline.bind(this);
    this.handleDebugKeydown = this.handleDebugKeydown.bind(this);
  }
  goOnline() {
    this.setState({ online: true });
  }
  goOffline() {
    this.setState({ online: false });
  }
  handleDebugKeydown({ keyCode, shiftKey, metaKey }) {
    if (keyCode === 48 && shiftKey && metaKey) {
      this.setState({ online: !this.state.online });
    }
  }
  componentDidMount() {
    window.addEventListener('online', this.goOnline);
    window.addEventListener('offline', this.goOffline);

    if (parseInt(window.location.port) >= 1024) {
      window.addEventListener('keydown', this.handleDebugKeydown);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('online', this.goOnline);
    window.removeEventListener('offline', this.goOffline);
    window.removeEventListener('keydown', this.handleDebugKeydown);
  }
}

Base.propTypes = {
  children: PropTypes.element.isRequired
};

export class Online extends Base {
  render() {
    return this.state.online && this.props.children;
  }
}

export class Offline extends Base {
  render() {
    return !this.state.online && this.props.children;
  }
}
