import { Component, isValidElement, Children, createElement } from "react";
import PropTypes from "prop-types";

// these browsers don't fully support navigator.onLine, so we need to use a polling backup
const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;

const config = {
  poll: unsupportedUserAgentsPattern.test(navigator.userAgent),
  url: "https://ipv4.icanhazip.com/",
  timeout: 5000,
  interval: 5000
};

const ping = pollingUrl => {
  return new Promise(resolve => {
    const isOnline = () => resolve(true);
    const isOffline = () => resolve(false);

    const xhr = new XMLHttpRequest();

    xhr.onerror = isOffline;
    xhr.ontimeout = isOffline;
    xhr.onload = () => {
      const response = xhr.responseText.trim();
      if (!response) {
        isOffline();
      } else {
        isOnline();
      }
    };

    xhr.open("GET", pollingUrl);
    xhr.timeout = pollingUrl;
    xhr.send();
  });
};

const propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  pollingInterval: PropTypes.number,
  pollingUrl: PropTypes.string,
  wrapperType: PropTypes.string
};

const defaultProps = {
  pollingInterval: config.interval,
  pollingUrl: config.url,
  wrapperType: "span"
};

// base class that detects offline/online changes
class Base extends Component {
  constructor() {
    super();
    this.state = {
      online: typeof navigator.onLine === "boolean" ? navigator.onLine : true
    };
    // bind event handlers
    this.goOnline = this.goOnline.bind(this);
    this.goOffline = this.goOffline.bind(this);
  }

  componentDidMount() {
    window.addEventListener("online", this.goOnline);
    window.addEventListener("offline", this.goOffline);

    if (config.poll) {
      this.startPolling();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.goOnline);
    window.removeEventListener("offline", this.goOffline);

    if (config.poll) {
      this.stopPolling();
    }
  }

  renderChildren() {
    const { children, wrapperType } = this.props;

    // usual case: one child that is a react Element
    if (isValidElement(children)) {
      return children;
    }

    // no children
    if (!children) {
      return null;
    }

    // string children, multiple children, or something else
    return createElement(wrapperType, {}, ...Children.toArray(children));
  }

  goOnline() {
    if (!this.state.online) {
      this.callOnChangeHandler(true);
      this.setState({ online: true });
    }
  }

  goOffline() {
    if (this.state.online) {
      this.callOnChangeHandler(false);
      this.setState({ online: false });
    }
  }

  callOnChangeHandler(online) {
    if (this.props.onChange) {
      this.props.onChange(online);
    }
  }

  startPolling() {
    const { pollingInterval, pollingUrl } = this.props;

    if (pollingUrl) {
      this.pollingId = setInterval(() => {
        ping(pollingUrl).then(online => {
          online ? this.goOnline() : this.goOffline();
        });
      }, pollingInterval);
    }
  }

  stopPolling() {
    clearInterval(this.pollingId);
  }
}
Base.propTypes = propTypes;
Base.defaultProps = defaultProps;

export class Online extends Base {
  render() {
    return this.state.online ? this.renderChildren() : null;
  }
}
Online.propTypes = propTypes;
Online.defaultProps = defaultProps;

export class Offline extends Base {
  render() {
    return !this.state.online ? this.renderChildren() : null;
  }
}
Offline.propTypes = propTypes;
Offline.defaultProps = defaultProps;

export class Detector extends Base {
  render() {
    return this.props.render({ online: this.state.online });
  }
}
Detector.propTypes = Object.assign({}, propTypes, {
  render: PropTypes.func.isRequired
});
Detector.defaultProps = defaultProps;
