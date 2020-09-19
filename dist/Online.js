import { useOnlineStatus, needPolling } from "./useOnlineStatus";
export const Online = ({ children, polling = needPolling, onChange, }) => {
    const online = useOnlineStatus(polling, onChange);
    return online ? children : null;
};
