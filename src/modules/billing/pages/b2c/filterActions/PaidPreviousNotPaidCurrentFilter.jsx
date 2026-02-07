import { useState } from 'react';

import { useDispatch } from 'react-redux';

import CustomDatePicker from 'common-ui/customDatePicker';
import { getPaidPreviousNotPaidCurrentReport } from 'modules/billing/features/main/mainActions';

import exportIconActive from '../../../assets/export/exportActive.svg';
import exportIconInactive from '../../../assets/export/exportInactive.svg';
import {
  DatePickerWrapper,
  ExportContainer,
  ExportWrapper,
  FilterActionsWrapper,
  FilterWrapper,
  Image,
  Loading,
  Message,
  Title,
} from '../B2CReport.styles';

const PaidPreviousNotPaidCurrentFilter = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const secret = '4856';

  const handleDownload = async () => {
    setLoading(true);
    if (!selectedMonth) {
      setErrorMessage('Please select month');
      return;
    }

    setErrorMessage('');

    try {
      const params = {
        month: selectedMonth,
        secret: secret,
      };

      const result = await dispatch(getPaidPreviousNotPaidCurrentReport(params));

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
          `paid-previous-not-paid-current-${selectedMonth}-${new Date().toISOString().split('T')[0]}.xlsx`
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

  const canExport = selectedMonth;

  return (
    <FilterWrapper>
      <Title>Նախորդ ամիս վճարած այս ամիս չվճարած</Title>
      <FilterActionsWrapper>
        <DatePickerWrapper>
          <CustomDatePicker
            value={selectedMonth}
            views={['month', 'year']}
            onChange={(date) => {
              if (date) {
                const formattedDate = date.split('T')[0];
                setSelectedMonth(formattedDate);
              } else {
                setSelectedMonth(null);
              }
            }}
            placeholder="Select month"
          />
        </DatePickerWrapper>
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

export default PaidPreviousNotPaidCurrentFilter;
