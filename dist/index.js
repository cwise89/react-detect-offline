'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Offline = exports.Online = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// base class that detects offline/online changes
var Base = function (_Component) {
  _inherits(Base, _Component);

  function Base() {
    _classCallCheck(this, Base);

    var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this));

    _this.state = {
      online: navigator.onLine
    };
    // bind event handlers
    _this.goOnline = _this.goOnline.bind(_this);
    _this.goOffline = _this.goOffline.bind(_this);
    return _this;
  }

  _createClass(Base, [{
    key: 'renderChildren',
    value: function renderChildren() {
      var children = this.props.children;
      var wrapperType = this.props.wrapperType;

      // usual case: one child that is a react Element

      if (_react2.default.isValidElement(children)) {
        return children;
      }

      // no children
      if (!children) {
        return null;
      }

      // string children, multiple children, or something else
      var childrenArray = _react.Children.toArray(children);
      var firstChild = childrenArray[0];
      // use wrapperType if specified
      if (!wrapperType) {
        if (typeof firstChild === 'string' || firstChild.type === 'span') {
          // use span for string or span children
          wrapperType = 'span';
        } else {
          // fallback on div
          wrapperType = 'div';
        }
      }
      return _react.createElement.apply(undefined, [wrapperType, {}].concat(_toConsumableArray(childrenArray)));
    }
  }, {
    key: 'goOnline',
    value: function goOnline() {
      this.setState({ online: true });
    }
  }, {
    key: 'goOffline',
    value: function goOffline() {
      this.setState({ online: false });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('online', this.goOnline);
      window.addEventListener('offline', this.goOffline);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('online', this.goOnline);
      window.removeEventListener('offline', this.goOffline);
    }
  }]);

  return Base;
}(_react.Component);

var Online = exports.Online = function (_Base) {
  _inherits(Online, _Base);

  function Online() {
    _classCallCheck(this, Online);

    return _possibleConstructorReturn(this, (Online.__proto__ || Object.getPrototypeOf(Online)).apply(this, arguments));
  }

  _createClass(Online, [{
    key: 'render',
    value: function render() {
      return this.state.online ? this.renderChildren() : null;
    }
  }]);

  return Online;
}(Base);

var Offline = exports.Offline = function (_Base2) {
  _inherits(Offline, _Base2);

  function Offline() {
    _classCallCheck(this, Offline);

    return _possibleConstructorReturn(this, (Offline.__proto__ || Object.getPrototypeOf(Offline)).apply(this, arguments));
  }

  _createClass(Offline, [{
    key: 'render',
    value: function render() {
      return !this.state.online ? this.renderChildren() : null;
    }
  }]);

  return Offline;
}(Base);