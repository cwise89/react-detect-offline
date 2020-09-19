import React from "react";
import { useOnlineStatus, needPolling } from "./useOnlineStatus";
import { Wrapper } from "./Wrapper";
export const Online = ({ children, polling = needPolling, onChange, wrapperType, }) => {
    const online = useOnlineStatus(polling, onChange);
    return online ? (React.createElement(Wrapper, { wrapperType: wrapperType }, children)) : null;
};
