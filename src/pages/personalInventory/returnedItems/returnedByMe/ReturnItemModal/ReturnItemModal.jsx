import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import TextArea from 'common-ui/textArea';
import {
  getCategories,
  getEmployeeReturnAvailableItems,
  returnEmployeeItem,
} from 'features/inventory/inventoryActions';
import { selectLoading } from 'features/inventory/inventorySlice';
import * as Yup from 'yup';

import { FormContainer, QuantityWrapper, UnitOfMeasurement } from './ReturnItemModal.styles';

const schema = Yup.object().shape({
  category: Yup.object().nullable().required('Type is required'),
  item: Yup.object().nullable().required('Item is required'),
  quantity: Yup.string().required('Quantity is required'),
  reason: Yup.string().required('Reason is required'),
});

const ReturnItemModal = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: null,
      item: null,
      quantity: '',
      reason: '',
    },
  });

  const watchedCategory = watch('category');
  const watchedItem = watch('item');

  useEffect(() => {
    setValue('item', null);
  }, [watchedCategory, setValue]);

  const handleCategoryChange = (selectedCategory, onChange) => {
    onChange(selectedCategory);
    setItems([]);
    setItemOffset(0);
    setHasMoreItems(true);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        returnEmployeeItem({
          categoryUuid: data.category.value,
          itemTypeUuid: data.item.value,
          quantity: parseInt(data.quantity),
          reason: data.reason || '',
        })
      ).unwrap();

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error returning item:', error);
    }
  };

  const handleClose = () => {
    reset();
    setCategories([]);
    setItems([]);
    setCategoryOffset(0);
    setItemOffset(0);
    setHasMoreCategories(true);
    setHasMoreItems(true);
    onClose();
  };

  const loadCategories = async (inputValue, isLoadMore = false, offset = 0) => {
    try {
      const response = await dispatch(
        getCategories({
          name: inputValue,
          limit: 10,
          offset: offset,
        })
      ).unwrap();

      const newCategories = response.categories || [];
      const categoryOptions = newCategories.map((elm) => ({
        value: elm.uuid,
        label: elm.name,
      }));
      if (isLoadMore && offset > 0) {
        setCategories((prev) => [...prev, ...categoryOptions]);
      } else if (offset === 0) {
        setCategories(categoryOptions);
      }
      if (response.count >= offset) {
        setCategoryOffset(offset + 10);
        setHasMoreCategories(response.count > offset);
      }
      return categoryOptions;
    } catch (error) {
      console.error('Error loading categories:', error);
      return [];
    }
  };

  const loadCategoryItems = async (inputValue, isLoadMore = false) => {
    if (!watchedCategory?.value) return [];
    try {
      const offset = isLoadMore ? itemOffset : 0;
      const response = await dispatch(
        getEmployeeReturnAvailableItems({
          categoryUuid: watchedCategory.value,
          search: inputValue,
          limit: 10000,
          offset: offset,
        })
      ).unwrap();
      const itemOptions = response.map((elm) => ({
        value: elm.itemTypeUuid,
        label: elm.itemName,
        unitOfMeasurement: elm.unitOfMeasurement,
      }));
      setItems(itemOptions);

      return itemOptions;
    } catch (error) {
      console.error('Error loading category items:', error);
      return [];
    }
  };

  const handleCategoryScrollToBottom = () => {
    if (hasMoreCategories && !loading.category) {
      loadCategories('', true, categoryOffset);
    }
  };

  const handleItemScrollToBottom = () => {
    if (hasMoreItems && !loading.employeeReturnAvailableItems && watchedCategory?.value) {
      loadCategoryItems('', true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Return Item"
      footer={true}
      onOk={handleSubmit(onSubmit)}
      okText="Return"
      okButtonProps={{ loading: loading.returnEmployeeItem }}
      cancelText="Cancel"
    >
      <FormContainer>
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AsyncSelect
              placeholder="Select Category"
              loadOptions={loadCategories}
              label="Category"
              onMenuOpen={() => loadCategories('', false)}
              onMenuScrollToBottom={handleCategoryScrollToBottom}
              value={value}
              defaultOptions={categories}
              onChange={(selectedCategory) => handleCategoryChange(selectedCategory, onChange)}
              isClearable
              cacheOptions
              req
              isLoading={loading.category}
              $error={errors.category?.message}
            />
          )}
        />
        <Controller
          name="item"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AsyncSelect
              placeholder="Select Item"
              label="Item"
              loadOptions={loadCategoryItems}
              onMenuOpen={() => loadCategoryItems('')}
              onMenuScrollToBottom={handleItemScrollToBottom}
              value={value}
              req
              onChange={onChange}
              disabled={!watchedCategory?.value}
              isClearable
              cacheOptions
              defaultOptions={items}
              key={watchedCategory?.value}
              isLoading={loading.employeeReturnAvailableItems}
              $error={errors.item?.message}
            />
          )}
        />
        <Controller
          name="quantity"
          control={control}
          render={({ field: { onChange, value } }) => (
            <QuantityWrapper>
              <Input
                type="number"
                label={`Quantity`}
                required
                placeholder="Enter quantity"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                min="1"
                error={errors.quantity?.message}
              />
              <UnitOfMeasurement>{watchedItem?.unitOfMeasurement}</UnitOfMeasurement>
            </QuantityWrapper>
          )}
        />

        <Controller
          name="reason"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              label="Reason"
              resizeHorizontal={false}
              req
              placeholder="Enter reason for return"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={4}
              error={errors.reason?.message}
            />
          )}
        />
      </FormContainer>
    </Modal>
  );
};

export default ReturnItemModal;
