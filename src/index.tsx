import React, { FunctionComponent, useEffect } from 'react';

export const Online: FunctionComponent = ({ children }) => {
	console.log('FIRED');

	useOnlineEffect(() => {
		console.log('FINGERS CROSSED');
	});
	return true ? <div>{children}</div> : null;
};

export type UseOnlineEffectType = (
	callback: () => void
	// {}: ?{ polling: boolean }
) => void;

// TODO: finish up goOnline/goOffline functionality- Make sure first paint is working as expected with network status. Do I need state? Can I check if we are "online" in the first useEffect?
// TODO: add polling default props.
// TODO: add polling implementation.
// TODO: start useOnline hook.

export const useOnlineEffect: UseOnlineEffectType = callback => {
	const goOnline = () => {
		console.log('FIRED ONLINE!');
		callback();
	};

	const goOffline = () => {
		console.log('FIRED OFFLINE!');
		callback();
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
};
