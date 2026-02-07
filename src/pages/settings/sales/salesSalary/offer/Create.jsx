import { memo, useEffect, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect, Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import dayjs from 'dayjs';
import {
  createOffer,
  editOffer,
  getOffers,
  getProducts,
  getSalesScripts,
} from 'features/sales/salesActions';
import { formatDateTime } from 'utils/dateUtils';
import * as Yup from 'yup';

import {
  CountPriceCurrencyWrapper,
  DatePickerWrapper,
  Form,
  InputWrapper,
} from '../Sales.styles';

const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const schema = Yup.object().shape(
  {
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .matches(
        nameRegex,
        'Only  Latin and Armenian letters, numbers, and allowed special characters'
      ),
    salesHelpText: Yup.string().required('Sales help text is required'),

    price: Yup.string()
      .max(50, 'Price must be shorter than or equal to 50 characters')
      .when(['count', 'currency'], {
        is: (count, currency) =>
          (count && count.trim() !== '') || (currency && currency.trim() !== ''),
        then: (schema) => schema.required('Price is required'),
        otherwise: (schema) => schema.notRequired(),
      }),

    currency: Yup.string().when(['count', 'price'], {
      is: (count, price) => (count && count.trim() !== '') || (price && price.trim() !== ''),
      then: (schema) => schema.required('Currency is required'),
      otherwise: (schema) => schema.notRequired(),
    }),

    productId: Yup.object().required('Product is required'),
    salesScriptId: Yup.object().required('Sales Script is required'),
    startTime: Yup.string().required('Start date is required'),
    endTime: Yup.string().required('End date is required'),
    isEnabled: Yup.boolean(),
  },
  [['price', 'currency']]
);

const Create = ({ isEdit = false, initialData = null, onCloseEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalWidth, setModalWidth] = useState('430px');
  const [productsOptions, setProductsOptions] = useState([]);
  const [scriptsOptions, setScriptsOptions] = useState([]);
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      salesHelpText: '',
      count: '',
      location: '',
      price: '',
      currency: '',
      productId: null,
      salesScriptId: null,
      startTime: '',
      endTime: '',
      isEnabled: true,
    },
    shouldFocusError: false,
  });

  const CurrencyEnum = {
    AMD: 'AMD',
    EUR: 'EUR',
    RUB: 'RUB',
    USD: 'USD',
  };

  const currencyOptions = Object.values(CurrencyEnum).map((value) => ({
    value,
    label: value,
  }));

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const loadProducts = (e) => {
    return dispatch(getProducts({ limit: 10000, offset: 1, search: e })).then((res) => {
      const formatted = (res.payload.products || []).map((item) => ({
        value: item.uuid,
        label: item.name,
      }));
      setProductsOptions(formatted);
      return formatted;
    });
  };

  const loadSalesScripts = (e) => {
    return dispatch(getSalesScripts({ limit: 10000, offset: 1, search: e })).then((res) => {
      const formatted = (res.payload.salesScripts || []).map((item) => ({
        value: item.uuid,
        label: item.name,
      }));
      setScriptsOptions(formatted);
      return formatted;
    });
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = (data) => {
    const body = {
      name: data.name,
      description: data.description,
      salesHelpText: data.salesHelpText,
      count: data.count || null,
      price: data.price || null,
      currency: data.currency || null,
      productId: data.productId?.value,
      salesScriptId: data.salesScriptId?.value,
      startDate: formatDateTime(data.startTime, true),
      endDate: formatDateTime(data.endTime, true),
      location: data?.location || null,
      isEnabled: data.isEnabled,
    };

    const action =
      isEdit && initialData?.uuid
        ? editOffer({ uuid: initialData.uuid, body })
        : createOffer(body);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(getOffers({ limit: 10, page: 1, status: 'all' }));
        handleCloseModal();
      })
      .catch((error) => {
        if (error) {
          setError('name', {
            type: 'manual',
            message: error,
          });
          scrollToTop();
        }
      });
  };

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        location: initialData.location || '',
        salesHelpText: initialData.salesHelpText || '',
        count: initialData.count || null,
        price: initialData.price || null,
        currency: initialData.currency || '',
        productId: initialData.product
          ? {
              value: initialData.product.uuid,
              label: initialData.product.name,
            }
          : '',
        salesScriptId: initialData.salesScript
          ? {
              value: initialData.salesScript.uuid,
              label: initialData.salesScript.name,
            }
          : '',
        startTime: initialData.startDate || '',
        endTime: initialData.endDate || '',
        isEnabled: initialData.isEnabled ?? true,
      });
      if (isEdit) {
        setIsModalOpen(true);
      }
    }
  }, [initialData, reset, isEdit]);

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 500 ? '370px' : '430px');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit, scrollToTop)}
        title={isEdit ? 'Edit Offer' : 'Create Offer'}
        footer={true}
        maxHeight={'80%'}
      >
        <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                error={errors.name?.message}
                placeholder="Enter name"
                required
                maxLength={50}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Description"
                error={errors.description?.message}
                placeholder="Enter description"
                maxLength={100}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Location"
                error={errors.location?.message}
                placeholder="Enter location"
                maxLength={250}
              />
            )}
          />

          <Controller
            name="salesHelpText"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Help Text"
                required
                error={errors.salesHelpText?.message}
                placeholder="Enter Help Text"
                maxLength={250}
              />
            )}
          />
          <CountPriceCurrencyWrapper>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Input
                    {...field}
                    label="Price"
                    error={errors.price?.message}
                    placeholder="0"
                    type="number"
                    $padding="0 30px 0 16px"
                  />
                </InputWrapper>
              )}
            />
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Select
                    {...field}
                    onChange={(option) => field.onChange(option?.value ?? '')}
                    value={currencyOptions.find((opt) => opt.value === field.value) || null}
                    label="Currency"
                    placeholder="Select currency"
                    options={currencyOptions}
                    $error={errors.currency?.message}
                    $padding="0 30px 0 16px"
                    isDisabled={!watch('price') || watch('price') === ''}
                  />
                </InputWrapper>
              )}
            />
          </CountPriceCurrencyWrapper>

          <CountPriceCurrencyWrapper>
            <Controller
              name="count"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Input
                    {...field}
                    label="Count"
                    error={errors.count?.message}
                    placeholder="0"
                    type="number"
                    $padding="0 30px 0 16px"
                  />
                </InputWrapper>
              )}
            />

            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <AsyncSelect
                    {...field}
                    label="Product"
                    placeholder="Select product"
                    defaultOptions={productsOptions}
                    loadOptions={loadProducts}
                    onMenuOpen={loadProducts}
                    $error={errors.productId?.message}
                    req
                  />
                </InputWrapper>
              )}
            />
          </CountPriceCurrencyWrapper>

          <Controller
            name="salesScriptId"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                label="Sales Script"
                placeholder="Select script"
                defaultOptions={scriptsOptions}
                loadOptions={loadSalesScripts}
                onMenuOpen={loadSalesScripts}
                $error={errors.salesScriptId?.message}
                req
              />
            )}
          />

          <CountPriceCurrencyWrapper>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <DatePickerWrapper>
                  <CustomDatePicker
                    error={errors.startTime?.message}
                    label="Start Date"
                    req
                    disablePast
                    value={field.value ? dayjs(field.value) : null}
                    placeholder="Select start date"
                    onChange={(val) => field.onChange(val ? dayjs(val).toISOString() : null)}
                    maxDate={watch('endTime') ? dayjs(watch('endTime')) : null}
                  />
                </DatePickerWrapper>
              )}
            />
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <DatePickerWrapper>
                  <CustomDatePicker
                    label="End Date"
                    req
                    error={errors.endTime?.message}
                    value={field.value ? dayjs(field.value) : null}
                    placeholder="Select end date"
                    onChange={(val) => field.onChange(val ? dayjs(val).toISOString() : null)}
                    height="38px"
                    minDate={(() => {
                      const tomorrow = dayjs().add(1, 'day').startOf('day');
                      const startDate = watch('startTime') ? dayjs(watch('startTime')) : null;

                      if (!startDate) return tomorrow;

                      return startDate.isAfter(tomorrow) ? startDate : tomorrow;
                    })()}
                  />
                </DatePickerWrapper>
              )}
            />
          </CountPriceCurrencyWrapper>
          <Controller
            name="isEnabled"
            control={control}
            render={({ field }) => (
              <div style={{ marginTop: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'end',
                  }}
                >
                  <label style={{ fontSize: '14px', fontWeight: 500 }}>
                    {field.value ? 'Enabled' : 'Disabled'}
                  </label>
                  <Switch isOn={field.value} onToggle={() => field.onChange(!field.value)} />
                </div>
              </div>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
