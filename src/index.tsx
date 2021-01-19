import React, { FunctionComponent, useEffect } from 'react';

export const Online: FunctionComponent = ({ children }) => {
	useOnlineEffect(() => {
		console.log('FINGERS CROSSED');
	});

	const goOnline = () => {
		console.log('FIRED ONLINE!');
	};

	const goOffline = () => {
		console.log('FIRED OFFLINE!');
	};

	useEffect(() => {
		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		// if (polling) startPolling();

		return () => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
			// stopPolling();
		};
	}, []);
	return true ? <div>{children}</div> : null;
};

export type UseOnlineEffectType = (
	callback: () => void
	// {}: ?{ polling: boolean }
) => void;

export const useOnlineEffect: UseOnlineEffectType = callback => {
	const goOnline = () => {
		console.log('FIRED ONLINE!');
		callback();
	};

	const goOffline = () => {
		console.log('FIRED OFFLINE!');
		callback();
	};

	goOffline();
	goOnline();
};
