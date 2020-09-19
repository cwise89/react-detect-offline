import { useOnlineStatus } from "./useOnlineStatus";

type DetectorProps = {
  render({ online }: { online: boolean }): any;
};

export const Detector = ({ render }: DetectorProps) => {
  const online = useOnlineStatus();
  return render({ online });
};
