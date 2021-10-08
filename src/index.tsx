import { useEffect } from 'react';
import {
	PingType,
	IsPollingType,
	GetPollingConfigType,
	UseOnlineEffectType,
} from './types';
declare global {
    interface Window { _useOnlineEffect_: undefined | { 
		pingerExist: boolean;
		callbackList: Array<(online: boolean) => void>
	}; }
}

export const needsPolling: IsPollingType = navigator => {
	// these browsers don't fully support navigator.onLine, so we need to use a polling backup
	const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;

	if (
		typeof navigator !== 'undefined' &&
		unsupportedUserAgentsPattern.test(navigator.userAgent)
	) {
		return true;
	}

	return false;
};

export const ping: PingType = ({ url, timeout }) => {
	return new Promise((resolve, reject) => {
		const isOnline = () => resolve();
		const isOffline = () => reject();

		const xhr = new XMLHttpRequest();

		xhr.onerror = isOffline;
		xhr.ontimeout = isOffline;
		xhr.onreadystatechange = () => {
			if (xhr.readyState === xhr.HEADERS_RECEIVED) {
				if (xhr.status) {
					isOnline();
				} else {
					isOffline();
				}
			}
		};

		xhr.open('HEAD', url);
		xhr.timeout = timeout;
		xhr.send();
	});
};

const getPollingConfigs: GetPollingConfigType = (
	pollingConfig,
	needsPolling
) => {
	const defaultConfig = {
		enabled: true,
		url: 'https://ipv4.icanhazip.com/',
		timeout: 5000,
		interval: 5000,
	};

	if (
		(typeof pollingConfig === 'object' && pollingConfig.enabled === true) ||
		(needsPolling === true && typeof pollingConfig === 'object')
	) {
		return { ...defaultConfig, ...pollingConfig };
	} else if (pollingConfig === true || needsPolling) {
		return { ...defaultConfig };
	} else {
		return { enabled: false };
	}
};

export const useOnlineEffect: UseOnlineEffectType = (
	callback,
	pollingOptions = {}
) => {
	const goOnline = () => {
		callback(true);
	};

	const goOffline = () => {
		callback(false);
	};

	// does the browser support navigator.onLine CORRECTLY?
	const mustPoll = needsPolling(navigator);

	const { enabled, ...pingConfig } = getPollingConfigs(
		pollingOptions,
		mustPoll
	);

	useEffect(() => {
		// initial online event fired.
		callback(true);

		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		pingConfig['callback'] = callback;

		// initialize setInterval id so we can clean up on unmount.
		let intervalId: number | undefined;

		// hash config for key to store our actual config.
    const hashedConfig: string = JSON.stringify({
      ...pingConfig,
      callback: pingConfig["callback"] + "",
    });

    if ((mustPoll || enabled) && "url" in pingConfig && !window[hashedConfig]) {
      window[hashedConfig] = { ...pingConfig };

      const { url, timeout, interval, callback } = window[hashedConfig];
      intervalId = setInterval(async () => {
        try {
          await ping({
            url,
            timeout,
          });

          console.log("CALLBACK: ", callback);
          callback(true);
        } catch (error) {
          console.log("CALLBACK: ", callback);
          callback(false);
        }
      }, interval);
    }

		return () => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);

			if (mustPoll || enabled) {
				clearInterval(intervalId);

				delete window[hashedConfig];
			}
		};
	}, []);
};
