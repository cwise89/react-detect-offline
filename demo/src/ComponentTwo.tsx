import { useOnlineEffect } from 'react-detect-offline';

export function Two() {
	useOnlineEffect(online => console.log('fired Two', online), {
		enabled: true,
		timeout: 10000,
		interval: 5000,
	});
	return <div>Hello Two</div>;
}