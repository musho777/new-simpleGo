import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import InventorySwitch from 'common-ui/inventorySwitch';
import ResetButton from 'common-ui/resetButton';
import { Select } from 'common-ui/select';
import { REQUEST_ITEM_STATUS_OPTIONS } from 'constants/constants';
import dayjs from 'dayjs';
import { selectSuccess, setResetRequestItemSuccess } from 'features/inventory/inventorySlice';
import Switch from 'pages/components/switch';
import { notifySuccess } from 'utils/notifyConfig';

import { UsageSwitch } from '../Inventory.styles';
import RequestItem from '../requestItem';
import {
  Container,
  DateSelectBox,
  FilterBox,
  ResetBox,
  SearchBox,
  SelectBox,
} from './Filter.styles';
import { usePersonalInventorySearch } from './useSearchData';

const InventoryFilter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const success = useSelector(selectSuccess);
  const { searchData, setSearchData, resetSearchData } = usePersonalInventorySearch();
  const [inventoryType, setInventoryType] = useState(searchData.usage || 'Personal use');

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const isTemplatesView = searchParams.get('myTemplates') === 'true';
  const templateSearch = searchParams.get('templateSearch') || '';

  const handleTemplateSearchChange = (value) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (value.trim()) {
      currentParams.set('templateSearch', value);
    } else {
      currentParams.delete('templateSearch');
    }
    const url = `/profile/inventory?${currentParams.toString()}`;
    navigate(url, { replace: true });
  };

  const handleCloseRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  const handleResetSearchData = () => {
    setSearchData({ name: '', status: '', providedDate: '' });
    resetSearchData();
  };
  const handleChangeUsage = (e) => {
    setInventoryType(e);
    setSearchData({
      limit: 10,
      offset: 0,
      name: '',
      status: '',
      providedDate: '',
      usage: e,
    });
  };

  useEffect(() => {
    if (success.requestItem) {
      setIsRequestModalOpen(false);
      dispatch(setResetRequestItemSuccess());
      notifySuccess('Request successfully sent');
    }
  }, [success.requestItem]);

  return (
    <Container>
      <FilterBox>
        {isTemplatesView ? (
          <SearchBox>
            <Input
              clearable
              className="m-w-173 h-38"
              placeholder="Search templates..."
              value={templateSearch}
              onChange={(e) => handleTemplateSearchChange(e.target.value)}
            />
          </SearchBox>
        ) : (
          <>
            <SearchBox>
              <Input
                clearable
                className="m-w-173 h-38"
                placeholder="Search by item name"
                value={searchData.name}
                onClear={() => setSearchData({ name: '' })}
                onChange={(e) => setSearchData({ name: e.target.value })}
              />
            </SearchBox>
            <SelectBox>
              <Select
                placeholder="Status"
                options={REQUEST_ITEM_STATUS_OPTIONS}
                value={REQUEST_ITEM_STATUS_OPTIONS.find(
                  (opt) => opt.value === searchData.status
                )}
                onChange={(val) => setSearchData({ status: val?.value || '' })}
              />
            </SelectBox>
            <DateSelectBox>
              <CustomDatePicker
                placeholder="Provided date"
                height="38px"
                value={searchData.providedDate ? dayjs(searchData.providedDate) : null}
                onChange={(val) =>
                  setSearchData({
                    providedDate: val ? dayjs(val).format('YYYY-MM-DD') : '',
                  })
                }
              />
            </DateSelectBox>

            <ResetBox>
              <ResetButton onClick={handleResetSearchData} />
            </ResetBox>
          </>
        )}
      </FilterBox>
      <RequestItem isOpen={isRequestModalOpen} onClose={handleCloseRequestModal} />
      <UsageSwitch>
        <Switch
          value={searchData?.view || 'grid'}
          onSwitch={(view) => {
            setSearchData({ limit: view === 'grid' ? 8 : 10, view });
          }}
          page="users"
        />
        <InventorySwitch active={inventoryType} setActive={handleChangeUsage} />
      </UsageSwitch>
    </Container>
  );
};

export default InventoryFilter;
