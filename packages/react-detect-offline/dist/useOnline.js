"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const connectionListener_1 = require("./connectionListener");
function useOnline() {
    const [online, setOnline] = react_1.useState(true);
    react_1.useEffect(() => connectionListener_1.default({
        pollingEnabled: true,
        pollingMethod: "HEAD",
        pollingInterval: 5000,
        pollingURL: "http://api.icanhazip.com/",
        browserEventsEnabled: true
    }, online => setOnline(online)), []);
    return online;
}
exports.default = useOnline;
