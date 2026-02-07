import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import ApiClient from 'api/axiosClient';
import Button from 'common-ui/button';
import {
  createFinanceRequest,
  getFinanceRequests,
} from 'features/financeRequest/financeRequestActions';
import Navigation from 'pages/components/navigation';
import Switch from 'pages/components/switch';
import { buildQueryString } from 'utils';

import { HeaderWrapper } from './Finance.styles';
import FinanceReports from './financeReports';
import { useDiagramsSearchData } from './financeReports/diagrams/useSearchData';
import { useFinanceReportsSearchData } from './financeReports/useSearchData';
import FinanceRequest from './financeRequest';
import FinanceRequestModal from './financeRequest/components/FinanceRequestModal';
import { useFinanceRequestSearchData } from './financeRequest/useSearchData';

const Finance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userType } = useSelector((state) => state.auth);
  const [reportsData, setReportsData] = useState(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  const TABS = [
    { name: 'Finance Tickets', path: '/finance-request' },
    ...(reportsData && reportsData.length > 0
      ? [{ name: 'Finance Reports', path: '/finance-reports' }]
      : []),
  ];

  const { resetSearchData: resetReportsSearchData } = useFinanceReportsSearchData();
  const { resetSearchData: resetDiagramsSearchData } = useDiagramsSearchData();
  const { resetSearchData: resetFinanceRequestSearchData } = useFinanceRequestSearchData();

  useEffect(() => {
    const fetchFinanceReports = async () => {
      try {
        const query = buildQueryString({ limit: 10, offset: 0 });
        const data = await ApiClient.get(`/financial-requests/reports/detailed?${query}`);
        setReportsData(data.data || []);
      } catch (error) {
        setReportsData([]);
      }
    };

    fetchFinanceReports();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateRequest = async (requestData) => {
    try {
      await dispatch(createFinanceRequest(requestData)).unwrap();
      resetFinanceRequestSearchData();
      dispatch(
        getFinanceRequests({
          limit: 10,
          offset: 0,
        })
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating finance request:', error);
    }
  };

  const handleViewModeChange = (mode) => {
    resetReportsSearchData();
    resetDiagramsSearchData();

    setViewMode(mode);

    if (mode === 'grid') {
      navigate('/finance-reports/diagrams');
    }
  };

  const renderContent = () => {
    if (location.pathname === '/finance-reports') {
      return <FinanceReports viewMode={viewMode} />;
    }
    return <FinanceRequest hideCreateButton={true} />;
  };
  const showCreateButton =
    location.pathname !== '/finance-reports' && userType !== 'Super Admin';
  const isFinanceReports =
    location.pathname === '/finance-reports' &&
    ['General Manager', 'Super Admin', 'Accounting Staff'].includes(userType);

  return (
    <div>
      <HeaderWrapper>
        {['General Manager', 'Super Admin', 'Accounting Staff'].includes(userType) ? (
          <Navigation className="nav" tabs={TABS} />
        ) : (
          <div />
        )}
        {isFinanceReports &&
          ['General Manager', 'Super Admin', 'Accounting Staff'].includes(userType) && (
            <Switch onSwitch={handleViewModeChange} value={viewMode} page="users" />
          )}
        {showCreateButton && (
          <Button width={'fit-content'} secondary onClick={handleOpenModal}>
            + Finance Request
          </Button>
        )}
      </HeaderWrapper>
      {renderContent()}
      <FinanceRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateRequest}
      />
    </div>
  );
};

export default Finance;
