import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import exportSvg from 'assets/export.svg';
import Input from 'common-ui/input';
import ResetButton from 'common-ui/resetButton';
import { Select } from 'common-ui/select';
import { STATUS_OPTIONS_REQUEST_HISTORY } from 'constants/constants';
import { exportRequestHistory } from 'features/inventory/inventoryActions';
import useDebounce from 'hooks/useDebounce';
import { ResetWrapper } from 'pages/inventory/newRequests/filter/Filter.styles';

import { ExportText, ExportWrapper, Icon } from '../RequestHistory.styles';
import { useRequestHistorySearchParams } from '../useSearchData';
import { FilterContainer, FilterRow, SelectWrapper } from './Filter.styles';

const Filter = ({ data, isLoading }) => {
  const { searchData, setRequestHistorySearchData, resetSearchData } =
    useRequestHistorySearchParams();
  const [requesterName, setRequesterName] = useState(searchData.requesterName || '');
  const [requesterEmail, setRequesterEmail] = useState(searchData.requesterEmail || '');
  const [requesterPhone, setRequesterPhone] = useState(searchData.requesterPhone || '');
  const [status, setStatus] = useState(searchData.status || '');

  const [first, setFirst] = useState(false);

  const dispatch = useDispatch();
  const handleExport = () => {
    const exportData = {
      requesterName: searchData.requesterName,
      requesterEmail: searchData.requesterEmail,
      requesterPhone: searchData.requesterPhone,
      status: searchData.status,
      limit: searchData.limit,
      offset: searchData.offset,
    };

    const filteredExportData = Object.fromEntries(
      Object.entries(exportData).filter(([, value]) => value !== undefined && value !== '')
    );

    dispatch(exportRequestHistory(filteredExportData));
  };

  const handleFullNameChange = (e) => {
    setFirst(true);
    setRequesterName(e);
  };
  const handleEmailChange = (e) => {
    setFirst(true);
    setRequesterEmail(e);
  };

  const handlePhoneNumberChange = (e) => {
    setFirst(true);
    setRequesterPhone(e);
  };

  const debouncedName = useDebounce(requesterName, 500);
  const debouncedEmail = useDebounce(requesterEmail, 500);
  const debouncedPhone = useDebounce(requesterPhone, 500);

  const handleStatusChange = (selectedOption) => {
    const value = selectedOption?.value || '';
    setStatus(value);
    setRequestHistorySearchData({ status: value });
  };

  const handleReset = () => {
    setFirst(false);
    setStatus('');
    setRequesterName('');
    setRequesterEmail('');
    setRequesterPhone('');
    resetSearchData();
  };

  useEffect(() => {
    if (first) setRequestHistorySearchData({ requesterName: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setRequestHistorySearchData({ requesterEmail: debouncedEmail });
  }, [debouncedEmail]);

  useEffect(() => {
    if (first) setRequestHistorySearchData({ requesterPhone: debouncedPhone });
  }, [debouncedPhone]);

  return (
    <FilterContainer>
      <FilterRow>
        <Input
          placeholder="Employee's Full Name"
          value={requesterName}
          clearable
          onClear={() => handleFullNameChange('')}
          onChange={(e) => handleFullNameChange(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={requesterEmail}
          onChange={(e) => handleEmailChange(e.target.value)}
          onClear={() => handleEmailChange('')}
          clearable
          type="requesterEmail"
        />

        <Input
          placeholder="Phone Number"
          value={requesterPhone}
          clearable
          onClear={() => handlePhoneNumberChange('')}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
        />
        <SelectWrapper>
          <Select
            options={STATUS_OPTIONS_REQUEST_HISTORY}
            value={STATUS_OPTIONS_REQUEST_HISTORY.find((option) => option.value === status)}
            onChange={handleStatusChange}
            placeholder="Select status"
            isClearable
          />
        </SelectWrapper>
        <ResetButton onClick={() => handleReset()} />
      </FilterRow>
      <ResetWrapper>
        {data?.requests?.length > 0 && (
          <ExportWrapper onClick={handleExport} disabled={isLoading.exportRequestHistory}>
            <Icon src={exportSvg} alt="Export" />
            <ExportText>{isLoading.exportRequestHistory ? 'Loading...' : 'Export'}</ExportText>
          </ExportWrapper>
        )}
      </ResetWrapper>
    </FilterContainer>
  );
};

export default Filter;
