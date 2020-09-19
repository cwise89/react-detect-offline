import { useOnlineStatus, needPolling } from "./useOnlineStatus";
export const Offline = ({ children, polling = needPolling, onChange, }) => {
    const online = useOnlineStatus(polling, onChange);
    return online ? null : children;
};
