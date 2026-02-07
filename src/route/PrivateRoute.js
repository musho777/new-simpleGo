import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import Header from 'common-ui/header';
import Navbar from 'common-ui/navbar';
import { getUserInfo } from 'features/auth/authActions';
import { selectUserInfo } from 'features/auth/authSlice';
import { selectCollapsNavbar } from 'features/components/componentsSlice';
import { Container } from 'pages/auth/Auth.styles';
import AuthLayout from 'pages/components/authLayout';
import styled from 'styled-components';
import { isObjectEmpty } from 'utils';

import ChangePasswordSuper from './ChangePasswordSuper';

const Content = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Col = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: 1301px) {
    width: ${({ $stat }) => ($stat ? 'calc(100% - 80px)' : 'calc(100% - 251px)')};
  }
`;

const WebCont = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  height: calc(100vh - 80px);
  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const PrivateRoute = ({ children }) => {
  const collapsNavbar = useSelector(selectCollapsNavbar);
  const isAuthenticated = useSelector((state) => state.auth.accessToken !== null);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (isObjectEmpty(userInfo)) {
      dispatch(getUserInfo());
    }
  }, [userInfo, dispatch]);

  if (userInfo?.status === 'first_login') {
    return (
      <AuthLayout>
        <Container>
          <ChangePasswordSuper />
        </Container>
      </AuthLayout>
    );
  }

  return isAuthenticated ? (
    <Content>
      <Navbar />
      <Col $stat={collapsNavbar}>
        <Header />
        <WebCont>{children}</WebCont>
      </Col>
    </Content>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
