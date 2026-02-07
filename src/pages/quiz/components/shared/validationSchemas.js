import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Category name is required')
    .min(2, 'Category name must be at least 2 characters')
    .max(100, 'Category name must not exceed 100 characters'),
  description: Yup.string().max(80, 'Description must not exceed 80 characters'),
  teamUuids: Yup.array()
    .min(1, 'At least one team is required')
    .required('Team selection is required'),
  status: Yup.string().required('Status is required'),
});

export const subCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Subcategory name is required')
    .min(2, 'Subcategory name must be at least 2 characters')
    .max(100, 'Subcategory name must not exceed 100 characters'),
  description: Yup.string().max(80, 'Description must not exceed 80 characters'),
  status: Yup.string().required('Status is required'),
});

export const quizSchema = Yup.object().shape({
  title: Yup.string()
    .required('Quiz title is required')
    .min(2, 'Quiz title must be at least 2 characters')
    .max(200, 'Quiz title must not exceed 200 characters'),
  description: Yup.string().max(80, 'Description must not exceed 80 characters'),
  passingScore: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('Passing score must be a number')
    .required('Passing score is required')
    .min(1, 'Passing score must be at least 1')
    .max(100, 'Passing score must not exceed 100'),
  passingScoreType: Yup.string().required('Passing score type is required'),
  status: Yup.string().required('Status is required'),
  timeLimitSeconds: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(1, 'Time limit must be at least 1 second'),
});
