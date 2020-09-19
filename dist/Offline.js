import React from "react";
import { useOnlineStatus, needPolling } from "./useOnlineStatus";
import { Wrapper } from "./Wrapper";
export const Offline = ({ children, polling = needPolling, onChange, wrapperType, }) => {
    const online = useOnlineStatus(polling, onChange);
    return online ? null : (React.createElement(Wrapper, { wrapperType: wrapperType }, children));
};
