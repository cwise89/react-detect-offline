import React from "react";
import { useOnlineStatus, needPolling } from "./useOnlineStatus";
import { Wrapper } from "./Wrapper";
import { BaseProps } from "./types";

export const Offline = ({
  children,
  polling = needPolling,
  onChange,
  wrapperType,
}: BaseProps) => {
  const online = useOnlineStatus(polling, onChange);
  return online ? null : (
    <Wrapper wrapperType={wrapperType}>{children}</Wrapper>
  );
};
