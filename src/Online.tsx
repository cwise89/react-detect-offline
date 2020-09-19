import React from "react";
import { BaseProps } from "./types";
import { useOnlineStatus, needPolling } from "./useOnlineStatus";
import { Wrapper } from "./Wrapper";

export const Online = ({
  children,
  polling = needPolling,
  onChange,
  wrapperType,
}: BaseProps) => {
  const online = useOnlineStatus(polling, onChange);
  return online ? (
    <Wrapper wrapperType={wrapperType}>{children}</Wrapper>
  ) : null;
};
