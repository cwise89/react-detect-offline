import { Polling } from "./types";
export declare const needPolling: boolean;
export declare function useOnlineStatus(polling?: Polling, onChange?: (online: boolean) => void): boolean;
