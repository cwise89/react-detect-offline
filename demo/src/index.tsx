import React from 'react';
import ReactDOM from 'react-dom';
import { One } from './ComponentOne';
import { Two } from './ComponentTwo';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

function App() {
	return (
		<div>
			<One />
			<Two />
		</div>
	);
}
