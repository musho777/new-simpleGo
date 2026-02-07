import { useState } from 'react';

import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';
import DatePicker from 'modules/billing/components/datePicker';
import { getB2BComparativePeriodsReport } from 'modules/billing/features/main/mainActions';

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
} from '../B2BReport.styles';

const ComparativePeriodsFilter = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [secondRangeDateFrom, setSecondRangeDateFrom] = useState('');
  const [secondRangeDateTo, setSecondRangeDateTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const secret = '4856';

  const handleDownload = async () => {
    const dateRange1 = `${dayjs(dateFrom).format('DD/MM/YYYY')} - ${dayjs(dateTo).format('DD/MM/YYYY')}`;

    const dateRange2 = `${dayjs(secondRangeDateFrom).format('DD/MM/YYYY')} - ${dayjs(secondRangeDateTo).format('DD/MM/YYYY')}`;
    setLoading(true);
    if (!dateRange1 && !dateRange2) {
      setErrorMessage('Please select date range');
      return;
    }

    setErrorMessage('');

    try {
      const params = {
        fromFirst: dateFrom,
        toFirst: dateTo,
        fromSecond: secondRangeDateFrom,
        toSecond: secondRangeDateTo,
        secret: secret,
      };

      const result = await dispatch(getB2BComparativePeriodsReport(params));

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
          `b2b-comparative-periods-${dateFrom}-to-${dateTo}-${new Date().toISOString().split('T')[0]}.xlsx`
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
  const onSecondRangeDateChangeTo = ({ from, to }) => {
    setSecondRangeDateFrom((prev) => from || prev);
    setSecondRangeDateTo((prev) => to || prev);
    setErrorMessage('');
  };

  const canExport = dateFrom && dateTo;

  return (
    <FilterWrapper>
      <Title>Համեմատական նշված ժամանակահատվածների գումարային հավաքագրումների</Title>
      <FilterActionsWrapper>
        <DatePicker label="Առաջին միջակայք" onDateChange={onDateChangeTo} />
        <DatePicker label="Երկրորդ միջակայք" onDateChange={onSecondRangeDateChangeTo} />
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

export default ComparativePeriodsFilter;
