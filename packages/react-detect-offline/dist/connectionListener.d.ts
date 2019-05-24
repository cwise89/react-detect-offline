interface PingOptions {
    url: string;
    timeout: number;
    method: string;
}
export declare function ping({ url, timeout, method }: PingOptions): Promise<boolean>;
interface RegisterOptions {
    browserEventsEnabled?: boolean;
    pollingInterval?: number;
    pollingTimeout?: number;
    pollingEnabled?: boolean;
    pollingURL?: string;
    pollingMethod?: string;
}
export default function register({ browserEventsEnabled, pollingInterval, pollingTimeout, pollingEnabled, pollingURL, pollingMethod }: RegisterOptions, callback: (online: boolean) => void): () => void;
export {};
