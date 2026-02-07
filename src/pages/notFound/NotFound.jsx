import { useNavigate } from 'react-router-dom';

import arrow from 'assets/Vector.svg';
import Button from 'common-ui/button';

import {
  ButtonBox,
  Container,
  LeftBack,
  NotFoundMessage,
  PageNotFoundMessage,
  WrongUrlMessage,
} from './NotFound.styles';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/dashboard', { replace: true });
    }
  };
  return (
    <Container>
      <LeftBack>
        <WrongUrlMessage>Oops....</WrongUrlMessage>
        <PageNotFoundMessage>Page not found</PageNotFoundMessage>
        <NotFoundMessage>
          This Page doesn`t exist or was removed! We suggest you back to home.
        </NotFoundMessage>
        <ButtonBox>
          <Button secondary onClick={goBack}>
            <img src={arrow} alt="arrow" />
            Go back
          </Button>
        </ButtonBox>
      </LeftBack>
    </Container>
  );
};

export default NotFound;
