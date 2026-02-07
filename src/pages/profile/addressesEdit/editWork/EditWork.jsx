import React, { useEffect, useState } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Trash from 'assets/profile/trash.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Switch from 'common-ui/switch';
import { createAddress, deleteAddress, editAddress } from 'features/profile/profileActions';
import { selectAddresses } from 'features/profile/profileSlice';
import * as Yup from 'yup';

import { TrashWrapper } from '../AddressesEdit.styles';
import {
  AddAddress,
  ButtonContainer,
  Container,
  Form,
  Group,
  Row,
  TrashIcon,
  Wrapper,
} from './EditWork.styles';

const schema = Yup.object().shape({
  addresses: Yup.array()
    .of(
      Yup.object().shape({
        address1: Yup.string()
          .min(2, 'Address 1 must contain at least 2 characters.')
          .required('Address 1 is required.'),
        address2: Yup.string()
          .nullable()
          .transform((value) => (value === '' ? null : value))
          .min(2, 'Address 2 must contain at least 2 characters.')
          .optional(),
        city: Yup.string()
          .min(2, 'City must contain at least 2 characters.')
          .required('City is required.'),
        state: Yup.string()
          .min(2, 'State must contain at least 2 characters.')
          .required('State is required.'),
        country: Yup.string()
          .min(2, 'Country must contain at least 2 characters.')
          .required('Country is required.'),
        zip: Yup.string()
          .matches(/^\d+$/, 'Zip Code must contain only numbers.')
          .min(3, 'Zip Code must contain at least 3 characters.')
          .required('Zip Code is required.'),
        disabled: Yup.boolean(),
      })
    )
    .max(5, 'You can only add up to 5 addresses.'),
});

const EditWork = ({ onEdit, onCancel, isEdit, showEditAddButton }) => {
  const { uuid } = useParams();
  const userType = localStorage.getItem('userType');
  const data = useSelector(selectAddresses);
  const workEmailData = data.work;
  const [delatedAddress, setDelatedAddress] = useState([]);

  const initialData = workEmailData
    ?.filter((item) => item.type !== 'remove')
    .map((item) => {
      return {
        address1: item.address1 ?? '',
        address2: item.address2 ?? '',
        city: item.city ?? '',
        state: item.state ?? '',
        country: item.country ?? '',
        zip: item.zip ?? '',
        disabled: item.disabled ?? '',
        addressId: item.uuid,
        isNew: item.type === 'add',
        pending: item.pending ?? false,
      };
    });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      addresses: isEdit === 'work' ? initialData : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  const [rowCount, setRowCount] = useState(fields?.length);
  const [isModified, setIsModified] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    const updatedAddresses = formData.addresses.filter((address) => {
      const initialAddress = initialData?.find((item) => item.addressId === address.addressId);

      return (
        !initialAddress ||
        address.address1 !== initialAddress.address1 ||
        address.address2 !== initialAddress.address2 ||
        address.city !== initialAddress.city ||
        address.state !== initialAddress.state ||
        address.country !== initialAddress.country ||
        address.zip !== initialAddress.zip ||
        address.disabled !== initialAddress.disabled
      );
    });

    if (updatedAddresses.length > 0) {
      if (showEditAddButton === 'edit') {
        dispatch(
          editAddress({ type: 'work', addressChanges: updatedAddresses, userType, uuid })
        );
      }

      if (showEditAddButton === 'add') {
        dispatch(createAddress({ type: 'work', addresses: updatedAddresses, userType, uuid }));
      }
    }
    if (delatedAddress.length) {
      dispatch(deleteAddress({ addressIds: delatedAddress, userType, uuid }));
    }
    onCancel();
  };

  const handleAddAddress = () => {
    onEdit();
    if (rowCount < 3 - data?.work?.length) {
      append({
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        disabled: false,
      });
      setRowCount(rowCount + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleCancel = () => {
    onCancel();
    reset();
    setRowCount(0);
  };

  const handleRemoveRow = (index) => {
    const addressId = fields[index]?.addressId;
    setDelatedAddress((prev) => [...prev, addressId]);
    remove(index);
  };

  const formValues = watch();

  useEffect(() => {
    const hasChanges = formValues.addresses?.some((address, index) => {
      const initialAddress = initialData?.find((item) => item.addressId === address.addressId);
      return (
        address.address1 !== initialAddress?.address1 ||
        address.address2 !== initialAddress?.address2 ||
        address.city !== initialAddress?.city ||
        address.state !== initialAddress?.state ||
        address.country !== initialAddress?.country ||
        address.zip !== initialAddress?.zip ||
        address.disabled !== initialAddress?.disabled
      );
    });
    setIsModified(hasChanges);
    if (deleteAddress.length) {
      setIsModified(true);
    }
  }, [formValues, initialData, delatedAddress]);

  useEffect(() => {
    if (data?.length > 0) {
      reset({
        addresses: initialData(),
      });
    } else if (showEditAddButton === 'add') {
      reset({
        addresses: [
          {
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: '',
            zip: '',
            disabled: false,
          },
        ],
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (!rowCount) setRowCount(fields?.length);
  }, [fields]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      {fields.map((field, index) => (
        <Container key={field.id}>
          <Group>
            <Controller
              name={`addresses[${index}].disabled`}
              control={control}
              render={({ field }) => (
                <Switch isOn={field.value} onToggle={() => field.onChange(!field.value)} />
              )}
            />
            {showEditAddButton === 'edit' && (
              <TrashWrapper disabled={field.pending} onClick={() => handleRemoveRow(index)}>
                <TrashIcon src={Trash} alt="Remove row" />
              </TrashWrapper>
            )}
          </Group>
          <Wrapper>
            <Row>
              <Controller
                name={`addresses[${index}].address1`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Address 1"
                    placeholder="Address 1"
                    required
                    error={errors?.addresses?.[index]?.address1?.message}
                  />
                )}
              />
              <Controller
                name={`addresses[${index}].address2`}
                control={control}
                render={({ field }) => (
                  <Input {...field} label="Address 2" placeholder="Address 2" />
                )}
              />
            </Row>
            <Row>
              <Controller
                name={`addresses[${index}].city`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="City"
                    placeholder="City"
                    required
                    error={errors?.addresses?.[index]?.city?.message}
                  />
                )}
              />
              <Controller
                name={`addresses[${index}].state`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="State"
                    placeholder="State"
                    required
                    error={errors?.addresses?.[index]?.state?.message}
                  />
                )}
              />
            </Row>

            <Row>
              <Controller
                name={`addresses[${index}].country`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Country"
                    placeholder="Country"
                    required
                    error={errors?.addresses?.[index]?.country?.message}
                  />
                )}
              />
              <Controller
                name={`addresses[${index}].zip`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Zip Code"
                    placeholder="Zip Code"
                    required
                    error={errors?.addresses?.[index]?.zip?.message}
                  />
                )}
              />
            </Row>
          </Wrapper>
        </Container>
      ))}
      {rowCount < 3 - data?.work?.length && isEdit !== 'work' && (
        <AddAddress onClick={handleAddAddress}>+ Add work address</AddAddress>
      )}
      {showEditAddButton && (
        <ButtonContainer>
          <Button type="button" outlined onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" secondary disabled={!isModified}>
            Save changes
          </Button>
        </ButtonContainer>
      )}
    </Form>
  );
};

export default EditWork;
