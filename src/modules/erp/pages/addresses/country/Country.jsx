import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Pagination from 'common-ui/table/Pagination';

import TrashIcon from '../../../assets/trash.svg';
import {
  addCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from '../../../features/main/mainActions';
import EditIcon from '../edit.svg';
import {
  ButtonWrapper,
  CountriesList,
  CountryContainer,
  CountryItem,
  CountryName,
  IconButton,
  IconsContainer,
  PaginationWrapper,
  Row,
} from './Country.styles';
import { createCountryFormSchema } from './schema';
import { useCountrySearchParams } from './useCountrySearchParams';

const Country = () => {
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.main);

  const { searchData, setCountrySearchData } = useCountrySearchParams();
  const { currentPage, limit: rowsPerPage } = searchData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState(null);
  const [isBlockingModalOpen, setIsBlockingModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCountryFormSchema(countries)),
    defaultValues: {
      countryName: '',
      id: null,
    },
  });

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingCountry(null);
    reset({ countryName: '', id: null });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingCountry(null);
    reset({ countryName: '', id: null });
  };

  const onSubmit = async (data) => {
    if (isEditMode && editingCountry) {
      await dispatch(updateCountry({ id: editingCountry.id, name: data.countryName }));
    } else {
      await dispatch(addCountry(data.countryName));
    }

    dispatch(getCountries());
    handleCloseModal();
  };

  const handleEdit = (country) => {
    setIsEditMode(true);
    setEditingCountry(country);
    setValue('countryName', country.name);
    setValue('id', country.id);
    setIsModalOpen(true);
  };

  const handleDelete = (country) => {
    setCountryToDelete(country);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (countryToDelete) {
      const result = await dispatch(deleteCountry(countryToDelete.id));

      if (deleteCountry.rejected.match(result)) {
        if (result.payload?.error === 'object_has_relation') {
          setIsDeleteModalOpen(false);
          setIsBlockingModalOpen(true);
          return;
        }
      } else {
        dispatch(getCountries());
      }
    }
    setIsDeleteModalOpen(false);
    setCountryToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCountryToDelete(null);
  };

  const handleCloseBlockingModal = () => {
    setIsBlockingModalOpen(false);
    setCountryToDelete(null);
  };

  const totalPages = Math.ceil(countries.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCountrySearchData({ currentPage: page });
  };

  const handleRowCountChange = (newRowCount) => {
    setCountrySearchData({ limit: newRowCount, currentPage: 1 });
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <CountryContainer>
      <ButtonWrapper>
        <Button width="167px" secondary onClick={handleOpenModal} style={{ height: '38px' }}>
          +Ստեղծել երկիր
        </Button>
      </ButtonWrapper>

      <CountriesList>
        {currentCountries.map((country) => (
          <CountryItem key={country.id}>
            <CountryName>{country.name}</CountryName>
            <IconsContainer>
              <IconButton
                onClick={() => handleEdit(country)}
                disabled={loading.updateCountry || loading.deleteCountry}
              >
                <img src={EditIcon} alt="icon" />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(country)}
                disabled={loading.updateCountry || loading.deleteCountry}
              >
                <img src={TrashIcon} alt="icon" />
              </IconButton>
            </IconsContainer>
          </CountryItem>
        ))}
      </CountriesList>

      {countries.length > 10 && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            dataCount={countries.length}
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
          <Controller
            name="countryName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={isEditMode ? 'Խմբագրել երկիր' : 'Ստեղծել երկիր'}
                placeholder="Երկրի անունը"
                maxLength={50}
                required
                error={errors.countryName?.message}
              />
            )}
          />
          <Row>
            <Button
              type="button"
              outlined
              onClick={handleCloseModal}
              disabled={loading.addCountry || loading.updateCountry}
            >
              Չեղարկել
            </Button>
            <Button
              type="submit"
              secondary
              disabled={loading.addCountry || loading.updateCountry}
            >
              {loading.addCountry || loading.updateCountry ? 'Loading...' : 'Հաստատել'}
            </Button>
          </Row>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        width="436px"
        footer={false}
        title="Ջնջել երկիրը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
          }}
        >
          Համոզված եք,որ ցանկանում եք ջնջել այս երկիրը
        </p>
        <Row>
          <Button
            type="button"
            outlined
            onClick={handleCancelDelete}
            disabled={loading.deleteCountry}
          >
            Չեղարկել
          </Button>
          <Button
            type="button"
            secondary
            onClick={handleConfirmDelete}
            disabled={loading.deleteCountry}
          >
            {loading.deleteCountry ? 'Loading...' : 'Ջնջել'}
          </Button>
        </Row>
      </Modal>

      <Modal
        isOpen={isBlockingModalOpen}
        onClose={handleCloseBlockingModal}
        width="436px"
        footer={false}
        title="Ջնջել երկիրը"
      >
        <p
          style={{
            fontSize: '14px',
            color: '#6C757D',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          Դուք չեք կարող ջնջել այս երկիրը, քանի որ այս երկրի տակ կան շրջաններ
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
    </CountryContainer>
  );
};

export default Country;
