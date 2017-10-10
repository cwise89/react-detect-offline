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
  }
  goOnline() {
		this.callOnChangeHandler(true);
    this.setState({ online: true });
  }
  goOffline() {
		this.callOnChangeHandler(false);
    this.setState({ online: false });
  }
	callOnChangeHandler(online) {
		if (this.props.onChange) {
			this.props.onChange(online);
		}
	}
  componentDidMount() {
    window.addEventListener('online', this.goOnline);
    window.addEventListener('offline', this.goOffline);
  }
  componentWillUnmount() {
    window.removeEventListener('online', this.goOnline);
    window.removeEventListener('offline', this.goOffline);
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

export class Detector extends Base {
  render() {
    return this.props.render({ online: this.state.online });
  }
}
