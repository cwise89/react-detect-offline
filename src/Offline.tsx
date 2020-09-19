import { useOnlineStatus, needPolling } from "./useOnlineStatus";
import { BaseProps } from "./types";

export const Offline = ({
  children,
  polling = needPolling,
  onChange,
}: BaseProps) => {
  const online = useOnlineStatus(polling, onChange);
  return online ? null : children;
};
