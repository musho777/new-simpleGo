import { useEffect, useState } from 'react';

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
  addRegion,
  deleteRegion,
  getCountries,
  getRegions,
  updateRegion,
} from '../../../features/main/mainActions';
import EditIcon from '../edit.svg';
import {
  ButtonWrapper,
  IconButton,
  IconsContainer,
  PaginationWrapper,
  RegionContainer,
  RegionItem,
  RegionName,
  RegionsList,
  Row,
  SelectWrapper,
} from './Region.styles';
import { createRegionFormSchema } from './schema';
import { useRegionSearchParams } from './useRegionSearchParams';

const Region = () => {
  const dispatch = useDispatch();
  const { regions, countries, loading } = useSelector((state) => state.main);

  const { searchData, setRegionSearchData } = useRegionSearchParams();
  const { currentPage, limit: rowsPerPage, selectedCountry } = searchData;
  const [localSelectedCountry, setLocalSelectedCountry] = useState(selectedCountry);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [regionToDelete, setRegionToDelete] = useState(null);
  const [isBlockingModalOpen, setIsBlockingModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createRegionFormSchema(regions)),
    defaultValues: {
      regionName: '',
      country: null,
      id: null,
    },
  });

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingRegion(null);
    reset({
      regionName: '',
      country: selectedCountry || null,
      id: null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingRegion(null);
    reset({
      regionName: '',
      country: null,
      id: null,
    });
  };

  const onSubmit = async (data) => {
    if (!isEditMode && !data.country) {
      return;
    }

    if (isEditMode && editingRegion) {
      await dispatch(
        updateRegion({
          id: editingRegion.id,
          name: data.regionName,
          country: selectedCountry,
        })
      );
    } else {
      await dispatch(addRegion({ name: data.regionName, country: data.country }));
    }

    if (selectedCountry) {
      dispatch(getRegions({ countryId: selectedCountry.value }));
    }
    handleCloseModal();
  };

  const handleEdit = (region) => {
    setIsEditMode(true);
    setEditingRegion(region);
    setValue('regionName', region.name);
    setValue('country', region.country || null);
    setValue('id', region.id);
    setIsModalOpen(true);
  };

  const handleDelete = (region) => {
    setRegionToDelete(region);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (regionToDelete) {
      const result = await dispatch(deleteRegion(regionToDelete.id));
      if (deleteRegion.rejected.match(result)) {
        if (result.payload?.error === 'object_has_relation') {
          setIsDeleteModalOpen(false);
          setIsBlockingModalOpen(true);
          return;
        }
      } else {
        if (selectedCountry) {
          dispatch(getRegions({ countryId: selectedCountry.value }));
        }
      }
    }
    setIsDeleteModalOpen(false);
    setRegionToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRegionToDelete(null);
  };

  const handleCloseBlockingModal = () => {
    setIsBlockingModalOpen(false);
    setRegionToDelete(null);
  };

  const filteredRegions = selectedCountry ? regions : [];

  const totalPages = Math.ceil(filteredRegions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRegions = filteredRegions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setRegionSearchData({ currentPage: page });
  };

  const handleRowCountChange = (newRowCount) => {
    setRegionSearchData({ limit: newRowCount, currentPage: 1 });
  };

  const handleCountryChange = (selectedOption) => {
    setLocalSelectedCountry(selectedOption);
    setRegionSearchData({ selectedCountry: selectedOption, currentPage: 1 });
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
    if (selectedCountry) {
      dispatch(getRegions({ countryId: selectedCountry.value }));
    }
  }, [dispatch, selectedCountry]);

  useEffect(() => {
    setLocalSelectedCountry(selectedCountry);
  }, [selectedCountry]);

  return (
    <RegionContainer>
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
      <ButtonWrapper>
        <Button width="167px" secondary onClick={handleOpenModal} style={{ height: '38px' }}>
          +Ստեղծել շրջան
        </Button>
      </ButtonWrapper>

      <RegionsList>
        {currentRegions.map((region) => (
          <RegionItem key={region.id}>
            <div>
              <RegionName>{region.name}</RegionName>
            </div>
            <IconsContainer>
              <IconButton
                onClick={() => handleEdit(region)}
                disabled={loading.updateRegion || loading.deleteRegion}
              >
                <img src={EditIcon} alt="icon" />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(region)}
                disabled={loading.updateRegion || loading.deleteRegion}
              >
                <img src={TrashIcon} alt="icon" />
              </IconButton>
            </IconsContainer>
          </RegionItem>
        ))}
      </RegionsList>

      {filteredRegions.length > 10 && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            dataCount={filteredRegions.length}
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
                />
              )}
            />
          )}
          <Controller
            name="regionName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={isEditMode ? 'Խմբագրել շրջան' : 'Ստեղծել շրջան'}
                placeholder="Շրջանի անունը"
                required
                error={errors.regionName?.message}
              />
            )}
          />
          <Row>
            <Button
              type="button"
              outlined
              onClick={handleCloseModal}
              disabled={loading.addRegion || loading.updateRegion}
            >
              Չեղարկել
            </Button>
            <Button
              type="submit"
              secondary
              disabled={loading.addRegion || loading.updateRegion}
            >
              {loading.addRegion || loading.updateRegion ? 'Loading...' : 'Հաստատել'}
            </Button>
          </Row>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        width="436px"
        footer={false}
        title="Ջնջել շրջանը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
          }}
        >
          Համոզված եք,որ ցանկանում եք ջնջել այս շրջանը
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
        title="Ջնջել շրջանը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          Դուք չեք կարող ջնջել այս շրջանը, քանի որ այս շրջանի տակ կան քաղաքներ/գյուղեր
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
    </RegionContainer>
  );
};

export default Region;
