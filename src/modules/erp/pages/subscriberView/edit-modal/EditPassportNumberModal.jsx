import { useEffect } from 'react';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { Select } from 'common-ui/select';
import { CharacterCount } from 'common-ui/textArea/TextArea.styles';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updatePassport } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { passportNumberModalSchema } from '../schema';

const passportTypeOptions = [
  { value: 'ARMENIAN_PASSPORT', label: 'Armenian Passport' },
  { value: 'ARMENIAN_ID_CARD', label: 'Armenian ID Card' },
  { value: 'FOREIGN_PASSPORT', label: 'Foreign Passport' },
];

const EditPassportNumberModal = ({ isOpen, onClose, customerId, passportData, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passportNumberModalSchema),
    defaultValues: {
      type: passportData?.type || '',
      number: passportData?.number || '',
    },
  });

  const watchedType = useWatch({ control, name: 'type' });

  const handleSubmitPassport = async (data) => {
    try {
      const result = await dispatch(
        updatePassport({
          id: customerId,
          passportData: {
            type: data.type,
            number: data.number,
            issueDate: passportData?.issueDate,
            issuerCode: passportData?.issuerCode,
            address: passportData?.address,
          },
        })
      ).unwrap();

      notifySuccess('Passport number updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating passport:', error);
      notifyError(error || 'Failed to update passport');
    }
  };

  useEffect(() => {
    if (isOpen && passportData) {
      reset({
        type: passportData.type || '',
        number: passportData.number || '',
      });
    }
  }, [isOpen, passportData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitPassport)}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Անձնագրի տեսակ"
              options={passportTypeOptions}
              error={errors.type?.message}
              req={true}
              menuPlacement="bottom"
              value={
                passportTypeOptions.find((option) => option.value === field.value) || null
              }
              onChange={(selectedOption) => field.onChange(selectedOption?.value)}
            />
          )}
        />

        <Controller
          name="number"
          control={control}
          render={({ field }) => {
            const getNumberFieldProps = () => {
              switch (watchedType) {
                case 'ARMENIAN_ID_CARD':
                  return {
                    label: 'ID քարտի համար',
                    placeholder: 'ID քարտի համար',
                    characterCount: '9 նիշ թվային կոդ',
                  };
                case 'ARMENIAN_PASSPORT':
                  return {
                    label: 'ԱՆձնագրի համար',
                    placeholder: 'ԱՆձնագրի համար',
                    characterCount: '2 լատինատառ, 7թվանշան',
                  };
                case 'FOREIGN_PASSPORT':
                  return {
                    label: 'Օտարերկրյա անձնագրի համար',
                    placeholder: 'Օտարերկրյա անձնագրի համար',
                    characterCount: '',
                  };
                default:
                  return {
                    label: 'Անձնագրի համար',
                    placeholder: 'Անձնագրի համար',
                    characterCount: '',
                  };
              }
            };

            const fieldProps = getNumberFieldProps();

            return (
              <InputWrapper>
                <Input
                  {...field}
                  label={fieldProps.label}
                  placeholder={fieldProps.placeholder}
                  error={errors.number?.message}
                  required
                />
                {fieldProps.characterCount && (
                  <CharacterCount>{fieldProps.characterCount}</CharacterCount>
                )}
              </InputWrapper>
            );
          }}
        />

        <Row>
          <Button outlined onClick={onClose} disabled={isSubmitting}>
            Չեղարկել
          </Button>
          <Button secondary type="submit" loading={isSubmitting}>
            Հաստատել
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditPassportNumberModal;
