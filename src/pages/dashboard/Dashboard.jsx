import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import construction from 'assets/construction.svg';
import { getUserInfo } from 'features/auth/authActions';
import { selectUserType } from 'features/auth/authSlice';

import { Container, Img } from './Dashboard.styles';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const storedUserType = localStorage.getItem('userType');

  useEffect(() => {
    if (!storedUserType) {
      dispatch(getUserInfo());
    }
  }, [dispatch, storedUserType]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  return (
    <Container>
      <Img src={construction} alt="watch" />
    </Container>
  );
};

export default Dashboard;
