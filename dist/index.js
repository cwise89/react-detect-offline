Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var useState = React.useState, useEffect = React.useEffect;
var Counter = function (_a) {
    var count = _a.count, className = _a.className;
    return (React.createElement("div", { className: "counter " + className },
        React.createElement("p", { key: count, className: "counter__count " + (className ? className + '__count' : '') }, count)));
};
var App = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b;
    var _c = useState(0), count = _c[0], setCount = _c[1];
    useEffect(function () {
        var interval = setInterval(function () {
            if (count > 99)
                return setCount(0);
            setCount(count + 1);
        }, 1000);
        return function () { return clearInterval(interval); };
    }, [count, setCount]);
    return React.createElement(Counter, { className: className, count: count });
};

exports.default = App;
//# sourceMappingURL=index.js.map
