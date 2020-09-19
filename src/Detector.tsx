import { useOnlineStatus } from "./useOnlineStatus";

type Props = {
  render({ online }: { online: boolean }): any;
};

export const Detector = ({ render }: Props) => {
  const online = useOnlineStatus();
  return render({ online });
};
