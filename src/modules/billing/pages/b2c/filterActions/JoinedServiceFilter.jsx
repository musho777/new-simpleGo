import { useState } from 'react';

import { useDispatch } from 'react-redux';

import DatePicker from 'modules/billing/components/datePicker';
import { getJoinedServiceReport } from 'modules/billing/features/main/mainActions';

import exportIconActive from '../../../assets/export/exportActive.svg';
import exportIconInactive from '../../../assets/export/exportInactive.svg';
import {
  ExportContainer,
  ExportWrapper,
  FilterActionsWrapper,
  FilterWrapper,
  Image,
  Loading,
  Message,
  Title,
} from '../B2CReport.styles';

const JoinedServiceFilter = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const secret = '4856';

  const handleDownload = async () => {
    setLoading(true);
    if (!dateFrom || !dateTo) {
      setErrorMessage('Please select date range');
      return;
    }

    setErrorMessage('');

    try {
      const params = {
        from: dateFrom,
        to: dateTo,
        secret: secret,
      };

      const result = await dispatch(getJoinedServiceReport(params));

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
          `joined-service-${dateFrom}-to-${dateTo}-${new Date().toISOString().split('T')[0]}.xlsx`
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

  const onDateChangeTo = ({ from, to }) => {
    setDateFrom((prev) => from || prev);
    setDateTo((prev) => to || prev);
    setErrorMessage('');
  };

  const canExport = dateFrom && dateTo;

  return (
    <FilterWrapper>
      <Title>Նախորդ ամիս միացած բաժանորդների ներկա կարգավիճակ</Title>
      <FilterActionsWrapper>
        <DatePicker label="Ընտրել ամսաթիվը" onDateChange={onDateChangeTo} />
      </FilterActionsWrapper>
      <ExportWrapper>
        {canExport ? (
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
        ) : (
          <Image src={exportIconInactive} alt="export" />
        )}
      </ExportWrapper>
    </FilterWrapper>
  );
};

export default JoinedServiceFilter;
