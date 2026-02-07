import * as yup from 'yup';

export const getSchema = (saveAsTemplate) =>
  yup.object().shape({
    requests: yup.array().of(
      yup.object().shape({
        category: yup.mixed().required('Category is required'),
        item: yup.mixed().required('Item is required'),
        quantity: yup
          .number()
          .typeError('Quantity is required')
          .required('Quantity is required'),
        reason: yup.string().required('Reason is required'),
      })
    ),
    ...(saveAsTemplate && {
      templateName: yup
        .string()
        .required('Template name is required')
        .matches(
          /^[a-zA-Z0-9\u0530-\u058F\u0561-\u0587\u0589-\u058A,.:#+\-/'&() ]+$/,
          "Template name can only contain latin and Armenian letters, numbers, and these special characters: , . : # - / ' & ( ) space"
        ),
    }),
  });

export const schema = getSchema(false);
