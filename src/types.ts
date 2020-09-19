import React from "react";

export type Polling =
  | boolean
  | {
      url?: string;
      interval?: number;
      timeout?: number;
    };

export type BaseProps = {
  children?: React.ReactNode;
  onChange?: (online: boolean) => void;
  polling?: Polling;
  wrapperType?: string;
};
