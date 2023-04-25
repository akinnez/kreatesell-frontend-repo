import {Button} from 'components';
import React from 'react';

import {ErrorBoundary} from 'react-error-boundary';

function ErrorHandler({error, resetErrorBoundary}) {
	return (
		<div
			role="alert"
			style={{
				border: '1px solid',
				width: '80%',
				background: 'rgba(255, 0,0,0.2)',
				color: 'red',
				margin: 'auto',
				marginBlockStart: '2rem',
				padding: '1.5rem',
			}}
		>
			<p>An error occurred:</p>
			<pre>{error.message}</pre>
			<Button
				bgColor="blue"
				type="button"
				text="Try Again"
				onClick={resetErrorBoundary}
			/>
		</div>
	);
}

export const ErrorBoundaryComponent = ({
	children,
	resetErrorBoundary = () => {
		console.log('clicked');
	},
}) => {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorHandler}
			onError={() => {}}
			// reset the state of your app so the error doesn't happen again
			onReset={resetErrorBoundary}
		>
			{children}
		</ErrorBoundary>
	);
};

export default ErrorBoundaryComponent;
