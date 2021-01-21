export declare type IsPollingType = (navigator: Navigator) => boolean;
export interface IPingArgs {
    url: string;
    timeout: number;
}
export declare type PingType = ({}: IPingArgs) => Promise<boolean>;
export interface IPollingConfig {
    enabled?: boolean;
    url?: string;
    timeout?: number;
    interval?: number;
}
export declare type UseOnlineEffectType = (callback: (online: boolean) => void, pollingOptions?: IPollingConfig | boolean) => void;
export declare type GetPollingConfigType = (pollingConfig: IPollingConfig | boolean, needsPolling: boolean) => {
    enabled: true;
    url: string;
    timeout: number;
    interval: number;
} | {
    enabled: false;
};
