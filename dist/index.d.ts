import { PingType, IsPollingType, UseOnlineEffectType } from './types';
declare global {
    interface Window {
        _useOnlineEffect_: undefined | {
            pingerExist: boolean;
            callbackList: Array<(online: boolean) => void>;
        };
    }
}
export declare const needsPolling: IsPollingType;
export declare const ping: PingType;
export declare const useOnlineEffect: UseOnlineEffectType;
