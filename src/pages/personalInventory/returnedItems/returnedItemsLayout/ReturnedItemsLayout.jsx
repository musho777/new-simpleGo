import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';
import { getEmployeeReturnedItems } from 'features/inventory/inventoryActions';
import Navigation from 'pages/components/navigation';
import { BackToListBtn } from 'pages/projectManagement/singleTicketView/SingleTicketView.styles';

import ReturnItemModal from '../returnedByMe/ReturnItemModal';
import { ButtonWrapper } from '../returnedByMe/ReturnedByMe.styles';
import { LayoutWrapper, NavbarWrapper } from './ReturnedItemsLayout.styles';

const ReturnedItemsLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const tabs = [
    {
      name: 'New Requests',
      path: '/personal/inventory/returned-item/new-requests',
      search: '?page=1&limit=10',
    },
    {
      name: 'Request History',
      path: '/personal/inventory/returned-item/request-history',
      search: '?page=1&limit=10',
    },
    {
      name: 'Returned by me',
      path: '/personal/inventory/returned-item/returned-by-me',
      search: '?page=1&limit=10',
    },
  ];
  const handleReturnItemClick = () => {
    setIsReturnModalOpen(true);
  };
  const handleReturnModalClose = () => {
    setIsReturnModalOpen(false);
  };
  const handleReturnSuccess = () => {
    dispatch(getEmployeeReturnedItems({ limit: 10, offset: 0 }));
  };

  const handleBack = () => {
    navigate('/personal/inventory?limit=10&offset=0&usage=Personal+use&view=list');
  };
  return (
    <LayoutWrapper>
      <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>

      <NavbarWrapper>
        <Navigation tabs={tabs} />
        {pathname.includes('returned-by-me') && (
          <ButtonWrapper>
            <Button secondary onClick={handleReturnItemClick}>
              Return Item
            </Button>
          </ButtonWrapper>
        )}
      </NavbarWrapper>
      {children}
      <ReturnItemModal
        isOpen={isReturnModalOpen}
        onClose={handleReturnModalClose}
        onSuccess={handleReturnSuccess}
      />
    </LayoutWrapper>
  );
};

export default ReturnedItemsLayout;
