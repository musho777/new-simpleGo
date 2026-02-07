import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import exportSvg from 'assets/export.svg';
import Input from 'common-ui/input';
import ResetButton from 'common-ui/resetButton';
import { exportNewRequests } from 'features/inventory/inventoryActions';
import useDebounce from 'hooks/useDebounce';

import { ExportText, ExportWrapper, Icon } from '../NewRequests.styles';
import { useNewRequestSearchParams } from '../useSearchData';
import { FilterContainer, FilterRow, ResetWrapper } from './Filter.styles';

const Filter = ({ requests, isLoading }) => {
  const { searchData, setNewRequestSearchData, resetSearchData } = useNewRequestSearchParams();
  const dispatch = useDispatch();
  const [requesterName, setRequesterName] = useState(searchData.requesterName || '');
  const [requesterEmail, setRequesterEmail] = useState(searchData.requesterEmail || '');
  const [requesterPhone, setRequesterPhone] = useState(searchData.requesterPhone || '');
  const [first, setFirst] = useState(false);
  const handleExport = () => {
    const exportData = {
      requesterName: searchData.requesterName,
      requesterEmail: searchData.requesterEmail,
      requesterPhone: searchData.requesterPhone,
      limit: searchData.offset,
      offset: searchData.offset,
    };

    const filteredExportData = Object.fromEntries(
      Object.entries(exportData).filter(([, value]) => value !== undefined && value !== '')
    );

    dispatch(exportNewRequests(filteredExportData));
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

  const handleReset = () => {
    setFirst(false);
    setRequesterName('');
    setRequesterEmail('');
    setRequesterPhone('');
    resetSearchData();
  };

  const debouncedName = useDebounce(requesterName, 500);
  const debouncedEmail = useDebounce(requesterEmail, 500);
  const debouncedPhone = useDebounce(requesterPhone, 500);

  useEffect(() => {
    if (first) setNewRequestSearchData({ requesterName: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setNewRequestSearchData({ requesterEmail: debouncedEmail });
  }, [debouncedEmail]);

  useEffect(() => {
    if (first) setNewRequestSearchData({ requesterPhone: debouncedPhone });
  }, [debouncedPhone]);

  return (
    <FilterContainer>
      <FilterRow>
        <Input
          placeholder="Employee's Full Name"
          value={requesterName}
          onChange={(e) => handleFullNameChange(e.target.value)}
          onClear={() => handleFullNameChange('')}
          clearable
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
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          onClear={() => handlePhoneNumberChange('')}
        />
      </FilterRow>
      <ResetWrapper>
        <ResetButton onClick={() => handleReset()} />
        {requests?.length > 0 && (
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
