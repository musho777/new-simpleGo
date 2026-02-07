import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import ApiClient from 'api/axiosClient';
import CustomDatePicker from 'common-ui/customDatePicker';
import { AsyncSelect } from 'common-ui/select';
import { USERS_PAYROLL_PERMISSIONS } from 'constants/constants';
import dayjs from 'dayjs';
import { getBranches } from 'features/branches/branchesActions';
import { getReport } from 'features/reports/reportsActions';
import { getTeams } from 'features/teams/teamsActions';
import { generateOptions } from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import { usePayrollSearchParams } from '../useSearchData';
import {
  BottomSheet,
  CalendarWrapper,
  ClearAllText,
  DescLabel,
  FiltersWrapper,
  FirstWrapper,
  Icon,
  LineWrapper,
  ResultButton,
  SelectWrapper,
  TitleWrapper,
} from './MobileFilter.styles';
import line from './line.svg';

const MobileFilter = ({ isFilterOpen, handleCloseFilter }) => {
  const { searchData, setPayrollSearchData, resetSearchData } = usePayrollSearchParams();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const dispatch = useDispatch();
  const userType = localStorage.getItem('userType');
  const departmentVisible = USERS_PAYROLL_PERMISSIONS.includes(userType);
  const branchVisible = userType === 'Branch Head';
  const teamVisible = userType === 'Team Lead';
  const handleResetAllFilters = () => {
    resetSearchData();
  };

  const handleGetFilteredReport = () => {
    dispatch(getReport(searchData));
  };

  const handleDateChange = (key) => (date) => {
    setPayrollSearchData({ [key]: formatDateTime(date, true) });
  };

  const handleDepartmentChange = (selected) => {
    setPayrollSearchData({ departmentId: selected?.value ?? '', branchId: '', teamId: '' });
  };

  const handleBranchChange = (selected) => {
    setPayrollSearchData({ branchId: selected?.value ?? '', teamId: '' });
  };

  const handleTeamChange = (selected) => {
    setPayrollSearchData({ teamId: selected?.value ?? '' });
  };

  const getDepartmentOptions = useCallback(async (searchTerm = '') => {
    try {
      const url = searchTerm
        ? `/departments/dropdown?name=${encodeURIComponent(searchTerm)}`
        : `/departments/dropdown`;

      const response = await ApiClient.get(url);
      const options = generateOptions(response.departments || []);
      setDepartmentOptions(options);
      return options;
    } catch (error) {
      console.error('Error fetching options:', error);
      return [];
    }
  }, []);

  const getBranchOptions = useCallback(
    async (searchTerm = '') => {
      try {
        const params = {
          limit: 10000,
          offset: 0,
          name: searchTerm,
        };

        if (userType !== 'Branch Head') {
          params.departmentId = searchData.departmentId;
        }

        const response = await dispatch(getBranches(params)).unwrap();
        const options = generateOptions(response.branches || []);
        setBranchOptions(options);
        return options;
      } catch (error) {
        console.error('Error fetching options:', error);
        return [];
      }
    },
    [searchData.departmentId, dispatch, userType]
  );

  const getTeamOptions = useCallback(
    async (searchTerm = '') => {
      try {
        const params = {
          limit: 10000,
          offset: 0,
          name: searchTerm,
        };

        if (userType !== 'Team Lead') {
          params.branchId = searchData.branchId;
        }

        const response = await dispatch(getTeams(params)).unwrap();
        const options = generateOptions(response.teams || []);
        setTeamOptions(options);
        return options;
      } catch (error) {
        console.error('Error fetching options:', error);
        return [];
      }
    },
    [searchData.branchId, dispatch, userType]
  );
  useEffect(() => {
    if (searchData.departmentId) {
      getDepartmentOptions();
    }
  }, [searchData.departmentId, getDepartmentOptions]);
  useEffect(() => {
    if (searchData.departmentId || userType === 'Branch Head') {
      getBranchOptions();
    }
  }, [searchData.departmentId, getBranchOptions, userType]);

  useEffect(() => {
    if (searchData.branchId || userType === 'Team Lead') {
      getTeamOptions();
    }
  }, [searchData.branchId, getTeamOptions, userType]);

  useEffect(() => {
    handleGetFilteredReport();
  }, [JSON.stringify(searchData)]);

  return (
    <>
      {isFilterOpen && (
        <BottomSheet>
          <LineWrapper>
            <Icon src={line} onClick={handleCloseFilter} />
          </LineWrapper>
          <TitleWrapper>
            <DescLabel>Filters</DescLabel>
            <ClearAllText onClick={handleResetAllFilters}>Reset</ClearAllText>
          </TitleWrapper>
          <FiltersWrapper>
            <FirstWrapper>
              <CalendarWrapper>
                <CustomDatePicker
                  value={searchData.fromDate}
                  onChange={handleDateChange('fromDate')}
                  placeholder="From date"
                  maxDate={searchData.toDate ? dayjs(searchData.toDate) : null}
                  slotProps={{
                    day: {
                      sx: {
                        '&.MuiPickersDay-today': {
                          backgroundColor: 'transparent',
                          border: 'none',
                        },
                      },
                    },
                  }}
                />
              </CalendarWrapper>
              <CalendarWrapper>
                <CustomDatePicker
                  value={searchData.toDate}
                  onChange={handleDateChange('toDate')}
                  placeholder="To date"
                  minDate={searchData.fromDate ? dayjs(searchData.fromDate) : null}
                  slotProps={{
                    day: {
                      sx: {
                        '&.MuiPickersDay-today': {
                          backgroundColor: 'transparent',
                          border: 'none',
                        },
                      },
                    },
                  }}
                />
              </CalendarWrapper>
            </FirstWrapper>

            {departmentVisible && (
              <SelectWrapper>
                <AsyncSelect
                  isClearable
                  placeholder="Department"
                  className="payroll-department-filter"
                  loadOptions={getDepartmentOptions}
                  onMenuOpen={getDepartmentOptions}
                  defaultOptions={departmentOptions}
                  value={
                    departmentOptions.find((opt) => opt.value === searchData.departmentId) ||
                    null
                  }
                  onChange={handleDepartmentChange}
                />
              </SelectWrapper>
            )}
            {((departmentVisible && searchData.departmentId) || branchVisible) && (
              <SelectWrapper>
                <AsyncSelect
                  isClearable
                  placeholder="Branch"
                  className="payroll-department-filter"
                  loadOptions={getBranchOptions}
                  onMenuOpen={getBranchOptions}
                  defaultOptions={branchOptions}
                  value={
                    branchOptions.find((opt) => opt.value === searchData.branchId) || null
                  }
                  onChange={handleBranchChange}
                />
              </SelectWrapper>
            )}
            {(((departmentVisible || branchVisible) && searchData.branchId) ||
              teamVisible) && (
              <SelectWrapper>
                <AsyncSelect
                  isClearable
                  placeholder="Team"
                  className="payroll-department-filter"
                  loadOptions={getTeamOptions}
                  onMenuOpen={getTeamOptions}
                  defaultOptions={teamOptions}
                  value={teamOptions.find((opt) => opt.value === searchData.teamId) || null}
                  onChange={handleTeamChange}
                />
              </SelectWrapper>
            )}
            <ResultButton onClick={handleCloseFilter}>Show results</ResultButton>
          </FiltersWrapper>
        </BottomSheet>
      )}
    </>
  );
};

export default MobileFilter;
