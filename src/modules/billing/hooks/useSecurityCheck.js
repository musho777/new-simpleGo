import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkSecret } from '../features/main/mainActions';
import {
  setSecretSuccess,
  setSecurityValue,
  toggleSecurityModal,
} from '../features/main/mainSlice';

const useSecurityCheck = () => {
  const storedSecurityCode = localStorage.getItem('securityCode');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { securityModalOpen, securityValue, loading, error, secretSuccess } = useSelector(
    (state) => state.main
  );

  const handleSecurityValueChange = (event) => {
    dispatch(setSecurityValue(event.target.value));
  };

  const handleCancelModal = () => {
    dispatch(toggleSecurityModal(false));
    dispatch(setSecretSuccess(false));
    navigate('/dashboard');
  };

  const handleClickCheckSecurityValue = () => {
    dispatch(checkSecret(securityValue));
  };

  useEffect(() => {
    if (!storedSecurityCode) {
      dispatch(toggleSecurityModal(true));
    } else {
      dispatch(toggleSecurityModal(false));
    }
  }, [dispatch, storedSecurityCode]);

  useEffect(() => {
    if (secretSuccess) {
      localStorage.setItem('securityCode', securityValue);
      dispatch(toggleSecurityModal(false));
      dispatch(setSecretSuccess(false));
    }
  }, [secretSuccess, dispatch, securityValue]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!securityModalOpen) return;

      if (e.key === 'Escape') {
        handleCancelModal();
      } else if (e.key === 'Enter') {
        handleClickCheckSecurityValue();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [securityModalOpen, handleCancelModal, handleClickCheckSecurityValue]);

  return {
    securityModalOpen,
    securityValue,
    loading,
    error,
    handleSecurityValueChange,
    handleClickCheckSecurityValue,
    handleCancelModal,
  };
};

export default useSecurityCheck;
