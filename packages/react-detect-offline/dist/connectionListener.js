"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ping({ url, timeout, method }) {
    return new Promise((resolve) => {
        const isOnline = () => resolve(true);
        const isOffline = () => resolve(false);
        const xhr = new XMLHttpRequest();
        xhr.onerror = isOffline;
        xhr.ontimeout = isOffline;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.HEADERS_RECEIVED) {
                if (xhr.status >= 200) {
                    isOnline();
                }
                else {
                    isOffline();
                }
            }
        };
        xhr.open(method, url);
        xhr.timeout = timeout;
        xhr.send();
    });
}
exports.ping = ping;
function register({ browserEventsEnabled = true, pollingInterval = 1000, pollingTimeout = 1000, pollingEnabled = false, pollingURL = "https://www.google.com", pollingMethod = "HEAD" }, callback) {
    let state = true;
    const changeOnlineState = (newState) => {
        if (newState !== state) {
            state = newState;
            callback(state);
        }
    };
    const isOnline = () => changeOnlineState(true);
    const isOffline = () => changeOnlineState(false);
    if (browserEventsEnabled) {
        window.addEventListener("online", isOnline);
        window.addEventListener("offline", isOffline);
    }
    let intervalId = 0;
    if (pollingEnabled) {
        intervalId = window.setInterval(() => ping({
            timeout: pollingTimeout,
            url: pollingURL,
            method: pollingMethod
        }).then(pingOnline => changeOnlineState(pingOnline)), pollingInterval);
    }
    return function unregister() {
        if (browserEventsEnabled) {
            window.removeEventListener("online", isOnline);
            window.removeEventListener("offline", isOffline);
        }
        if (pollingEnabled) {
            window.clearInterval(intervalId);
        }
    };
}
exports.default = register;
