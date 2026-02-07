import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import TextArea from 'common-ui/textArea';
import { createLeadOrder, updateOrder } from 'features/sales/salesActions';
import { selectAddOrderLoading, selectAddOrderSuccess } from 'features/sales/salesSlice';
import { generateOptions } from 'utils';
import { formatDateTime } from 'utils/dateUtils';
import * as Yup from 'yup';

import { Form, OrderInputWrapper, Row } from '../SalesLead.styles';

const schema = Yup.object().shape({
  offerName: Yup.object().required('Offer name is required'),
  count: Yup.string().required('Count is required'),
});
export const AddOrder = ({
  isModalOpen,
  handleCloseModal,
  modalWidth,
  leadId,
  offers,
  isEdit = false,
  editData = null,
  onOrderUpdate,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      count: isEdit ? editData?.count?.toString() || '' : '',
      offerName:
        isEdit && editData?.offerName
          ? {
              label: editData.offerName,
              value: editData.offerId || editData.uuid || editData.id,
            }
          : null,
      date: isEdit && editData?.preferredDate ? new Date(editData.preferredDate) : null,
      description: isEdit ? editData?.description || '' : '',
    },
    shouldFocusError: false,
  });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (isEdit) {
      const orderId = editData?.uuid || editData?.id;
      await dispatch(
        updateOrder({
          orderId,
          data: {
            offerId: data.offerName.value,
            count: parseInt(data.count),
            preferredDate: formatDateTime(data.date, true),
            description: data.description,
          },
        })
      ).unwrap();
      onOrderUpdate();
      handleCloseModal();
    } else {
      dispatch(
        createLeadOrder({
          leadId: leadId,
          data: {
            offerId: data.offerName.value,
            preferredCount: data.count,
            preferredDate: formatDateTime(data.date, true),
            description: data.description,
          },
        })
      );
    }
  };
  const success = useSelector(selectAddOrderSuccess);
  const isLoading = useSelector(selectAddOrderLoading);
  useEffect(() => {
    if (success) {
      handleCloseModal();
    }
  }, [success]);

  useEffect(() => {
    if (!isModalOpen) {
      reset();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isEdit && editData && isModalOpen) {
      reset({
        count: editData.count?.toString() || '',
        offerName: editData.offerName
          ? {
              label: editData.offerName,
              value: editData?.offerId,
            }
          : null,
        date: editData.preferredDate ? new Date(editData.preferredDate) : null,
        description: editData.description || '',
      });
    }
  }, [isEdit, editData, isModalOpen, reset]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      width={modalWidth}
      onOk={handleSubmit(onSubmit)}
      onOkLoading={isLoading}
      title={isEdit ? 'Edit Order' : 'Add an Order'}
      footer={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="offerName"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              label="Offer Name"
              $error={errors.offerName?.message}
              placeholder="Offer Name"
              maxLength={50}
              menuPlacement="bottom"
              req
              defaultOptions={generateOptions(offers)}
            />
          )}
        />
        <Row>
          <Controller
            name="count"
            control={control}
            render={({ field }) => (
              <OrderInputWrapper>
                <Input
                  {...field}
                  label="Count"
                  type="number"
                  error={errors.count?.message}
                  placeholder="Count"
                  onChange={(e) => {
                    let value = parseInt(e.target.value, 10);
                    if (value > 999999) return;
                    if (value < 0) value = 0;
                    field.onChange(value);
                  }}
                  required
                />
              </OrderInputWrapper>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <OrderInputWrapper>
                <CustomDatePicker placeholder="Date" {...field} height="45px" />
              </OrderInputWrapper>
            )}
          />
        </Row>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              label="Description"
              placeholder="Describe department"
              error={errors.description?.message}
              resizeVertical={false}
              resizeHorizontal={false}
              maxLength={250}
            />
          )}
        />
      </Form>
    </Modal>
  );
};
