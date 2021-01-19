Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Online = ({ children }) => {
    console.log('FIRED');
    useOnlineEffect(() => {
        console.log('FINGERS CROSSED');
    });
    return  React__default['default'].createElement("div", null, children) ;
};
const useOnlineEffect = callback => {
    const goOnline = () => {
        console.log('FIRED ONLINE!');
        callback();
    };
    const goOffline = () => {
        console.log('FIRED OFFLINE!');
        callback();
    };
    React.useEffect(() => {
        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
        // if (polling) startPolling();
        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
            // stopPolling();
        };
    }, []);
};

exports.Online = Online;
exports.useOnlineEffect = useOnlineEffect;
//# sourceMappingURL=index.js.map
