import {useEffect} from 'react';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import Script from 'next/script';
import '../public/css/global.scss';
import 'react-dates/initialize';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Router, {useRouter} from 'next/router';
// aos animations
import AOS from 'aos';
import 'aos/dist/aos.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import '@reach/dialog/styles.css';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import {setAuthorizationHeader} from '../utils/index';
import ChatScript from '../components/ChatWidgetScript';
import {SalesPageProvider} from 'context/AddSalesPageContext';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundaryComponent';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
	const router = useRouter();

	const store = useStore(pageProps.initialReduxState);
	useEffect(() => {
		setAuthorizationHeader();
	}, []);

	// run animation once page finishes loading
	useEffect(() => {
		AOS.init({duration: 2000});
		AOS.refresh();
	}, []);

	return (
		<ErrorBoundary
			resetErrorBoundary={() => router.reload(window.location.pathname)}
		>
			<Provider store={store}>
				<SalesPageProvider>
					{/* <Script
            charset="UTF-8"
            src="//web.webpushs.com/js/push/723b749315f187ddc541ac9a201d2dd2_1.js"
            async
          /> */}
					<ChatScript />
					<PayPalScriptProvider
						options={{
							'client-id':
								process.env.NEXT_PUBLIC_PAYPAL_PUBLISHABLE_KEY,
							intent: 'capture',
						}}
					>
						<Component {...pageProps} />
					</PayPalScriptProvider>
				</SalesPageProvider>
			</Provider>
		</ErrorBoundary>
	);
}

export default MyApp;
