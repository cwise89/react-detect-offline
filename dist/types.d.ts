import React from "react";
export declare type Polling = boolean | {
    url?: string;
    interval?: number;
    timeout?: number;
};
export declare type BaseProps = {
    children?: React.ReactNode;
    onChange?: (online: boolean) => void;
    polling?: Polling;
};
