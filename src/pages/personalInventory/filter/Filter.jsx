import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Button from 'common-ui/button';
import { selectSuccess, setResetRequestItemSuccess } from 'features/inventory/inventorySlice';
import { BackToListBtn } from 'pages/projectManagement/singleTicketView/SingleTicketView.styles';

import RequestItem from '../requestItem';
import RequestItemFileUpload from '../requestItem/RequestItemFileUpload';
import { Container, RequestButtonBox, RequestButtonWrapper } from './Filter.styles';

const Filter = ({ templates }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const success = useSelector(selectSuccess);
  const { uuid } = useParams();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRequestTypeModalOpen, setIsRequestTypeModalOpen] = useState(false);

  const isMyTemplatesActive = searchParams.get('myTemplates') === 'true';
  const isReturnedItemsActive =
    location.pathname.includes('/request-history') &&
    (searchParams.get('tab') === 'returned' ||
      searchParams.get('tab') === 'history' ||
      searchParams.get('tab') === 'new');
  const handleNavigateToPersonalRequestHistory = () => {
    const url = uuid ? `/personal-requests/${uuid}` : '/personal-requests';

    navigate(url);
  };

  const handleClickOpenRequestTypeModal = () => {
    setIsRequestTypeModalOpen(true);
  };

  const handleCloseRequestTypeModal = () => {
    setIsRequestTypeModalOpen(false);
  };

  const handleSelectRegularRequest = () => {
    setIsRequestModalOpen(true);
  };

  const handleCloseRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  const handleNavigateToMyTemplates = () => {
    navigate('/personal/inventory/my-templates');
  };

  const handleClickBackToProfileItems = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (success.requestItem) {
      setIsRequestModalOpen(false);
      dispatch(setResetRequestItemSuccess());
    }

    if (success.submitBatchRequests) {
      dispatch(setResetRequestItemSuccess());
    }
  }, [success.requestItem, success.submitBatchRequests]);

  return (
    <Container>
      <RequestButtonBox className="request-buttons">
        {!uuid ? (
          <Button
            type={isMyTemplatesActive ? 'secondary' : 'submit'}
            className={!isMyTemplatesActive && 'request-history-btn'}
            outlined={!isMyTemplatesActive}
            disabled={templates?.length === 0}
            secondary={isMyTemplatesActive}
            onClick={handleNavigateToMyTemplates}
          >
            My Templates
          </Button>
        ) : (
          <BackToListBtn onClick={handleClickBackToProfileItems}>{'< Back'}</BackToListBtn>
        )}
        {!uuid && (
          <RequestButtonWrapper>
            <Button
              type={isReturnedItemsActive ? 'secondary' : 'submit'}
              outlined={!isReturnedItemsActive}
              secondary={isReturnedItemsActive}
              className={!isReturnedItemsActive && 'request-history-btn'}
              onClick={() => navigate('/personal/inventory/returned-item/returned-by-me')}
            >
              Returned items
            </Button>

            <Button
              className="request-history-btn"
              type={'submit'}
              outlined
              onClick={handleNavigateToPersonalRequestHistory}
            >
              Request History
            </Button>

            <Button
              type={'submit'}
              className="request-history-btn"
              outlined
              onClick={handleClickOpenRequestTypeModal}
            >
              Request Item
            </Button>
          </RequestButtonWrapper>
        )}
      </RequestButtonBox>
      <RequestItem isOpen={isRequestModalOpen} onClose={handleCloseRequestModal} />

      <RequestItemFileUpload
        isOpen={isRequestTypeModalOpen}
        onClose={handleCloseRequestTypeModal}
        onSelectRegular={handleSelectRegularRequest}
      />
    </Container>
  );
};

export default Filter;
