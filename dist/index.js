Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Online = ({ children }) => {
    useOnlineEffect(online => {
        console.log('FINGERS CROSSED: ', online);
    }, {
        enabled: true,
        timeout: 1000,
        interval: 1000,
    });
    return  React__default['default'].createElement("div", null, children) ;
};
// TODO: add polling default props.
// TODO: add polling implementation.
// TODO: start useOnline hook.
const needsPolling = navigator => {
    // these browsers don't fully support navigator.onLine, so we need to use a polling backup
    const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;
    if (typeof navigator !== 'undefined' &&
        unsupportedUserAgentsPattern.test(navigator.userAgent)) {
        return true;
    }
    return false;
};
const ping = ({ url, timeout }) => {
    return new Promise(resolve => {
        const isOnline = () => resolve(true);
        const isOffline = () => resolve(false);
        const xhr = new XMLHttpRequest();
        xhr.onerror = isOffline;
        xhr.ontimeout = isOffline;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.HEADERS_RECEIVED) {
                if (xhr.status) {
                    isOnline();
                }
                else {
                    isOffline();
                }
            }
        };
        xhr.open('HEAD', url);
        xhr.timeout = timeout;
        xhr.send();
    });
};
const getPollingConfigs = (pollingConfig, needsPolling) => {
    const defaultConfig = {
        enabled: true,
        url: 'https://ipv4.icanhazip.com/',
        timeout: 5000,
        interval: 5000,
    };
    console.log('getPollingConfig- needsPolling: ', needsPolling);
    console.log('typeof pollingConfig: ', pollingConfig, typeof pollingConfig === 'object');
    if (needsPolling === true && typeof pollingConfig === 'object') {
        return { ...defaultConfig, ...pollingConfig };
    }
    else if (pollingConfig === true) {
        console.log('FIRED', { ...defaultConfig });
        return { ...defaultConfig };
    }
    else {
        return { enabled: false };
    }
};
const useOnlineEffect = (callback, pollingOptions = {}) => {
    const goOnline = () => {
        callback(true);
    };
    const goOffline = () => {
        callback(false);
    };
    const mustPoll = needsPolling(navigator);
    const { enabled, ...pingConfig } = getPollingConfigs(pollingOptions, mustPoll);
    React.useEffect(() => {
        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
        let intervalId;
        console.log('IF- mustPoll: ', mustPoll);
        console.log('IF- enabled: ', enabled);
        console.log('IF- pingConfig: ', 'url' in pingConfig);
        if ((mustPoll || enabled) && 'url' in pingConfig) {
            const { url, timeout, interval } = pingConfig;
            console.log('FIRED SET INTERVAL', pingConfig);
            setInterval(() => {
                ping({
                    url,
                    timeout,
                }).then(online => (online ? goOnline() : goOffline()));
            }, interval);
        }
        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
            if (mustPoll || enabled) {
                clearInterval(intervalId);
            }
        };
    }, []);
};

exports.Online = Online;
exports.needsPolling = needsPolling;
exports.ping = ping;
exports.useOnlineEffect = useOnlineEffect;
//# sourceMappingURL=index.js.map
