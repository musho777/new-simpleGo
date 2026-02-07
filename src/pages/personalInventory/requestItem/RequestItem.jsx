import React, { useEffect, useMemo, useState } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import Trash from 'assets/profile/trash.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import MyCheckbox from 'common-ui/myCheckbox';
import { AsyncSelect } from 'common-ui/select';
import {
  editItemRequest,
  editTemplateAction,
  getTemplateById,
  getTemplates,
  requestItem,
  saveTemplate,
} from 'features/inventory/inventoryActions';
import { Form } from 'pages/auth/Auth.styles';
import { TrashIcon } from 'pages/profile/languagesEdit/LanguagesEdit.styles';
import { generateOptions } from 'utils';

import {
  AddMoreButtonWrapper,
  CheckBoxTitle,
  CheckBoxWrapper,
  ControllerWrapper,
  FormRow,
  QuantityWrapper,
  Row,
  TrashWrapper,
} from './RequestItem.styles';
import { getSchema } from './schema';

const RequestItem = ({
  isOpen,
  onClose,
  isLoading,
  initialData = null,
  editTemplate = null,
}) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState({});
  const [templates, setTemplates] = useState([]);

  const [categoryOffset, setCategoryOffset] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [itemSearchTerm, setItemSearchTerm] = useState('');
  const [loadingMoreCategories, setLoadingMoreCategories] = useState(false);
  const [loadingMoreItems, setLoadingMoreItems] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const schema = useMemo(() => getSchema(saveAsTemplate), [saveAsTemplate]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      templateName: '',
      myTemplates: null,
      requests: [{ category: null, item: null, quantity: '', reason: '' }],
    },
  });
  const selectedItem = watch('requests');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'requests',
  });
  const getCategoryOptions = async (searchTerm, offset = 0, append = false) => {
    try {
      const limit = 10;
      const url = searchTerm
        ? `/inventory/category?limit=${limit}&offset=${offset}&name=${encodeURIComponent(searchTerm)}`
        : `/inventory/category?limit=${limit}&offset=${offset}`;

      const response = await ApiClient.get(url);
      const newOptions = generateOptions(response.categories || []);
      if (append) {
        const updatedOptions = [...categories, ...newOptions];
        setCategories(updatedOptions);
        setHasMoreCategories(newOptions.length === limit);
        return updatedOptions;
      } else {
        setCategories(newOptions);
        setHasMoreCategories(newOptions.length === limit);
        setCategoryOffset(0);
        setCategorySearchTerm(searchTerm || '');
        return newOptions;
      }
    } catch (error) {
      console.error('Error fetching options:', error);
      return append ? categories : [];
    }
  };

  const getItemOptions = async (
    searchTerm,
    offset = 0,
    append = false,
    categoryId = null,
    requestIndex = null
  ) => {
    try {
      if (!categoryId) return [];

      const limit = 10;
      const url = searchTerm
        ? `/inventory/category/item/${categoryId}?limit=${limit}&offset=${offset}&name=${encodeURIComponent(searchTerm)}`
        : `/inventory/category/item/${categoryId}?limit=${limit}&offset=${offset}`;

      const response = await ApiClient.get(url);
      const newOptions =
        response?.itemTypes?.map((elm) => ({
          value: elm.uuid,
          label: elm.name,
          unitOfMeasurement: elm.unitOfMeasurement,
        })) ?? [];

      if (requestIndex !== null) {
        if (append) {
          const currentItems = categoryItems[requestIndex] || [];
          const updatedOptions = [...currentItems, ...newOptions];
          setCategoryItems((prev) => ({
            ...prev,
            [requestIndex]: updatedOptions,
          }));
          setHasMoreItems(newOptions.length === limit);
          return updatedOptions;
        } else {
          setCategoryItems((prev) => ({
            ...prev,
            [requestIndex]: newOptions,
          }));
          setHasMoreItems(newOptions.length === limit);
          setItemOffset(0);
          setItemSearchTerm(searchTerm || '');
          return newOptions;
        }
      }
      return newOptions;
    } catch (error) {
      console.error('Error fetching options:', error);
      return append ? categoryItems[requestIndex] || [] : [];
    }
  };

  const getTemplateOptions = async (searchTerm) => {
    try {
      const params = {
        ...(searchTerm && { name: searchTerm }),
      };
      const response = await dispatch(getTemplates(params)).unwrap();
      const newOptions = generateOptions(response || []);
      setTemplates(newOptions);
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  };

  const handleCategoryChange = (index, selectedCategory) => {
    setValue(`requests[${index}].category`, selectedCategory);
    setValue(`requests[${index}].item`, null);
    clearErrors(`requests[${index}].category`);
    setCategoryItems((prev) => ({
      ...prev,
      [index]: [],
    }));
    setItemOffset(0);
    setHasMoreItems(true);
    setItemSearchTerm('');
  };

  const handleCategoryMenuScrollToBottom = async () => {
    if (!hasMoreCategories || loadingMoreCategories) return;

    setLoadingMoreCategories(true);
    const newOffset = categoryOffset + 10;
    setCategoryOffset(newOffset);
    await getCategoryOptions(categorySearchTerm, newOffset, true);
    setLoadingMoreCategories(false);
  };

  const handleItemMenuScrollToBottom = async (requestIndex, categoryId) => {
    if (!hasMoreItems || loadingMoreItems || !categoryId) return;

    setLoadingMoreItems(true);
    const newOffset = itemOffset + 10;
    setItemOffset(newOffset);
    await getItemOptions(itemSearchTerm, newOffset, true, categoryId, requestIndex);
    setLoadingMoreItems(false);
  };

  const handleTemplateSelection = async (selectedTemplate) => {
    try {
      setValue('myTemplates', selectedTemplate);
      const templateData = await dispatch(getTemplateById(selectedTemplate.value)).unwrap();

      if (templateData?.requestData) {
        const templateRequests = templateData.requestData.map((request) => ({
          category: request.category
            ? { label: request.category.name, value: request.category.uuid }
            : null,
          item: request.item
            ? {
                label: request.item.name,
                value: request.item.uuid,
                unitOfMeasurement: request.item.unitOfMeasurement,
              }
            : null,
          quantity: request.quantity?.toString() ?? '',
          reason: request.reason ?? '',
        }));

        reset({
          requests: templateRequests,
          myTemplates: selectedTemplate,
        });
      }
    } catch (error) {
      console.error('Error fetching template by ID:', error);
    }
  };

  const onSubmit = async (data) => {
    const { requests } = data;

    const payload = requests?.map((request) => ({
      reason: request.reason,
      quantity: +request.quantity,
      itemId: request.item.value,
    }));

    if (editTemplate?.uuid) {
      const templatePayload = {
        name: data.myTemplates.label,
        requestData: payload,
      };
      try {
        await dispatch(
          editTemplateAction({
            templateId: data.myTemplates.value,
            data: templatePayload,
          })
        ).unwrap();
        onClose();
      } catch (error) {
        console.error('Error editing template:', error);
      }
      return;
    }

    if (saveAsTemplate) {
      const templatePayload = {
        name: data.templateName,
        requestData: payload,
      };
      dispatch(saveTemplate(templatePayload));
    }

    !initialData
      ? dispatch(requestItem(payload))
      : dispatch(editItemRequest({ uuid: initialData.uuid, payload: payload[0] }));
  };

  const handleClickAddRequest = () => {
    if (fields?.length < 10) {
      append({
        category: null,
        item: null,
        quantity: '',
        reason: '',
      });
    }
  };

  const toggleSelect = () => {
    setSaveAsTemplate(!saveAsTemplate);
  };

  const handleCloseModal = () => {
    setSaveAsTemplate(false);
    reset({
      templateName: '',
      myTemplates: null,
      requests: [{ category: null, item: null, quantity: '', reason: '' }],
    });
    setCategoryItems({});
    setCategories([]);
    setCategoryOffset(0);
    setItemOffset(0);
    setHasMoreCategories(true);
    setHasMoreItems(true);
    setCategorySearchTerm('');
    setItemSearchTerm('');
    setLoadingMoreCategories(false);
    setLoadingMoreItems(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          requests: [
            {
              category: initialData.category
                ? { label: initialData.category.name, value: initialData.category.uuid }
                : null,
              item: initialData.item
                ? {
                    label: initialData.item.name,
                    value: initialData.item.uuid,
                    unitOfMeasurement: initialData.item.unitOfMeasurement,
                  }
                : null,
              quantity: initialData.quantity?.toString() ?? '',
              reason: initialData.reason ?? '',
            },
          ],
        });
      } else {
        setSaveAsTemplate(false);
        reset({
          templateName: '',
          myTemplates: null,
          requests: [{ category: null, item: null, quantity: '', reason: '' }],
        });
      }

      setCategoryOffset(0);
      setItemOffset(0);
      setHasMoreCategories(true);
      setHasMoreItems(true);
      setCategorySearchTerm('');
      setItemSearchTerm('');
      setLoadingMoreCategories(false);
      setLoadingMoreItems(false);
    }
  }, [isOpen, initialData, reset]);

  useEffect(() => {
    if (saveAsTemplate) {
      setValue('templateName', '');
    }
  }, [saveAsTemplate, setValue]);

  useEffect(() => {
    if (editTemplate) {
      handleTemplateSelection({
        label: editTemplate.name,
        value: editTemplate.uuid,
      });
    }
  }, [editTemplate]);

  return (
    <Modal
      footer
      isOpen={isOpen}
      onClose={handleCloseModal}
      height={'auto'}
      maxHeight={'90%'}
      closeIcon
      width={'600px'}
      isLoading={isLoading}
      onOk={handleSubmit(onSubmit)}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!editTemplate?.uuid && (
          <CheckBoxWrapper>
            <MyCheckbox selected={saveAsTemplate} onClick={toggleSelect} />
            <CheckBoxTitle>Save this request as a template</CheckBoxTitle>
          </CheckBoxWrapper>
        )}

        {saveAsTemplate ? (
          <Controller
            name={`templateName`}
            control={control}
            render={({ field }) => (
              <FormRow>
                <Input
                  {...field}
                  className="reason"
                  label="Template name"
                  required
                  placeholder="My main template"
                  error={errors.templateName?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    if (errors.templateName) {
                      clearErrors('templateName');
                    }
                  }}
                />
              </FormRow>
            )}
          />
        ) : (
          <Controller
            control={control}
            name={`myTemplates`}
            render={({ field }) => (
              <ControllerWrapper>
                <AsyncSelect
                  {...field}
                  maxMenuHeight={'150px'}
                  label="My Templates"
                  menuPlacement="bottom"
                  className="my-templates"
                  placeholder="Select Template"
                  loadOptions={(searchTerm) => getTemplateOptions(searchTerm)}
                  onMenuOpen={() => getTemplateOptions()}
                  defaultOptions={templates}
                  onChange={handleTemplateSelection}
                  cacheOptions={false}
                />
              </ControllerWrapper>
            )}
          />
        )}

        {fields.map((field, index) => (
          <FormRow key={field.id}>
            <Row>
              <ControllerWrapper>
                <Controller
                  name={`requests[${index}].category`}
                  control={control}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      maxMenuHeight={'150px'}
                      label="Category"
                      req
                      menuPlacement="bottom"
                      className="category-select"
                      placeholder="Select category"
                      loadOptions={(searchTerm) => getCategoryOptions(searchTerm)}
                      onMenuOpen={() => getCategoryOptions()}
                      defaultOptions={categories}
                      $error={errors.requests?.[index]?.category?.message}
                      onChange={(selectedCategory) => {
                        handleCategoryChange(index, selectedCategory);
                        clearErrors(`requests[${index}].category`);
                      }}
                      onMenuScrollToBottom={handleCategoryMenuScrollToBottom}
                      cacheOptions={false}
                    />
                  )}
                />
              </ControllerWrapper>

              <ControllerWrapper>
                <Controller
                  name={`requests[${index}].item`}
                  control={control}
                  render={({ field: { value, onBlur, name } }) => (
                    <AsyncSelect
                      value={value}
                      onBlur={onBlur}
                      name={name}
                      label="Item name"
                      req
                      maxMenuHeight={'150px'}
                      className="item-select"
                      menuPlacement="bottom"
                      placeholder="Select item"
                      loadOptions={(searchTerm) =>
                        getItemOptions(
                          searchTerm,
                          0,
                          false,
                          watch(`requests[${index}].category`)?.value,
                          index
                        )
                      }
                      onMenuOpen={() =>
                        getItemOptions(
                          '',
                          0,
                          false,
                          watch(`requests[${index}].category`)?.value,
                          index
                        )
                      }
                      defaultOptions={categoryItems[index] || []}
                      $error={errors.requests?.[index]?.item?.message}
                      onMenuScrollToBottom={() =>
                        handleItemMenuScrollToBottom(
                          index,
                          watch(`requests[${index}].category`)?.value
                        )
                      }
                      onChange={(selectedItem) => {
                        setValue(`requests[${index}].item`, selectedItem, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        clearErrors(`requests[${index}].item`);
                      }}
                      cacheOptions={false}
                    />
                  )}
                />
              </ControllerWrapper>
              <QuantityWrapper>
                <Controller
                  name={`requests[${index}].quantity`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        label="Quantity"
                        required
                        className="quantity"
                        type="number"
                        unity={selectedItem?.[index]?.item?.unitOfMeasurement}
                        padding="0 54px 0 16px"
                        placeholder="0"
                        error={errors.requests?.[index]?.quantity?.message}
                        onChange={(e) => {
                          field.onChange(e);
                          if (errors.requests?.[index]?.quantity) {
                            clearErrors(`requests[${index}].quantity`);
                          }
                        }}
                      />
                    );
                  }}
                />
              </QuantityWrapper>
            </Row>

            <Controller
              name={`requests[${index}].reason`}
              control={control}
              render={({ field }) => (
                <FormRow>
                  <Input
                    {...field}
                    className="reason"
                    label="Reason for the request"
                    placeholder="Describe the reason"
                    required
                    error={errors.requests?.[index]?.reason?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      if (errors.requests?.[index]?.reason) {
                        clearErrors(`requests[${index}].reason`);
                      }
                    }}
                  />
                  {index > 0 && (
                    <TrashWrapper>
                      <TrashIcon
                        src={Trash}
                        alt="Remove row"
                        onClick={() => remove(index)}
                        style={{ cursor: 'pointer' }}
                      />
                    </TrashWrapper>
                  )}
                </FormRow>
              )}
            />
          </FormRow>
        ))}
      </Form>
      {!initialData && fields?.length < 10 && (
        <AddMoreButtonWrapper>
          <Button type="link" onClick={handleClickAddRequest}>
            + Add another item request
          </Button>
        </AddMoreButtonWrapper>
      )}
    </Modal>
  );
};

export default RequestItem;
