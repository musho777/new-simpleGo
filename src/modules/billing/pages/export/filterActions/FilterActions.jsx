import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import ResetButton from 'common-ui/resetButton';
import DatePicker from 'modules/billing/components/datePicker';
import SearchSelect from 'modules/billing/components/searchSelect';
import { getExportReport } from 'modules/billing/features/main/mainActions';
import { setExportSearchData } from 'modules/billing/features/main/mainSlice';

import exportIconActive from '../../../assets/export/exportActive.svg';
import exportIconInactive from '../../../assets/export/exportInactive.svg';
import { billingTypes } from '../../subscribers/billingConstants';
import {
  ExportContainer,
  ExportWrapper,
  FilterActionsWrapper,
  FilterWrapper,
  Image,
  Message,
  Title,
} from '../Export.styles';

const FilterActions = ({ searchData, resetFilters, handleResetAllFilters }) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [secret, setSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { from, to, currentStatus, oldStatus, currentAbsentStatus } = searchData;
  const selectStatus = billingTypes.map((item, index) => {
    return { uuid: index, name: item };
  });

  const handleFilterChange = (key, value) => {
    const updatedSearchData = { ...searchData };
    setErrorMessage('');
    if (value.length === 0) {
      updatedSearchData[key] = [];
    } else if (value.length > 0) {
      updatedSearchData[key] = value;
    } else {
      delete updatedSearchData[key];
    }

    dispatch(setExportSearchData(updatedSearchData));
  };

  const handleDownload = async () => {
    if (!(from && to && currentStatus && oldStatus && currentAbsentStatus && secret)) return;

    try {
      const result = await dispatch(
        getExportReport({
          ...searchData,
          secret,
        })
      ).unwrap();

      if (result && result.size > 0) {
        setErrorMessage(true);
        const url = URL.createObjectURL(new Blob([result]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export-report.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        setErrorMessage('Տվյալներ չեն գտնվել');
      }
    } catch (err) {
      console.log(`Սխալ տեղի ունեցավ՝ ${err}`);
    }
  };

  const handleResetAll = () => {
    setDateFrom('');
    setDateTo('');
    setErrorMessage('');
    handleResetAllFilters();
  };

  const handleCurrentStatusSelect = (currentStatus) =>
    handleFilterChange('currentStatus', currentStatus);
  const handleOldStatusSelect = (oldStatus) => handleFilterChange('oldStatus', oldStatus);
  const handleCurrentAbsentStatusSelect = (currentAbsentStatus) =>
    handleFilterChange('currentAbsentStatus', currentAbsentStatus);

  const onDateChangeTo = ({ from, to }) => {
    setDateFrom((prev) => from || prev);
    setDateTo((prev) => to || prev);
    setErrorMessage('');
  };

  useEffect(() => {
    if (dateFrom && dateTo) {
      dispatch(
        setExportSearchData({
          ...searchData,
          from: dateFrom,
          to: dateTo,
        })
      );
    }
  }, [dateFrom, dateTo, dispatch]);

  useEffect(() => {
    setSecret(localStorage.getItem('securityCode'));
  }, []);

  return (
    <FilterWrapper>
      <Title>Ներբեռնել բաժանորդների հաշվետվությունը</Title>
      <FilterActionsWrapper>
        <DatePicker
          label="Ընտրել ամսաթիվը"
          onDateChange={onDateChangeTo}
          reset={resetFilters.dates}
        />
        <SearchSelect
          id="Նախորդող ստատուս"
          title="Նախորդող ստատուս"
          allTitle="Բոլորը"
          options={selectStatus}
          onSelect={handleOldStatusSelect}
          resetOptions={resetFilters.oldStatus}
          isSingleSelect={true}
          width="181px"
        />
        <SearchSelect
          id="Ընթացիկ ստատուս"
          title="Ընթացիկ ստատուս"
          allTitle="Բոլորը"
          options={selectStatus}
          onSelect={handleCurrentStatusSelect}
          resetOptions={resetFilters.currentStatus}
          isSingleSelect={true}
          width="171px"
        />
        <SearchSelect
          id="Բացակայող ստատուս"
          title="Բացակայող ստատուս"
          allTitle="Բոլորը"
          options={selectStatus}
          onSelect={handleCurrentAbsentStatusSelect}
          resetOptions={resetFilters.currentAbsentStatus}
          isSingleSelect={true}
          width="190px"
        />
        {from && to && currentStatus && oldStatus && currentAbsentStatus && (
          <ResetButton onClick={handleResetAll} title="" />
        )}
      </FilterActionsWrapper>
      <ExportWrapper>
        {from && to && currentStatus && oldStatus && currentAbsentStatus ? (
          <ExportContainer>
            <Image
              onClick={handleDownload}
              src={exportIconActive}
              alt="export"
              style={{ cursor: 'pointer' }}
            />
            {errorMessage && <Message>{errorMessage}</Message>}
          </ExportContainer>
        ) : (
          <Image src={exportIconInactive} alt="export" />
        )}
      </ExportWrapper>
    </FilterWrapper>
  );
};

export default FilterActions;
