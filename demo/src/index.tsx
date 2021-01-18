import React from 'react';
import ReactDOM from 'react-dom';
import { Online } from 'react-detect-offline';

ReactDOM.render(
	<React.StrictMode>
		<Online>
			<div>Online 1</div>
			<div>Online 2</div>
			<div>Online 3</div>
		</Online>
	</React.StrictMode>,
	document.getElementById('root')
);
