import { useOnlineStatus } from "./useOnlineStatus";
export const Detector = ({ render }) => {
    const online = useOnlineStatus();
    return render({ online });
};
