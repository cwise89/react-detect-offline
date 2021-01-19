Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Online = ({ children }) => {
    useOnlineEffect(() => {
        console.log('FINGERS CROSSED');
    });
    const goOnline = () => {
        console.log('FIRED ONLINE!');
    };
    const goOffline = () => {
        console.log('FIRED OFFLINE!');
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
    goOffline();
    goOnline();
};

exports.Online = Online;
exports.useOnlineEffect = useOnlineEffect;
//# sourceMappingURL=index.js.map
