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
  addCity,
  deleteCity,
  getCities,
  getCountries,
  getRegions,
  updateCity,
} from '../../../features/main/mainActions';
import EditIcon from '../edit.svg';
import {
  ButtonWrapper,
  CitiesList,
  CityContainer,
  CityItem,
  CityName,
  IconButton,
  IconsContainer,
  PaginationWrapper,
  Row,
  SelectContainer,
  SelectWrapper,
} from './City.styles';
import { createCityFormSchema } from './schema';
import { useCitySearchParams } from './useCitySearchParams';

const City = () => {
  const dispatch = useDispatch();
  const { cities, countries, regions, loading } = useSelector((state) => state.main);

  const { searchData, setCitySearchData } = useCitySearchParams();
  const { currentPage, limit: rowsPerPage, selectedCountry, selectedRegion } = searchData;

  const [localSelectedCountry, setLocalSelectedCountry] = useState(selectedCountry);
  const [localSelectedRegion, setLocalSelectedRegion] = useState(selectedRegion);
  const [modalCountry, setModalCountry] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [isBlockingModalOpen, setIsBlockingModalOpen] = useState(false);
  const [regionOptions, setRegionOptions] = useState([]);
  const [modalRegionOptions, setModalRegionOptions] = useState([]);

  const formResolver = useMemo(
    () => yupResolver(createCityFormSchema(cities, isEditMode)),
    [cities, isEditMode]
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
      cityName: '',
      country: null,
      region: null,
      id: null,
    },
  });

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingCity(null);
    setModalCountry(selectedCountry || null);
    reset({
      cityName: '',
      country: selectedCountry || null,
      region: selectedRegion || null,
      id: null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingCity(null);
    setModalCountry(null);
    setModalRegionOptions([]);
    reset({
      cityName: '',
      country: null,
      region: null,
      id: null,
    });
  };

  const onSubmit = async (data) => {
    if (!isEditMode && (!data.country || !data.region)) {
      return;
    }

    if (isEditMode && editingCity) {
      await dispatch(
        updateCity({
          id: editingCity.id,
          name: data.cityName,
          region: selectedRegion,
        })
      );
    } else {
      await dispatch(
        addCity({
          name: data.cityName,
          region: data.region,
        })
      );
    }

    if (selectedRegion) {
      dispatch(getCities({ regionId: selectedRegion.value }));
    }
    handleCloseModal();
  };

  const handleEdit = (city) => {
    setIsEditMode(true);
    setEditingCity(city);
    setValue('cityName', city.name);
    setValue('country', city.country || null);
    setValue('region', city.region || null);
    setValue('id', city.id);
    setModalCountry(city.country || null);
    setIsModalOpen(true);
  };

  const handleDelete = (city) => {
    setCityToDelete(city);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (cityToDelete) {
      const result = await dispatch(deleteCity(cityToDelete.id));

      if (deleteCity.rejected.match(result)) {
        if (result.payload?.error === 'object_has_relation') {
          setIsDeleteModalOpen(false);
          setIsBlockingModalOpen(true);
          return;
        }
      } else {
        if (selectedRegion) {
          dispatch(getCities({ regionId: selectedRegion.value }));
        }
      }
    }
    setIsDeleteModalOpen(false);
    setCityToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCityToDelete(null);
  };

  const handleCloseBlockingModal = () => {
    setIsBlockingModalOpen(false);
    setCityToDelete(null);
  };

  const filteredCities = selectedRegion ? cities : [];

  const totalPages = Math.ceil(filteredCities.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCities = filteredCities.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCitySearchData({ currentPage: page });
  };

  const handleRowCountChange = (newRowCount) => {
    setCitySearchData({ limit: newRowCount, currentPage: 1 });
  };

  const handleCountryChange = (selectedOption) => {
    setLocalSelectedCountry(selectedOption);
    setLocalSelectedRegion(null);
    setCitySearchData({
      selectedCountry: selectedOption,
      selectedRegion: null,
      currentPage: 1,
    });
  };

  const handleRegionChange = (selectedOption) => {
    setLocalSelectedRegion(selectedOption);
    setCitySearchData({ selectedRegion: selectedOption, currentPage: 1 });
  };

  const handleModalCountryChange = (selectedOption) => {
    setModalCountry(selectedOption);
    setValue('country', selectedOption);
    setValue('region', null);
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
    if (selectedRegion) {
      dispatch(getCities({ regionId: selectedRegion.value }));
    }
  }, [dispatch, selectedRegion]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(getRegions({ countryId: selectedCountry.value }));
    }
  }, [dispatch, selectedCountry]);

  useEffect(() => {
    setLocalSelectedCountry(selectedCountry);
    setLocalSelectedRegion(selectedRegion);
  }, [selectedCountry, selectedRegion]);

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

  return (
    <CityContainer>
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
      </SelectContainer>

      <ButtonWrapper>
        <Button width="167px" secondary onClick={handleOpenModal} style={{ height: '38px' }}>
          +Ստեղծել քաղաք/գյուղ
        </Button>
      </ButtonWrapper>

      <CitiesList>
        {currentCities.map((city) => (
          <CityItem key={city.id}>
            <div>
              <CityName>{city.name}</CityName>
            </div>
            <IconsContainer>
              <IconButton
                onClick={() => handleEdit(city)}
                disabled={loading.updateCity || loading.deleteCity}
              >
                <img src={EditIcon} alt="icon" />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(city)}
                disabled={loading.updateCity || loading.deleteCity}
              >
                <img src={TrashIcon} alt="icon" />
              </IconButton>
            </IconsContainer>
          </CityItem>
        ))}
      </CitiesList>

      {filteredCities.length > 10 && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            dataCount={filteredCities.length}
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
                  />
                )}
              />
            </>
          )}
          <Controller
            name="cityName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={isEditMode ? 'Խմբագրել քաղաք/գյուղ' : 'Ստեղծել քաղաք/գյուղ'}
                placeholder="Քաղաքի/գյուղի անունը"
                required
                error={errors.cityName?.message}
              />
            )}
          />
          <Row>
            <Button
              type="button"
              outlined
              onClick={handleCloseModal}
              disabled={loading.addCity || loading.updateCity}
            >
              Չեղարկել
            </Button>
            <Button type="submit" secondary disabled={loading.addCity || loading.updateCity}>
              {loading.addCity || loading.updateCity ? 'Loading...' : 'Հաստատել'}
            </Button>
          </Row>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        width="436px"
        footer={false}
        title="Ջնջել քաղաքը/գյուղը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
          }}
        >
          Համոզված եք,որ ցանկանում եք ջնջել այս քաղաքը/գյուղը
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
        title="Ջնջել քաղաքը/գյուղը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          Դուք չեք կարող ջնջել այս քաղաքը/գյուղը, քանի որ այս քաղաքի/գյուղի տակ կան փողոցներ
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
    </CityContainer>
  );
};

export default City;
