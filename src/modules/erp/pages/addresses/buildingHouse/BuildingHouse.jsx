import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import Pagination from 'common-ui/table/Pagination';

import TrashIcon from '../../../assets/trash.svg';
import {
  addBuildingHouse,
  deleteBuildingHouse,
  getAdministrativeDistricts,
  getBuildingHouses,
  getCities,
  getCountries,
  getRegions,
  getStreets,
  updateBuildingHouse,
} from '../../../features/main/mainActions';
import EditIcon from '../edit.svg';
import {
  BuildingHouseContainer,
  BuildingHouseInfo,
  BuildingHouseItem,
  BuildingHouseName,
  BuildingHousesList,
  ButtonWrapper,
  DataColumn,
  HeaderColumn,
  IconButton,
  IconsContainer,
  LightTooltip,
  PaginationWrapper,
  Row,
  SelectContainer,
  SelectWrapper,
  TableHeader,
} from './BuildingHouse.styles';
import { createBuildingHouseCreateSchema, createBuildingHouseFormSchema } from './schema';
import { useBuildingHouseSearchParams } from './useBuildingHouseSearchParams';

const BuildingHouse = () => {
  const dispatch = useDispatch();
  const {
    buildingHouses,
    countries,
    regions,
    cities,
    streets,
    administrativeDistricts,
    loading,
  } = useSelector((state) => state.main);
  const { searchData, setBuildingHouseSearchData } = useBuildingHouseSearchParams();
  const {
    currentPage,
    limit: rowsPerPage,
    selectedCountry,
    selectedRegion,
    selectedCity,
    selectedStreet,
  } = searchData;

  const [localSelectedCountry, setLocalSelectedCountry] = useState(selectedCountry);
  const [localSelectedRegion, setLocalSelectedRegion] = useState(selectedRegion);
  const [localSelectedCity, setLocalSelectedCity] = useState(selectedCity);
  const [localSelectedStreet, setLocalSelectedStreet] = useState(selectedStreet);
  const [modalCountry, setModalCountry] = useState(null);
  const [modalRegion, setModalRegion] = useState(null);
  const [modalCity, setModalCity] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuildingHouse, setEditingBuildingHouse] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [buildingHouseToDelete, setBuildingHouseToDelete] = useState(null);
  const [regionOptions, setRegionOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [streetOptions, setStreetOptions] = useState([]);
  const [modalRegionOptions, setModalRegionOptions] = useState([]);
  const [modalCityOptions, setModalCityOptions] = useState([]);
  const [modalStreetOptions, setModalStreetOptions] = useState([]);
  const [modalDistrictOptions, setModalDistrictOptions] = useState([]);

  const formResolver = useMemo(
    () =>
      yupResolver(
        isEditMode
          ? createBuildingHouseFormSchema(buildingHouses)
          : createBuildingHouseCreateSchema(buildingHouses)
      ),
    [buildingHouses, isEditMode]
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: formResolver,
    defaultValues: {
      buildingHouseName: '',
      country: null,
      region: null,
      city: null,
      street: null,
      district: null,
      comment: '',
      id: null,
    },
  });

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingBuildingHouse(null);
    setModalCountry(selectedCountry || null);
    setModalRegion(selectedRegion || null);
    setModalCity(selectedCity || null);
    reset({
      buildingHouseName: '',
      country: selectedCountry || null,
      region: selectedRegion || null,
      city: selectedCity || null,
      street: selectedStreet || null,
      district: null,
      comment: '',
      id: null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingBuildingHouse(null);
    setModalCountry(null);
    setModalRegion(null);
    setModalCity(null);
    setModalRegionOptions([]);
    setModalCityOptions([]);
    setModalStreetOptions([]);
    reset({
      buildingHouseName: '',
      country: null,
      region: null,
      city: null,
      street: null,
      district: null,
      comment: '',
      id: null,
    });
  };

  const onSubmit = async (data) => {
    if (!isEditMode && !data.street) {
      return;
    }

    if (isEditMode && editingBuildingHouse) {
      const street = selectedStreet || {
        value: editingBuildingHouse.street?.id,
        label: editingBuildingHouse.street?.name,
      };

      const administrativeDistrict = editingBuildingHouse.district?.id
        ? {
            value: editingBuildingHouse.district.id,
            label: editingBuildingHouse.district.name,
          }
        : null;

      await dispatch(
        updateBuildingHouse({
          id: editingBuildingHouse.id,
          name: data.buildingHouseName,
          street,
          administrativeDistrict,
          comment: data.comment,
        })
      );
    } else {
      await dispatch(
        addBuildingHouse({
          name: data.buildingHouseName,
          street: data.street,
          administrativeDistrict: data.district,
          comment: data.comment,
        })
      );
    }

    if (selectedStreet) {
      dispatch(getBuildingHouses({ streetId: selectedStreet.value }));
    } else if (selectedCity) {
      dispatch(getBuildingHouses({ districtId: null }));
    }
    handleCloseModal();
  };

  const handleEdit = (buildingHouse) => {
    setIsEditMode(true);
    setEditingBuildingHouse(buildingHouse);
    setValue('buildingHouseName', buildingHouse.name);
    setValue('country', buildingHouse.country || null);
    setValue('region', buildingHouse.region || null);
    setValue('city', buildingHouse.city || null);
    setValue('street', buildingHouse.street || null);
    setValue('district', buildingHouse.district || null);
    setValue('comment', buildingHouse.comment || '');
    setValue('id', buildingHouse.id);
    setModalCountry(buildingHouse.country || null);
    setModalRegion(buildingHouse.region || null);
    setModalCity(buildingHouse.city || null);
    setIsModalOpen(true);
  };

  const handleDelete = (buildingHouse) => {
    setBuildingHouseToDelete(buildingHouse);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (buildingHouseToDelete) {
      await dispatch(deleteBuildingHouse(buildingHouseToDelete.id));
      if (selectedStreet) {
        dispatch(getBuildingHouses({ streetId: selectedStreet.value }));
      } else if (selectedCity) {
        dispatch(getBuildingHouses({ districtId: null }));
      }
    }
    setIsDeleteModalOpen(false);
    setBuildingHouseToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBuildingHouseToDelete(null);
  };

  const filteredBuildingHouses = selectedStreet || selectedCity ? buildingHouses : [];

  const totalPages = Math.ceil(filteredBuildingHouses.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentBuildingHouses = filteredBuildingHouses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setBuildingHouseSearchData({ currentPage: page });
  };

  const handleRowCountChange = (newRowCount) => {
    setBuildingHouseSearchData({ limit: newRowCount, currentPage: 1 });
  };

  const handleCountryChange = (selectedOption) => {
    setLocalSelectedCountry(selectedOption);
    setLocalSelectedRegion(null);
    setLocalSelectedCity(null);
    setLocalSelectedStreet(null);
    setBuildingHouseSearchData({
      selectedCountry: selectedOption,
      selectedRegion: null,
      selectedCity: null,
      selectedStreet: null,
      currentPage: 1,
    });
  };

  const handleRegionChange = (selectedOption) => {
    setLocalSelectedRegion(selectedOption);
    setLocalSelectedCity(null);
    setLocalSelectedStreet(null);
    setBuildingHouseSearchData({
      selectedRegion: selectedOption,
      selectedCity: null,
      selectedStreet: null,
      currentPage: 1,
    });
  };

  const handleCityChange = (selectedOption) => {
    setLocalSelectedCity(selectedOption);
    setLocalSelectedStreet(null);
    setBuildingHouseSearchData({
      selectedCity: selectedOption,
      selectedStreet: null,
      currentPage: 1,
    });
  };

  const handleStreetChange = (selectedOption) => {
    setLocalSelectedStreet(selectedOption);
    setBuildingHouseSearchData({ selectedStreet: selectedOption, currentPage: 1 });
  };

  const handleModalCountryChange = (selectedOption) => {
    setModalCountry(selectedOption);
    setModalRegion(null);
    setModalCity(null);
    setValue('country', selectedOption);
    setValue('region', null);
    setValue('city', null);
    setValue('street', null);
  };

  const handleModalRegionChange = (selectedOption) => {
    setModalRegion(selectedOption);
    setModalCity(null);
    setValue('region', selectedOption);
    setValue('city', null);
    setValue('street', null);
  };

  const handleModalCityChange = (selectedOption) => {
    setModalCity(selectedOption);
    setValue('city', selectedOption);
    setValue('street', null);
  };

  const loadCountries = async (inputValue = '') => {
    try {
      const options = countries.map((country) => ({
        value: country.id,
        label: country.name,
      }));

      if (inputValue) {
        return options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      }

      return options;
    } catch (error) {
      console.error('Error loading countries:', error);
      return [];
    }
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStreet || selectedCity) {
      const params = {};
      if (selectedStreet) params.streetId = selectedStreet.value;
      if (selectedCity && !selectedStreet) {
        params.districtId = null;
      }
      if (params.streetId || params.districtId !== undefined) {
        dispatch(getBuildingHouses(params));
      }
    }
  }, [dispatch, selectedStreet, selectedCity]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(getRegions({ countryId: selectedCountry.value }));
    }
  }, [dispatch, selectedCountry]);

  useEffect(() => {
    setLocalSelectedCountry(selectedCountry);
    setLocalSelectedRegion(selectedRegion);
    setLocalSelectedCity(selectedCity);
    setLocalSelectedStreet(selectedStreet);
  }, [selectedCountry, selectedRegion, selectedCity, selectedStreet]);

  useEffect(() => {
    if (!selectedCountry) {
      setRegionOptions([]);
      return;
    }

    const options = regions.map((region) => ({
      value: region.id,
      label: region.name,
    }));

    setRegionOptions(options);
  }, [selectedCountry, regions]);

  useEffect(() => {
    if (selectedRegion) {
      dispatch(getCities({ regionId: selectedRegion.value }));
    }
  }, [dispatch, selectedRegion]);

  useEffect(() => {
    if (!selectedRegion) {
      setCityOptions([]);
      return;
    }

    const options = cities.map((city) => ({
      value: city.id,
      label: city.name,
    }));

    setCityOptions(options);
  }, [selectedRegion, cities]);

  useEffect(() => {
    if (selectedCity) {
      dispatch(getStreets({ cityId: selectedCity.value }));
    }
  }, [dispatch, selectedCity]);

  useEffect(() => {
    if (!selectedCity) {
      setStreetOptions([]);
      return;
    }

    const options = streets.map((street) => ({
      value: street.id,
      label: street.name,
    }));

    setStreetOptions(options);
  }, [selectedCity, streets]);

  useEffect(() => {
    if (!modalCountry) {
      setModalRegionOptions([]);
      return;
    }

    const filteredRegions = regions.filter(
      (region) => region.country?.id === modalCountry.value
    );

    const options = filteredRegions.map((region) => ({
      value: region.id,
      label: region.name,
    }));

    setModalRegionOptions(options);
  }, [modalCountry, regions]);

  useEffect(() => {
    if (!modalRegion) {
      setModalCityOptions([]);
      return;
    }

    const filteredCities = cities.filter((city) => city.region?.id === modalRegion.value);

    const options = filteredCities.map((city) => ({
      value: city.id,
      label: city.name,
    }));

    setModalCityOptions(options);
  }, [modalRegion, cities]);

  useEffect(() => {
    if (!modalCity) {
      setModalStreetOptions([]);
      return;
    }

    const filteredStreets = streets.filter((street) => street.city?.id === modalCity.value);

    const options = filteredStreets.map((street) => ({
      value: street.id,
      label: street.name,
    }));

    setModalStreetOptions(options);
  }, [modalCity, streets]);

  useEffect(() => {
    if (modalCity) {
      dispatch(getAdministrativeDistricts({ cityId: modalCity.value }));
    }
  }, [dispatch, modalCity]);

  useEffect(() => {
    if (!modalCity) {
      setModalDistrictOptions([]);
      return;
    }

    const options = administrativeDistricts.map((district) => ({
      value: district.id,
      label: district.name,
    }));

    setModalDistrictOptions(options);
  }, [modalCity, administrativeDistricts]);

  return (
    <BuildingHouseContainer>
      <SelectContainer>
        <SelectWrapper>
          <AsyncSelect
            loadOptions={loadCountries}
            defaultOptions
            value={localSelectedCountry}
            onChange={handleCountryChange}
            placeholder="Ընտրել երկիրը"
            isClearable
            width="232px"
          />
        </SelectWrapper>
        <SelectWrapper>
          <AsyncSelect
            loadOptions={() => Promise.resolve(regionOptions)}
            defaultOptions={regionOptions}
            value={localSelectedRegion}
            onChange={handleRegionChange}
            placeholder="Ընտրել շրջանը"
            isClearable
            isDisabled={!localSelectedCountry}
            width="232px"
          />
        </SelectWrapper>
        <SelectWrapper>
          <AsyncSelect
            loadOptions={() => Promise.resolve(cityOptions)}
            defaultOptions={cityOptions}
            value={localSelectedCity}
            onChange={handleCityChange}
            placeholder="Ընտրել քաղաքը/գյուղը"
            isClearable
            isDisabled={!localSelectedRegion}
            width="232px"
          />
        </SelectWrapper>
        <SelectWrapper>
          <AsyncSelect
            loadOptions={() => Promise.resolve(streetOptions)}
            defaultOptions={streetOptions}
            value={localSelectedStreet}
            onChange={handleStreetChange}
            placeholder="Ընտրել փողոցը"
            isClearable
            isDisabled={!selectedCountry}
            width="232px"
          />
        </SelectWrapper>
      </SelectContainer>

      <ButtonWrapper>
        <Button width="167px" secondary onClick={handleOpenModal} style={{ height: '38px' }}>
          +Ստեղծել շենք/տուն
        </Button>
      </ButtonWrapper>

      <BuildingHousesList>
        {currentBuildingHouses.length > 0 && (
          <TableHeader>
            <HeaderColumn $flex="2">Տուն</HeaderColumn>
            <HeaderColumn $flex="2">Վարչական շրջան</HeaderColumn>
            <HeaderColumn $flex="3">Մեկնաբանություն</HeaderColumn>
            <HeaderColumn $flex="1" $align="center">
              Գործողություններ
            </HeaderColumn>
          </TableHeader>
        )}
        {currentBuildingHouses.map((buildingHouse) => (
          <BuildingHouseItem key={buildingHouse.id}>
            <BuildingHouseInfo>
              <DataColumn $flex="2">
                <BuildingHouseName>{buildingHouse.name}</BuildingHouseName>
              </DataColumn>
              <DataColumn $flex="2">{buildingHouse.district?.label || '-'}</DataColumn>
              <DataColumn $flex="3">
                <LightTooltip
                  title={
                    buildingHouse.comment && buildingHouse.comment.length > 34
                      ? buildingHouse.comment
                      : ''
                  }
                  placement="top-start"
                >
                  <span>{buildingHouse.comment || '-'}</span>
                </LightTooltip>
              </DataColumn>
              <DataColumn $flex="1" $align="center">
                <IconsContainer>
                  <IconButton
                    onClick={() => handleEdit(buildingHouse)}
                    disabled={loading.updateBuildingHouse || loading.deleteBuildingHouse}
                  >
                    <img src={EditIcon} alt="icon" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(buildingHouse)}
                    disabled={loading.updateBuildingHouse || loading.deleteBuildingHouse}
                  >
                    <img src={TrashIcon} alt="icon" />
                  </IconButton>
                </IconsContainer>
              </DataColumn>
            </BuildingHouseInfo>
          </BuildingHouseItem>
        ))}
      </BuildingHousesList>

      {filteredBuildingHouses.length > 10 && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            dataCount={filteredBuildingHouses.length}
            count={rowsPerPage}
            editableRowCount={true}
            handleRowCountChange={handleRowCountChange}
          />
        </PaginationWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOk={handleSubmit(onSubmit)}
        width="436px"
        footer={false}
        title={isEditMode ? 'Խմբագրել' : undefined}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isEditMode && (
            <>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    loadOptions={loadCountries}
                    defaultOptions
                    placeholder="Ընտրել երկիրը"
                    isClearable
                    label="Ընտրել երկիր"
                    width="100%"
                    req
                    $error={errors.country?.message}
                    menuPlacement="bottom"
                    onChange={handleModalCountryChange}
                  />
                )}
              />
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    loadOptions={() => Promise.resolve(modalRegionOptions)}
                    defaultOptions={modalRegionOptions}
                    placeholder="Ընտրել շրջանը"
                    isClearable
                    isDisabled={!modalCountry}
                    label="Ընտրել շրջան"
                    width="100%"
                    req
                    $error={errors.region?.message}
                    menuPlacement="bottom"
                    onChange={handleModalRegionChange}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    loadOptions={() => Promise.resolve(modalCityOptions)}
                    defaultOptions={modalCityOptions}
                    placeholder="Ընտրել քաղաքը/գյուղը"
                    isClearable
                    isDisabled={!modalCountry}
                    label="Ընտրել քաղաք/գյուղ"
                    width="100%"
                    req
                    $error={errors.city?.message}
                    menuPlacement="bottom"
                    onChange={handleModalCityChange}
                  />
                )}
              />
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    loadOptions={() => Promise.resolve(modalStreetOptions)}
                    defaultOptions={modalStreetOptions}
                    placeholder="Ընտրել փողոցը"
                    isClearable
                    isDisabled={!modalCountry}
                    label="Ընտրել փողոց"
                    width="100%"
                    req
                    $error={errors.street?.message}
                    menuPlacement="bottom"
                  />
                )}
              />
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    loadOptions={() => Promise.resolve(modalDistrictOptions)}
                    defaultOptions={modalDistrictOptions}
                    placeholder="Ընտրել շրջանը"
                    isClearable
                    isDisabled={!modalCountry}
                    label="Կցել վարչական շրջանը"
                    width="100%"
                    $error={errors.district?.message}
                    menuPlacement="bottom"
                  />
                )}
              />
            </>
          )}
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Մեկնաբանություն"
                placeholder="Ավելացրել մեկնաբանություն"
                error={errors.comment?.message}
                multiline
                rows={3}
              />
            )}
          />
          <Controller
            name="buildingHouseName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={isEditMode ? 'Խմբագրել շենք/տուն' : 'Ստեղծել շենք/տուն'}
                placeholder="Շենքի/տան անունը"
                required
                error={errors.buildingHouseName?.message}
              />
            )}
          />
          <Row>
            <Button
              type="button"
              outlined
              onClick={handleCloseModal}
              disabled={loading.addBuildingHouse || loading.updateBuildingHouse}
            >
              Չեղարկել
            </Button>
            <Button
              type="submit"
              secondary
              disabled={loading.addBuildingHouse || loading.updateBuildingHouse}
            >
              {loading.addBuildingHouse || loading.updateBuildingHouse
                ? 'Loading...'
                : 'Հաստատել'}
            </Button>
          </Row>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        width="436px"
        footer={false}
        title="Ջնջել շենքը/տունը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
          }}
        >
          Համոզված եք,որ ցանկանում եք ջնջել այս շենքը/տունը
        </p>
        <Row>
          <Button type="button" outlined onClick={handleCancelDelete}>
            Չեղարկել
          </Button>
          <Button type="button" secondary onClick={handleConfirmDelete}>
            Ջնջել
          </Button>
        </Row>
      </Modal>
    </BuildingHouseContainer>
  );
};

export default BuildingHouse;
