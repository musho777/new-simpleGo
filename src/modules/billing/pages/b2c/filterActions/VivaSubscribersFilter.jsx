import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { getVivaSubscribersReport } from 'modules/billing/features/main/mainActions';

import exportIconActive from '../../../assets/export/exportActive.svg';
import {
  ExportContainer,
  ExportWrapper,
  FilterWrapper,
  Image,
  Loading,
  Message,
  Title,
} from '../B2CReport.styles';

const VivaSubscribersFilter = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const secret = '4856';

  const handleDownload = async () => {
    setLoading(true);

    setErrorMessage('');

    try {
      const params = {
        secret: secret,
      };

      const result = await dispatch(getVivaSubscribersReport(params));

      if (result.payload && result.payload instanceof Blob) {
        if (result.payload.size === 0) {
          setErrorMessage('Export completed but no file received');
          return;
        }

        const url = window.URL.createObjectURL(result.payload);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `viva-subscribers-${new Date().toISOString().split('T')[0]}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        setErrorMessage('Export completed but no file received');
      }
    } catch (error) {
      console.error('Export failed:', error);
      setErrorMessage('Export failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FilterWrapper>
      <Title>Վիվայի բաժանորդների հաշվետվություն</Title>
      <ExportWrapper>
        <ExportContainer>
          {!loading ? (
            <Image
              onClick={handleDownload}
              src={exportIconActive}
              alt="export"
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <Loading>...Loading</Loading>
          )}
          {errorMessage && <Message>{errorMessage}</Message>}
        </ExportContainer>
      </ExportWrapper>
    </FilterWrapper>
  );
};

export default VivaSubscribersFilter;
