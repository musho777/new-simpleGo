import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'common-ui/button';
import Loading from 'common-ui/loading';
import {
  getContractBalance,
  getCustomersLeadData,
  getSingleCustomer,
} from 'features/customers/customersActions';
import {
  selectContractBalanceData,
  selectContractData,
  selectCustomerLoading,
  selectSingleCustomers,
  selectSingleLoading,
} from 'features/customers/customersSlice';
import TabButtons from 'pages/components/tabNavigation/TabButtons';

import {
  BackToListBtn,
  ButtonWrapper,
  Container,
  PackageInfoWrapper,
  TabWrapper,
} from './SingleCustomer.styles';
import { CustomerInfo } from './components/CustomerInfo';
import { NextContactDates } from './components/NextContactDates';
import { PackageInfo } from './components/PackageInfo';
import SimpleGoOffers from './components/SimpleGoOffers';
import { StatusTimeline } from './components/StatusTimeline';
import TicketHistory from './components/TicketHistory';
import ErbContractBalance from './components/erbContractBalance';
import { useErbContractBalanceSearchData } from './components/erbContractBalance/useSearchData';

const SingleCustomer = () => {
  const [activeTab, setActiveTab] = useState('ERP Offers');
  const [activeStatus, setActiveStatus] = useState('Status Updates');
  const singleLoading = useSelector(selectSingleLoading);
  const singleData = useSelector(selectSingleCustomers);
  const contractBalance = useSelector(selectContractBalanceData);
  const leadInfo = useSelector(selectContractData);
  const leadInfoLoading = useSelector(selectCustomerLoading);
  const { searchData } = useErbContractBalanceSearchData();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { customerId } = useParams();

  const navigation = useNavigate();
  const tabs = [
    { name: 'ERP Offers' },
    { name: 'ERP Contract Balance' },
    { name: 'SimpleGo Offers', disabled: !leadInfo?.orders?.length },
  ];
  const statusTabs = [
    { name: 'Status Updates' },
    { name: 'Next Contact Dates', disabled: !leadInfo?.followUps?.length },
    { name: 'Ticket History', disabled: !leadInfo?.tickets?.length },
  ];

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleStatusTabChange = (tabName) => {
    setActiveStatus(tabName);
  };

  const handleNavigateToCreateTicket = () => {
    navigation('/project-management/tickets/create-edit', {
      state: { crmUser: { id: singleData?.customerId, name: singleData.fullName } },
    });
  };

  const handleNavigateToCreateAppointment = () => {
    navigation('/project-management/appointment/create-edit', {
      state: {
        crmUser: {
          id: singleData?.customerId,
          name: singleData.fullName,
          offers: singleData.tariffs,
        },
      },
    });
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/customer-relationship-management');
    }
  };

  useEffect(() => {
    dispatch(getSingleCustomer({ contractId: customerId }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContractBalance({ contractId: customerId, ...searchData }));
  }, [dispatch, searchData]);

  useEffect(() => {
    if (singleData?.customerId) {
      dispatch(getCustomersLeadData(singleData?.customerId));
    }
  }, [singleData]);

  if (singleLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>
      <CustomerInfo data={singleData} />
      <TabWrapper>
        <TabButtons tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <ButtonWrapper>
          <Button onClick={handleNavigateToCreateAppointment} secondary>
            Create Appointment
          </Button>
          <Button onClick={handleNavigateToCreateTicket} secondary>
            Create Ticket
          </Button>
        </ButtonWrapper>
      </TabWrapper>
      {activeTab === 'ERP Offers' && (
        <PackageInfoWrapper>
          {singleData?.tariffs?.map((elm, i) => {
            return <PackageInfo tariffs={elm} key={i} />;
          })}
        </PackageInfoWrapper>
      )}
      {activeTab === 'ERP Contract Balance' && <ErbContractBalance data={contractBalance} />}
      {activeTab === 'SimpleGo Offers' &&
        (leadInfoLoading ? <Loading /> : <SimpleGoOffers data={leadInfo?.orders} />)}
      <TabButtons
        tabs={statusTabs}
        activeTab={activeStatus}
        onTabChange={handleStatusTabChange}
      />
      {leadInfoLoading ? (
        <Loading />
      ) : activeStatus === 'Status Updates' ? (
        <StatusTimeline statusHistory={leadInfo?.statusHistory || []} />
      ) : activeStatus === 'Ticket History' ? (
        <TicketHistory data={leadInfo?.tickets} />
      ) : (
        <NextContactDates followUps={leadInfo?.followUps || []} />
      )}
    </Container>
  );
};

export default SingleCustomer;
