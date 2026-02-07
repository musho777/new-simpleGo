import { useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';

import { NewRequestBox, NewRequestCountBox } from './newRequestButton.styles';

export const NewRequestButton = ({ count }) => {
  const navigate = useNavigate();
  const handleNavigateNewRequestsPage = () => {
    navigate('/inventory/request-history/pending');
  };
  return (
    <NewRequestBox>
      <Button outlined width="150px" onClick={handleNavigateNewRequestsPage}>
        New requests
        <NewRequestCountBox>{count}</NewRequestCountBox>
      </Button>
    </NewRequestBox>
  );
};
