import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import DragDropUploadFile from 'common-ui/dragDropUploadFile';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import {
  createCategory,
  editCategory,
  getCategories,
} from 'features/inventory/inventoryActions';
import { createFormData } from 'utils';
import * as Yup from 'yup';

import errorIcon from '../../common-ui/input/assets/error.svg';
import {
  BtnWrapper,
  Form,
  IconValidation,
  PhotoError,
  ShiftControl,
} from './Inventory.styles';
import { useCategorySearchData } from './useSearchData';

const schema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  photo: Yup.mixed().required('Photo is required'),
});

const Create = ({ isEdit = false, initialData = null, onCloseEdit }) => {
  const { searchData } = useCategorySearchData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      photo: null,
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    if (initialData) {
      reset({ name: initialData.name, photo: initialData.photo });
    }
  }, [initialData, setValue]);

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    setIsModalOpen(false);
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    const formDataParams = createFormData(formData, data);

    if (isEdit && initialData?.uuid) {
      dispatch(editCategory({ uuid: initialData.uuid, body: formDataParams })).then(() => {
        dispatch(getCategories(searchData));
      });
    } else {
      dispatch(createCategory(formDataParams)).then(() => {
        dispatch(getCategories(searchData));
      });
    }

    handleCloseModal();
  };

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
      {isEdit ? (
        <ShiftControl onClick={() => handleOpenCreateModal()}>
          <img alt="Edit icon" src={EditIcon} />
        </ShiftControl>
      ) : (
        <BtnWrapper>
          <Button secondary onClick={handleOpenCreateModal} className="h-38">
            + Add category
          </Button>
        </BtnWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit)}
        title={isEdit ? 'Edit Category' : 'Create Category'}
        footer={true}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Category name"
                error={errors.name?.message}
                placeholder="Enter category name"
                maxLength={50}
                required
              />
            )}
          />

          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <div>
                <DragDropUploadFile
                  {...field}
                  onFilesChange={(files) => field.onChange(files)}
                  ACCEPTED_FORMATS={{
                    'image/jpeg': ['.jpeg', '.jpg'],
                    'image/png': ['.png'],
                  }}
                  isMulti={false}
                  maxFiles={1}
                  uploadDescription={'Only 1 photo can be added'}
                />
                {errors.photo && (
                  <PhotoError className="form-error">
                    <IconValidation src={errorIcon} alt="error" />
                    {errors.photo.message}
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
