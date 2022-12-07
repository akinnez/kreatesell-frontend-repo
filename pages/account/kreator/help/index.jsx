import React, {useState, useEffect} from 'react';
import AuthLayout from 'components/authlayout';
import {Card, Tabs} from 'antd';
import style from 'public/css/card.module.scss';
import HelpHeader from 'components/HelpComponents/header';
import useSWR from 'swr';
import axios from 'axios';
import Loader from 'components/loader';
import {getUserToken} from 'utils';
import TicketTable from 'components/KreatorTickets/TicketTable';
import useHelpFilters from 'components/HelpComponents/hooks/useHelpFilters';
import CustomErrorPage from 'components/CustomErrorPage/CustomErrorPage';
import useGetHelpTickets from 'services/swrQueryHooks/Tickets';
import dataLoading from 'utils/dataLoading';

const Index = () => {
	const {url, filters, setFilters} = useHelpFilters('auth/KreatorTickets');
	const {
		helpTicketData,
		helpTicketError,
		isHelpTicketLoading,
		tickets,
		loading,
		setLoading,
		isValidating,
	} = useGetHelpTickets(url);

	const isLoading = dataLoading({
		products: tickets.data,
		loading,
		response: helpTicketData,
		error: helpTicketError,
		isValidating,
	});

	return (
		<>
			<AuthLayout>
				<HelpHeader {...{setFilters, setLoading, filters}} />
				<TicketTable tickets={tickets} {...{isLoading}} />
			</AuthLayout>
		</>
	);
};

export default Index;
