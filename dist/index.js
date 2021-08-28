Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var needsPolling = function (navigator) {
    // these browsers don't fully support navigator.onLine, so we need to use a polling backup
    var unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;
    if (typeof navigator !== 'undefined' &&
        unsupportedUserAgentsPattern.test(navigator.userAgent)) {
        return true;
    }
    return false;
};
var ping = function (_a) {
    var url = _a.url, timeout = _a.timeout;
    return new Promise(function (resolve, reject) {
        var isOnline = function () { return resolve(); };
        var isOffline = function () { return reject(); };
        var xhr = new XMLHttpRequest();
        xhr.onerror = isOffline;
        xhr.ontimeout = isOffline;
        xhr.onreadystatechange = function () {
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
var getPollingConfigs = function (pollingConfig, needsPolling) {
    var defaultConfig = {
        enabled: true,
        url: 'https://ipv4.icanhazip.com/',
        timeout: 5000,
        interval: 5000,
    };
    if ((typeof pollingConfig === 'object' && pollingConfig.enabled === true) ||
        (needsPolling === true && typeof pollingConfig === 'object')) {
        return __assign(__assign({}, defaultConfig), pollingConfig);
    }
    else if (pollingConfig === true || needsPolling) {
        return __assign({}, defaultConfig);
    }
    else {
        return { enabled: false };
    }
};
var useOnlineEffect = function (callback, pollingOptions) {
    if (pollingOptions === void 0) { pollingOptions = {}; }
    var goOnline = function () {
        callback(true);
    };
    var goOffline = function () {
        callback(false);
    };
    // does the browser support navigator.onLine CORRECTLY?
    var mustPoll = needsPolling(navigator);
    var _a = getPollingConfigs(pollingOptions, mustPoll), enabled = _a.enabled, pingConfig = __rest(_a, ["enabled"]);
    react.useEffect(function () {
        var _a, _b;
        // initial online event fired.
        callback(true);
        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
        // initialize setInterval id so we can clean up on unmount.
        var intervalId;
        if ((mustPoll || enabled) && 'url' in pingConfig) {
            if (!((_a = window._useOnlineEffect_) === null || _a === void 0 ? void 0 : _a.pingerExist)) {
                window._useOnlineEffect_ = {
                    pingerExist: true,
                    callbackList: [callback]
                };
            }
            else {
                window._useOnlineEffect_.callbackList = __spreadArrays([callback], (_b = window._useOnlineEffect_) === null || _b === void 0 ? void 0 : _b.callbackList);
            }
            var url_1 = pingConfig.url, timeout_1 = pingConfig.timeout, interval = pingConfig.interval;
            intervalId = setInterval(function () {
                ping({
                    url: url_1,
                    timeout: timeout_1,
                }).then(function () {
                    var _a, _b;
                    console.log("CALLBACKS: ", (_a = window._useOnlineEffect_) === null || _a === void 0 ? void 0 : _a.callbackList);
                    (_b = window._useOnlineEffect_) === null || _b === void 0 ? void 0 : _b.callbackList.forEach(function (cb) {
                        cb(true);
                    });
                }).catch(function () {
                    var _a, _b;
                    console.log("CALLBACKS: ", (_a = window._useOnlineEffect_) === null || _a === void 0 ? void 0 : _a.callbackList);
                    (_b = window._useOnlineEffect_) === null || _b === void 0 ? void 0 : _b.callbackList.forEach(function (cb) {
                        cb(false);
                    });
                });
            }, interval);
        }
        return function () {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
            if (mustPoll || enabled) {
                clearInterval(intervalId);
            }
        };
    }, []);
};

exports.needsPolling = needsPolling;
exports.ping = ping;
exports.useOnlineEffect = useOnlineEffect;
//# sourceMappingURL=index.js.map
