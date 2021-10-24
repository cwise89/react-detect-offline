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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        // initial online event fired.
        callback(true);
        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
        pingConfig['callback'] = callback;
        // initialize setInterval id so we can clean up on unmount.
        var intervalId;
        // hash config for key to store our actual config.
        var hashedConfig = JSON.stringify(__assign(__assign({}, pingConfig), { callback: pingConfig["callback"] + "" }));
        if ((mustPoll || enabled) && "url" in pingConfig && !window[hashedConfig]) {
            window[hashedConfig] = __assign({}, pingConfig);
            var _a = window[hashedConfig], url_1 = _a.url, timeout_1 = _a.timeout, interval = _a.interval, callback_1 = _a.callback;
            intervalId = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, ping({
                                    url: url_1,
                                    timeout: timeout_1,
                                })];
                        case 1:
                            _a.sent();
                            console.log("CALLBACK: ", callback_1);
                            callback_1(true);
                            return [3 /*break*/, 3];
                        case 2:
                            _a.sent();
                            console.log("CALLBACK: ", callback_1);
                            callback_1(false);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); }, interval);
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
