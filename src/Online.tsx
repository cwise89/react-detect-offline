import { BaseProps } from "./types";
import { useOnlineStatus, needPolling } from "./useOnlineStatus";

export const Online = ({
  children,
  polling = needPolling,
  onChange,
}: BaseProps) => {
  const online = useOnlineStatus(polling, onChange);
  return online ? children : null;
};
