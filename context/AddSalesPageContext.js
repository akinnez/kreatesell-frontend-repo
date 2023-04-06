import {createContext, useReducer} from 'react';

export const SalesPageContext = createContext({});

const initialState = {
	showModal: false,
	modalType: 'connectSalesModal',
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_MODAL':
			return {...state, showModal: !state.showModal};

		case 'CLOSE_MODAL':
			return {
				...state,
				showModal: false,
				// modalType: '',
			};

		case 'OPEN_MODAL':
			return {
				...state,
				showModal: true,
				modalType: action.payload.modalType,
				productId: action.payload.productId,
			};

		case 'CONNECT_SALES_PAGE':
			return {
				...state,
			};

		case 'CHANGE_MODAL_TYPE':
			return {
				...state,
				modalType: action.payload.modalType,
				imageLink: action.payload?.values?.imageLink,
			};

		default:
			return state;
	}
};

// modalType can be connectSalesModal, salesPageConnected, disconnectSalesPage, salesPageDisconnected
export const SalesPageProvider = ({children}) => {
	const [salesPage, salesPageDispatch] = useReducer(reducer, initialState);

	return (
		// FIXME:  This( value={{salesPage, salesPageDispatch}}) is not really performant and would always cause a re-render
		<SalesPageContext.Provider value={{salesPage, salesPageDispatch}}>
			{children}
		</SalesPageContext.Provider>
	);
};
