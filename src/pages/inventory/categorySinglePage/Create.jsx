import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import DragDropUploadFile from 'common-ui/dragDropUploadFile';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Select from 'common-ui/select/Select';
import {
  CURRENCY_OPTIONS,
  LIFESPAN_OPTIONS,
  UNIT_OPTIONS,
  USAGE_OPTIONS,
} from 'constants/constants';
import {
  createCategoryItem,
  editCategoryItem,
  getCategoryItems,
} from 'features/inventory/inventoryActions';
import { createFormData } from 'utils';
import * as Yup from 'yup';

import errorIcon from '../../../common-ui/input/assets/error.svg';
import {
  BtnWrapper,
  BtnWrapperTop,
  Form,
  IconValidation,
  Lifespan,
  NameQuantityBox,
  PhotoError,
  UsageLifespanBox,
} from './CategorySinglePage.styles';
import { useCategoryItemSearchData } from './filter/useSearchData';

const schema = Yup.object().shape({
  name: Yup.string().required('Item name is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .max(50000, 'Quantity must not be greater than 50000'),
  usage: Yup.object()
    .required('Usage is required')
    .shape({
      value: Yup.string().required('Invalid usage value'),
      label: Yup.string().required('Invalid usage label'),
    }),
  lifespan: Yup.object()
    .required('Lifespan is required')
    .shape({
      value: Yup.string().required('Invalid lifespan value'),
      label: Yup.string().required('Invalid lifespan label'),
    }),
  photos: Yup.array().required('Photo is required'),
  costCurrency: Yup.object()
    .shape({
      value: Yup.string().required('Invalid currency value'),
      label: Yup.string().required('Invalid currency label'),
    })
    .nullable(),
  unitOfMeasurement: Yup.object()
    .shape({
      value: Yup.string().required('Invalid unit value'),
      label: Yup.string().required('Invalid unit label'),
    })
    .nullable(),
});

const Create = ({ isEdit = false, editItem = null, onCloseEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');
  const { searchData } = useCategoryItemSearchData();
  const year = Array.from({ length: 100 }, (_, i) => ({
    label: i + 1,
    value: i + 1,
  }));
  const months = Array.from({ length: 11 }, (_, i) => ({
    label: i + 1,
    value: i + 1,
  }));

  const days = Array.from({ length: 29 }, (_, i) => ({
    label: i + 1,
    value: i + 1,
  }));

  const { uuid } = useParams();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      usage: null,
      lifespan: null,
      quantity: null,
      providerData: '',
      cost: null,
      costCurrency: CURRENCY_OPTIONS[0],
      unitOfMeasurement: UNIT_OPTIONS[3],
      lifespanYears: null,
      lifespanMonths: null,
      lifespanDays: null,
    },
    shouldFocusError: false,
  });
  const lifespan = watch('lifespan');
  const cost = watch('cost');
  const handleOpenCreateModal = () => {
    if (!isEdit) {
      reset({
        name: '',
        quantity: null,
        usage: null,
        lifespan: null,
        photos: [],
        providerData: '',
        cost: null,
        costCurrency: CURRENCY_OPTIONS[0],
        unitOfMeasurement: UNIT_OPTIONS[3],
        lifespanYears: null,
        lifespanMonths: null,
        lifespanDays: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const onSubmit = (data) => {
    const {
      lifespan,
      name,
      photos,
      quantity,
      usage,
      providerData,
      cost,
      costCurrency,
      unitOfMeasurement,
      lifespanYears,
      lifespanMonths,
      lifespanDays,
    } = data;

    const payload = {
      lifespan: lifespan.value,
      usage: usage.value,
      name,
      quantity,
      photos,
      providerData,
      ...(cost && { cost }),
      costCurrency: costCurrency?.value,
      unitOfMeasurement: unitOfMeasurement?.value,
    };

    if (lifespanDays) {
      payload.lifespanDays = lifespanDays?.value ?? null;
    }

    if (lifespanYears) {
      payload.lifespanYears = lifespanYears?.value ?? null;
    }

    if (lifespanMonths) {
      payload.lifespanMonths = lifespanMonths?.value ?? null;
    }

    const formData = new FormData();
    const body = createFormData(formData, payload);

    if (isEdit && editItem) {
      dispatch(editCategoryItem({ uuid: editItem.uuid, body })).then(() => {
        dispatch(getCategoryItems({ uuid, params: searchData }));
      });
    } else {
      dispatch(createCategoryItem({ body, uuid })).then(() => {
        dispatch(getCategoryItems({ uuid, params: searchData }));
      });
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (isEdit && editItem) {
      reset({
        name: editItem.name || '',
        quantity: editItem.totalCount || 0,
        usage: USAGE_OPTIONS.find((opt) => opt.value === editItem.usage) || null,
        lifespan: LIFESPAN_OPTIONS.find((opt) => opt.value === editItem.lifespan) || null,
        photos: editItem.photos,
        providerData: editItem.providerData || '',
        cost: editItem.cost || '',
        lifespanYears: editItem.lifespanYears && {
          value: editItem.lifespanYears,
          label: editItem.lifespanYears,
        },
        lifespanMonths: editItem.lifespanMonths && {
          value: editItem.lifespanMonths,
          label: editItem.lifespanMonths,
        },
        lifespanDays: editItem.lifespanDays && {
          value: editItem.lifespanDays,
          label: editItem.lifespanDays,
        },
        costCurrency: editItem.costCurrency
          ? CURRENCY_OPTIONS.find((opt) => opt.value === editItem.costCurrency)
          : CURRENCY_OPTIONS[0],
        unitOfMeasurement: editItem.unitOfMeasurement
          ? UNIT_OPTIONS.find((opt) => opt.value === editItem.unitOfMeasurement)
          : UNIT_OPTIONS[3],
      });
      setIsModalOpen(true);
    }
  }, [isEdit, editItem, reset]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setModalWidth('370px');
      } else {
        setModalWidth('430px');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <BtnWrapper>
        <BtnWrapperTop>
          <Button className="h-38" onClick={() => navigate(-1)}>
            {'<'} Back to categories
          </Button>
        </BtnWrapperTop>
        <BtnWrapperTop>
          <Button secondary onClick={handleOpenCreateModal} className="h-38">
            + Add item
          </Button>
        </BtnWrapperTop>
      </BtnWrapper>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit)}
        title={isEdit ? 'Edit Item' : 'Add Item'}
        footer={true}
        closeIcon
        maxHeight={'80%'}
        okText="Save changes"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="name"
                label="Item name"
                error={errors.name?.message}
                placeholder="Enter item name"
                maxLength={50}
                required
              />
            )}
          />
          <NameQuantityBox>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="quantity"
                  type="number"
                  label="Quantity"
                  error={errors.quantity?.message}
                  placeholder="00"
                  required
                />
              )}
            />
            <Controller
              name="unitOfMeasurement"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="usage"
                  label="Unit"
                  options={UNIT_OPTIONS}
                  $error={errors.unitOfMeasurement?.message}
                  placeholder="Select unit"
                />
              )}
            />
          </NameQuantityBox>

          <UsageLifespanBox>
            <Controller
              name="usage"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="usage"
                  label="Usage"
                  options={USAGE_OPTIONS}
                  $error={errors.usage?.message}
                  placeholder="Select usage"
                  req
                />
              )}
            />

            <Controller
              name="lifespan"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="lifespan"
                  label="Lifespan"
                  noClearablePadding
                  options={LIFESPAN_OPTIONS}
                  $error={errors.lifespan?.message}
                  placeholder="Select lifespan"
                  req
                />
              )}
            />
          </UsageLifespanBox>
          {lifespan?.value === 'Reusable' && (
            <Lifespan>
              <Controller
                name="lifespanYears"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Years"
                    options={year}
                    isClearable
                    noClearablePadding
                    $error={errors.lifespan?.message}
                    className="lifespan"
                    placeholder="Years"
                    required
                  />
                )}
              />
              <Controller
                name="lifespanMonths"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Months"
                    className="lifespan"
                    isClearable
                    options={months}
                    $error={errors.lifespan?.message}
                    placeholder="Months"
                    noClearablePadding
                    required
                  />
                )}
              />
              <Controller
                name="lifespanDays"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Days"
                    className="lifespan"
                    isClearable
                    options={days}
                    noClearablePadding
                    $error={errors.lifespan?.message}
                    placeholder="Days"
                    required
                  />
                )}
              />
            </Lifespan>
          )}

          <Controller
            name="providerData"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="usage"
                label="Provider's data"
                error={errors.providerData?.message}
                placeholder="Enter provider's data (optional)"
              />
            )}
          />
          <UsageLifespanBox>
            <Controller
              name="cost"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="usage"
                  label="Cost"
                  type="number"
                  error={errors.cost?.message}
                  placeholder="Enter cost"
                />
              )}
            />
            <Controller
              name="costCurrency"
              className="usage"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Currency"
                  className="usage"
                  options={CURRENCY_OPTIONS}
                  $error={errors.costCurrency?.message}
                  placeholder="Select currency"
                  isDisabled={!cost || cost === ''}
                />
              )}
            />
          </UsageLifespanBox>

          <Controller
            name="photos"
            control={control}
            render={({ field }) => (
              <div>
                <DragDropUploadFile
                  {...field}
                  onFilesChange={(files) => field.onChange(files)}
                  isMulti={true}
                  maxFiles={3}
                  ACCEPTED_FORMATS={{
                    'image/jpeg': ['.jpeg', '.jpg'],
                    'image/png': ['.png'],
                  }}
                  uploadDescription={'Maximum 3 files'}
                  clickTitle="Click here"
                  uploadTitle="to upload or drop image files here"
                />
                {errors.photos && (
                  <PhotoError className="form-error">
                    <IconValidation src={errorIcon} alt="error" />
                    {errors.photos.message}
                  </PhotoError>
                )}
              </div>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
