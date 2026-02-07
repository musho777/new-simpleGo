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
  addStreet,
  deleteStreet,
  getCities,
  getCountries,
  getRegions,
  getStreets,
  updateStreet,
} from '../../../features/main/mainActions';
import EditIcon from '../edit.svg';
import {
  ButtonWrapper,
  IconButton,
  IconsContainer,
  PaginationWrapper,
  Row,
  SelectContainer,
  SelectWrapper,
  StreetContainer,
  StreetItem,
  StreetName,
  StreetsList,
} from './Street.styles';
import { createStreetCreateSchema, createStreetFormSchema } from './schema';
import { useStreetSearchParams } from './useStreetSearchParams';

const Street = () => {
  const dispatch = useDispatch();
  const { streets, countries, regions, cities, loading } = useSelector((state) => state.main);

  const { searchData, setStreetSearchData } = useStreetSearchParams();
  const {
    currentPage,
    limit: rowsPerPage,
    selectedCountry,
    selectedRegion,
    selectedCity,
  } = searchData;

  const [localSelectedCountry, setLocalSelectedCountry] = useState(selectedCountry);
  const [localSelectedRegion, setLocalSelectedRegion] = useState(selectedRegion);
  const [localSelectedCity, setLocalSelectedCity] = useState(selectedCity);
  const [modalCountry, setModalCountry] = useState(null);
  const [modalRegion, setModalRegion] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStreet, setEditingStreet] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [streetToDelete, setStreetToDelete] = useState(null);
  const [isBlockingModalOpen, setIsBlockingModalOpen] = useState(false);
  const [regionOptions, setRegionOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [modalRegionOptions, setModalRegionOptions] = useState([]);
  const [modalCityOptions, setModalCityOptions] = useState([]);

  const formResolver = useMemo(
    () =>
      yupResolver(
        isEditMode ? createStreetFormSchema(streets) : createStreetCreateSchema(streets)
      ),
    [streets, isEditMode]
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
      streetName: '',
      country: null,
      region: null,
      city: null,
      id: null,
    },
  });

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingStreet(null);
    setModalCountry(selectedCountry || null);
    setModalRegion(selectedRegion || null);
    reset({
      streetName: '',
      country: selectedCountry || null,
      region: selectedRegion || null,
      city: selectedCity || null,
      id: null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingStreet(null);
    setModalCountry(null);
    setModalRegion(null);
    setModalRegionOptions([]);
    setModalCityOptions([]);
    reset({
      streetName: '',
      country: null,
      region: null,
      city: null,
      id: null,
    });
  };

  const onSubmit = async (data) => {
    if (!isEditMode && !data.city) {
      return;
    }

    if (isEditMode && editingStreet) {
      await dispatch(
        updateStreet({
          id: editingStreet.id,
          name: data.streetName,
          city: selectedCity,
        })
      );
    } else {
      await dispatch(
        addStreet({
          name: data.streetName,
          city: data.city,
        })
      );
    }

    if (selectedCity) {
      dispatch(getStreets({ cityId: selectedCity.value }));
    }
    handleCloseModal();
  };

  const handleEdit = (street) => {
    setIsEditMode(true);
    setEditingStreet(street);
    setValue('streetName', street.name);
    setValue('country', street.country || null);
    setValue('region', street.region || null);
    setValue('city', street.city || null);
    setValue('id', street.id);
    setModalCountry(street.country || null);
    setModalRegion(street.region || null);
    setIsModalOpen(true);
  };

  const handleDelete = (street) => {
    setStreetToDelete(street);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (streetToDelete) {
      const result = await dispatch(deleteStreet(streetToDelete.id));

      if (deleteStreet.rejected.match(result)) {
        if (result.payload?.error === 'object_has_relation') {
          setIsDeleteModalOpen(false);
          setIsBlockingModalOpen(true);
          return;
        }
      } else {
        if (selectedCity) {
          dispatch(getStreets({ cityId: selectedCity.value }));
        }
      }
    }
    setIsDeleteModalOpen(false);
    setStreetToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setStreetToDelete(null);
  };

  const handleCloseBlockingModal = () => {
    setIsBlockingModalOpen(false);
    setStreetToDelete(null);
  };

  const filteredStreets = selectedCity ? streets : [];

  const totalPages = Math.ceil(filteredStreets.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentStreets = filteredStreets.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setStreetSearchData({ currentPage: page });
  };

  const handleRowCountChange = (newRowCount) => {
    setStreetSearchData({ limit: newRowCount, currentPage: 1 });
  };

  const handleCountryChange = (selectedOption) => {
    setLocalSelectedCountry(selectedOption);
    setLocalSelectedRegion(null);
    setLocalSelectedCity(null);
    setStreetSearchData({
      selectedCountry: selectedOption,
      selectedRegion: null,
      selectedCity: null,
      currentPage: 1,
    });
  };

  const handleRegionChange = (selectedOption) => {
    setLocalSelectedRegion(selectedOption);
    setLocalSelectedCity(null);
    setStreetSearchData({
      selectedRegion: selectedOption,
      selectedCity: null,
      currentPage: 1,
    });
  };

  const handleCityChange = (selectedOption) => {
    setLocalSelectedCity(selectedOption);
    setStreetSearchData({ selectedCity: selectedOption, currentPage: 1 });
  };

  const handleModalCountryChange = (selectedOption) => {
    setModalCountry(selectedOption);
    setModalRegion(null);
    setValue('country', selectedOption);
    setValue('region', null);
    setValue('city', null);
  };

  const handleModalRegionChange = (selectedOption) => {
    setModalRegion(selectedOption);
    setValue('region', selectedOption);
    setValue('city', null);
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
    if (selectedCity) {
      dispatch(getStreets({ cityId: selectedCity.value }));
    }
  }, [dispatch, selectedCity]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(getRegions({ countryId: selectedCountry.value }));
    }
  }, [dispatch, selectedCountry]);

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

  return (
    <StreetContainer>
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
      </SelectContainer>

      <ButtonWrapper>
        <Button width="167px" secondary onClick={handleOpenModal} style={{ height: '38px' }}>
          +Ստեղծել փողոց
        </Button>
      </ButtonWrapper>

      <StreetsList>
        {currentStreets.map((street) => (
          <StreetItem key={street.id}>
            <div>
              <StreetName>{street.name}</StreetName>
            </div>
            <IconsContainer>
              <IconButton
                onClick={() => handleEdit(street)}
                disabled={loading.updateStreet || loading.deleteStreet}
              >
                <img src={EditIcon} alt="icon" />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(street)}
                disabled={loading.updateStreet || loading.deleteStreet}
              >
                <img src={TrashIcon} alt="icon" />
              </IconButton>
            </IconsContainer>
          </StreetItem>
        ))}
      </StreetsList>

      {filteredStreets.length > 10 && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            dataCount={filteredStreets.length}
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
                  />
                )}
              />
            </>
          )}
          <Controller
            name="streetName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={isEditMode ? 'Խմբագրել փողոց' : 'Ստեղծել փողոց'}
                placeholder="Փողոցի անունը"
                required
                error={errors.streetName?.message}
              />
            )}
          />
          <Row>
            <Button
              type="button"
              outlined
              onClick={handleCloseModal}
              disabled={loading.addStreet || loading.updateStreet}
            >
              Չեղարկել
            </Button>
            <Button
              type="submit"
              secondary
              disabled={loading.addStreet || loading.updateStreet}
            >
              {loading.addStreet || loading.updateStreet ? 'Loading...' : 'Հաստատել'}
            </Button>
          </Row>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        width="436px"
        footer={false}
        title="Ջնջել փողոցը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
          }}
        >
          Համոզված եք,որ ցանկանում եք ջնջել այս փողոցը
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

      <Modal
        isOpen={isBlockingModalOpen}
        onClose={handleCloseBlockingModal}
        width="436px"
        footer={false}
        title="Ջնջել փողոցը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          Դուք չեք կարող ջնջել այս փողոցը, քանի որ այս փողոցի տակ կան շենքեր/տներ
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px',
          }}
        >
          <Button type="button" width="184" secondary onClick={handleCloseBlockingModal}>
            Լավ
          </Button>
        </div>
      </Modal>
    </StreetContainer>
  );
};

export default Street;
