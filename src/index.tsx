import { useEffect } from 'react';
import {
	PingType,
	IsPollingType,
	GetPollingConfigType,
	UseOnlineEffectType,
} from './types';

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
	return new Promise(resolve => {
		const isOnline = () => resolve(true);
		const isOffline = () => resolve(false);

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
	console.log('getPollingConfig- needsPolling: ', needsPolling);
	console.log(
		'typeof pollingConfig: ',
		pollingConfig,
		typeof pollingConfig === 'object'
	);

	if (
		(typeof pollingConfig === 'object' && pollingConfig.enabled === true) ||
		(needsPolling === true && typeof pollingConfig === 'object')
	) {
		console.log('FIRED 1');
		return { ...defaultConfig, ...pollingConfig };
	} else if (pollingConfig === true || needsPolling) {
		console.log('FIRED 2');
		return { ...defaultConfig };
	} else {
		console.log('FIRED 3');
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

	const mustPoll = needsPolling(navigator);
	const { enabled, ...pingConfig } = getPollingConfigs(
		pollingOptions,
		mustPoll
	);

	useEffect(() => {
		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		let intervalId: number | undefined;
		console.log('IF- mustPoll: ', mustPoll);
		console.log('IF- enabled: ', enabled);
		console.log('IF- pingConfig: ', 'url' in pingConfig);

		if ((mustPoll || enabled) && 'url' in pingConfig) {
			const { url, timeout, interval } = pingConfig;
			console.log('FIRED SET INTERVAL', pingConfig);
			setInterval(() => {
				ping({
					url,
					timeout,
				}).then(online => (online ? goOnline() : goOffline()));
			}, interval);
		}

		return () => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
			if (mustPoll || enabled) {
				clearInterval(intervalId);
			}
		};
	}, []);
};
