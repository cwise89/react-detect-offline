import React from 'react';
import ReactDOM from 'react-dom';
import { useOnlineEffect } from 'react-detect-offline';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

function App() {
	useOnlineEffect(online => console.log('fired from demo', online), {
		timeout: 5000,
		interval: 1000,
	});
	return <div>Hello OSS!</div>;
}
