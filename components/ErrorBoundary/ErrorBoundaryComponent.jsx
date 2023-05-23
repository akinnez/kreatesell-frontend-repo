import React from 'react';
import Image from 'next/image';

import {ErrorBoundary} from 'react-error-boundary';

import {Button} from 'components';
import {MaintenanceIcon} from 'utils';
import styles from './ErrorBoundary.module.scss';

function ErrorHandler({error, resetErrorBoundary}) {
	return (
		<div
			role="alert"
			className={`flex flex-col justify-center items-center w-100 ${styles.container}`}
			style={{
				height: '100vh',
			}}
		>
			<Image src={MaintenanceIcon} alt="error boundary image" />
			<h5 className={styles.heading}>Oh Snap! Something&apos;s broken</h5>
			<p className={styles.subtitle}>
				This needs a quick fix and our engineers are currently <br /> on
				it. Please, check back shortly.
			</p>
			{/* <p>An error occurred:</p>
			<pre>{error.message}</pre>
			<Button
				bgColor="blue"
				type="button"
				text="Try Again"
				onClick={resetErrorBoundary}
			/> */}
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
