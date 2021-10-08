export type IsPollingType = (navigator: Navigator) => boolean;

export interface IPingArgs {
	url: string;
	timeout: number;
}

export type PingType = ({}: IPingArgs) => Promise<void>;

export interface IPollingConfig {
	enabled?: boolean;
	url?: string;
	timeout?: number;
	interval?: number;
}

export type UseOnlineEffectType = (
	callback: (online: boolean) => void,
	pollingOptions?: IPollingConfig | boolean
) => void;

export type GetPollingConfigType = (
	pollingConfig: IPollingConfig | boolean,
	needsPolling: boolean
) =>
	| {
			enabled: true;
			url: string;
			timeout: number;
			interval: number;
			callback?: (online: boolean) => void;
	  }
	| {
			enabled: false;
	  };
