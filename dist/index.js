Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Online = function (_a) {
    var children = _a.children;
    var _b = React.useState(true), isOnline = _b[0], setisOnline = _b[1];
    setisOnline(true);
    return isOnline ? React__default['default'].createElement("div", null, children) : null;
};

exports.Online = Online;
//# sourceMappingURL=index.js.map
