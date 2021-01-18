import React, { FunctionComponent, useState } from 'react';

export const Online: FunctionComponent = ({ children }) => {
	const [isOnline, setisOnline] = useState(true);

	setisOnline(true);

	return isOnline ? <div>{children}</div> : null;
};
