import * as yup from 'yup';

export const noteSchema = yup.object().shape({
  customerId: yup.string().required('Customer ID is required').trim(),
  customerName: yup.string().required('Customer name is required').trim(),
  description: yup.string().max(250, 'Description must be at most 250 characters').trim(),
});
