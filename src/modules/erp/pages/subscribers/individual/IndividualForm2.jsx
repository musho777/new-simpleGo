import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import CustomAutocomplete from 'common-ui/customAutocomplete';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import NumberInput from 'common-ui/numberInput';
import { CharacterCount } from 'common-ui/textArea/TextArea.styles';
import useDebounce from 'hooks/useDebounce';

import ArrowIcon from '../../../assets/back.svg';
import TrashIcon from '../../../assets/trash.svg';
import {
  addCustomer,
  searchBuildings,
  searchStreets,
} from '../../../features/main/mainActions';
import {
  AddressFormContainer,
  AddressRow,
  AutocompleteWrapper,
  BackAction,
  BackTitle,
  ButtonsFormWrapper,
  CompactAddressWrapper,
  CompactInputWrapper,
  Container,
  DatePickerWrapper,
  DeleteButton,
  DeleteButtonContainer,
  FormContainer,
  FormRow,
  FormWrapper,
  FullWidthInputWrapper,
  PassportLabel,
  PhoneRow,
  SecondaryButtonWithFont,
  SmallInputsRow,
  StyledFormControl,
  Subtitle,
  Title,
  WhiteSpacer,
} from './IndividualForm.styles';
import { individualForm2Schema } from './schema';
import { useIndividualFormSearchParams } from './useIndividualFormSearchParams';

const IndividualForm2 = () => {
  const { formData, setFormSearchData } = useIndividualFormSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.main?.loading?.addCustomer || false);
  const [phoneNumbers, setPhoneNumbers] = useState(formData.phoneNumbers || []);
  const [serviceAddresses, setServiceAddresses] = useState(formData.serviceAddresses || []);
  const [streetOptions, setStreetOptions] = useState([]);
  const [streetSearchTerms, setStreetSearchTerms] = useState({});
  const debouncedStreetSearchTerms = useDebounce(streetSearchTerms, 300);
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [buildingSearchTerms, setBuildingSearchTerms] = useState({});
  const debouncedBuildingSearchTerms = useDebounce(buildingSearchTerms, 300);
  const [selectedStreetIds, setSelectedStreetIds] = useState({});
  const [selectedBuildingIds, setSelectedBuildingIds] = useState({});

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(individualForm2Schema),
    context: { passportType: formData.passportType },
    defaultValues: {
      passportType: formData.passportType || 'ARMENIAN_PASSPORT',
      passportNumber: formData.passportNumber || '',
      idCardNumber: formData.idCardNumber || '',
      issueDate: formData.issueDate ? new Date(formData.issueDate) : undefined,
      issuerCode: formData.issuerCode || '',
      address: formData.address || '',
      birthDate: formData.birthDate ? new Date(formData.birthDate) : undefined,
      location: formData.location || '',
      email: formData.email || '',
      externalId: formData.externalId || '',
      socialCardNumber: formData.socialCardNumber || '',
      notificationAddress: formData.notificationAddress || '',
      serviceAddresses: formData.serviceAddresses || [],
      phoneNumbers: formData.phoneNumbers || [],
    },
  });

  useEffect(() => {
    const searchTermsEntries = Object.entries(debouncedStreetSearchTerms);
    if (searchTermsEntries.length > 0) {
      searchTermsEntries.forEach(([index, searchTerm]) => {
        if (searchTerm && searchTerm.trim()) {
          dispatch(searchStreets(searchTerm.trim()))
            .unwrap()
            .then((data) => {
              const options = data.map((street) => ({
                value: street.name.replace(/"/g, ''),
                label: street.name.replace(/"/g, ''),
                streetId: Number(street.id),
                street: street,
              }));
              setStreetOptions((prev) => ({
                ...prev,
                [index]: options,
              }));
            })
            .catch((error) => {
              console.error('Error fetching streets:', error);
              setStreetOptions((prev) => ({
                ...prev,
                [index]: [],
              }));
            });
        }
      });
    }
  }, [debouncedStreetSearchTerms, dispatch]);

  useEffect(() => {
    const buildingSearchEntries = Object.entries(debouncedBuildingSearchTerms);
    if (buildingSearchEntries.length > 0) {
      buildingSearchEntries.forEach(([index, searchData]) => {
        if (searchData && searchData.streetId && searchData.name && searchData.name.trim()) {
          dispatch(
            searchBuildings({ streetId: searchData.streetId, name: searchData.name.trim() })
          )
            .unwrap()
            .then((data) => {
              const options = data.map((building) => ({
                value: building.name.replace(/"/g, ''),
                label: building.name.replace(/"/g, ''),
                buildingId: Number(building.id),
                building: building,
              }));
              setBuildingOptions((prev) => ({
                ...prev,
                [index]: options,
              }));
            })
            .catch((error) => {
              console.error('Error fetching buildings:', error);
              setBuildingOptions((prev) => ({
                ...prev,
                [index]: [],
              }));
            });
        }
      });
    }
  }, [debouncedBuildingSearchTerms, dispatch]);

  const onSubmit = (data) => {
    const customerData = {
      name: {
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        patronymic: formData.patronymic || '',
      },
      customerType: {
        id: 1,
        name: 'Ֆիզիկական անձ',
      },
      passportInfo: {
        type: formData.passportType || 'ARMENIAN_PASSPORT',
        number: data.passportNumber || data.idCardNumber || '',
        issueDate: data.issueDate ? data.issueDate.toISOString().split('T')[0] : '',
        issuerCode: data.issuerCode || '',
        address: data.address || '',
      },
      serviceAddresses:
        data.serviceAddresses?.map((address, index) => ({
          building: {
            id: selectedBuildingIds[index] || 0,
          },
          flat: address.flat || null,
          room: address.room || null,
          entrance: address.entrance || null,
          floor: address.floor || null,
          comment: address.comment || '',
        })) || [],
      location: data.location || '',
      email: data.email || '',
      externalId: data.externalId ? parseInt(data.externalId) : null,
      phoneNumbers: data.phoneNumbers || [],
      birthDate: data.birthDate ? data.birthDate.toISOString().split('T')[0] : '',
      socialCardNumber: data.socialCardNumber || '',
      notificationAddress: data.notificationAddress || '',
    };

    dispatch(addCustomer(customerData)).then(() => {
      navigate('/erp/subscriber');
    });
  };

  const handleFieldChange = (field) => (value) => {
    setFormSearchData({ [field]: value });
  };

  const addPhone = () => {
    if (phoneNumbers.length < 4) {
      const currentFormValues = getValues();
      const currentPhones = currentFormValues.phoneNumbers || [];

      const newPhones = [...currentPhones, { number: '', comment: '' }];
      setPhoneNumbers(newPhones);
      setValue('phoneNumbers', newPhones);
    }
  };

  const deletePhone = (index) => {
    const currentFormValues = getValues();
    const currentPhones = currentFormValues.phoneNumbers || [];
    const newPhones = currentPhones.filter((_, i) => i !== index);
    setPhoneNumbers(newPhones);
    setValue('phoneNumbers', newPhones);
  };

  const addAddress = () => {
    const currentFormValues = getValues();
    const currentAddresses = currentFormValues.serviceAddresses || [];

    const newAddresses = [
      ...currentAddresses,
      {
        streetId: '',
        buildingId: '',
        flat: '',
        room: '',
        entrance: '',
        floor: '',
        comment: '',
      },
    ];
    setServiceAddresses(newAddresses);
    setValue('serviceAddresses', newAddresses);
  };

  const deleteAddress = (index) => {
    const currentFormValues = getValues();
    const currentAddresses = currentFormValues.serviceAddresses || [];
    const newAddresses = currentAddresses.filter((_, i) => i !== index);
    setServiceAddresses(newAddresses);
    setValue('serviceAddresses', newAddresses);
  };

  const getTitle = () => {
    switch (formData.passportType) {
      case 'ARMENIAN_ID_CARD':
        return 'Հայկական նույնականացման (ID) քարտ';
      case 'FOREIGN_PASSPORT':
        return 'Ոչ-հայկական անձնագիր';
      default:
        return 'Հայկական ԱՆձնագիր';
    }
  };

  return (
    <Container>
      <Title>{getTitle()}</Title>
      <Subtitle>Լրացրեք բաժինները</Subtitle>
      <BackAction onClick={() => navigate(-1)}>
        <img src={ArrowIcon} alt="icon" />
        <BackTitle>Գնալ հետ</BackTitle>
      </BackAction>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FormRow>
            {formData.passportType === 'ARMENIAN_ID_CARD' ? (
              <Controller
                name="idCardNumber"
                control={control}
                render={({ field }) => (
                  <CompactInputWrapper>
                    <Input
                      {...field}
                      label="ID քարտի համար"
                      placeholder="ID քարտի համար"
                      error={errors.idCardNumber?.message}
                      width="390px"
                      required
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange('idCardNumber')(e.target.value);
                      }}
                    />
                    <CharacterCount>9 նիշ թվային կոդ</CharacterCount>
                  </CompactInputWrapper>
                )}
              />
            ) : (
              <Controller
                name="passportNumber"
                control={control}
                render={({ field }) => (
                  <CompactInputWrapper>
                    <Input
                      {...field}
                      label="ԱՆձնագրի համար"
                      placeholder="ԱՆձնագրի համար"
                      error={errors.passportNumber?.message}
                      width="390px"
                      required
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange('passportNumber')(e.target.value);
                      }}
                    />
                    {formData.passportType === 'ARMENIAN_PASSPORT' && (
                      <CharacterCount>2 լատինատառ, 7թվանշան</CharacterCount>
                    )}
                  </CompactInputWrapper>
                )}
              />
            )}
            <Controller
              name="issueDate"
              control={control}
              render={({ field }) => (
                <DatePickerWrapper>
                  <CustomDatePicker
                    label="Տրման ամսաթիվ"
                    placeholder="Տրման ամսաթիվ"
                    error={errors.issueDate?.message}
                    height="44px"
                    disableFuture={true}
                    required={true}
                    value={field.value}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(date) => {
                      const dateValue = date ? new Date(date) : undefined;
                      field.onChange(dateValue);
                      handleFieldChange('issueDate')(dateValue);
                    }}
                  />
                </DatePickerWrapper>
              )}
            />
            <Controller
              name="issuerCode"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="ՈՒմ կողմից է տրված"
                    placeholder="ՈՒմ կողմից է տրված"
                    error={errors.issuerCode?.message}
                    width="390px"
                    required
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('issuerCode')(e.target.value);
                    }}
                  />
                  <CharacterCount>միայն թվանշաններ</CharacterCount>
                </CompactInputWrapper>
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="Գրանցման հասցե"
                    placeholder="Գրանցման հասցե"
                    error={errors.address?.message}
                    width="390px"
                    required
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('address')(e.target.value);
                    }}
                  />
                  <CharacterCount>միայն հայերեն տառեր, թվեր և սիմվոլներ</CharacterCount>
                </CompactInputWrapper>
              )}
            />
            <Controller
              name="socialCardNumber"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="Սոց. քարտի համար"
                    placeholder="Սոց. քարտի համար"
                    error={errors.socialCardNumber?.message}
                    width="390px"
                    required
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('socialCardNumber')(e.target.value);
                    }}
                  />
                  <CharacterCount>10 նիշ թվային կոդ</CharacterCount>
                </CompactInputWrapper>
              )}
            />
            <Controller
              name="notificationAddress"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="Ծանուցումների հասցե"
                    placeholder="Ծանուցումների հասցե"
                    error={errors.notificationAddress?.message}
                    width="390px"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('notificationAddress')(e.target.value);
                    }}
                  />
                </CompactInputWrapper>
              )}
            />
            <StyledFormControl>
              <PassportLabel>Ծառայությունների մատուցման հասցե *</PassportLabel>
              <SecondaryButtonWithFont
                width="184"
                secondary
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addAddress();
                }}
              >
                + Ավելացնել հասցե
              </SecondaryButtonWithFont>
              {serviceAddresses.map((_, index) => (
                <FormContainer key={index}>
                  {index > 0 && (
                    <>
                      <WhiteSpacer />
                      <DeleteButtonContainer>
                        <DeleteButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteAddress(index);
                          }}
                        >
                          <img src={TrashIcon} alt="icon" />
                        </DeleteButton>
                      </DeleteButtonContainer>
                    </>
                  )}
                  <AddressFormContainer>
                    <AddressRow>
                      <Controller
                        name={`serviceAddresses.${index}.streetId`}
                        control={control}
                        render={({ field }) => (
                          <AutocompleteWrapper>
                            <CustomAutocomplete
                              {...field}
                              label="Փողոց"
                              placeholder="Փողոց"
                              options={streetOptions[index] || []}
                              required
                              width="370px"
                              height="48px"
                              error={errors.serviceAddresses?.[index]?.streetId?.message}
                              onChange={(_event, value) => {
                                field.onChange(value?.value || '');
                                setSelectedStreetIds((prev) => ({
                                  ...prev,
                                  [index]: value?.streetId || null,
                                }));
                                setValue(`serviceAddresses.${index}.buildingId`, '');
                                setBuildingOptions((prev) => ({
                                  ...prev,
                                  [index]: [],
                                }));
                              }}
                              onInputChange={(_event, inputValue) => {
                                setStreetSearchTerms((prev) => ({
                                  ...prev,
                                  [index]: inputValue,
                                }));
                              }}
                              freeSolo
                              filterOptions={(x) => x}
                            />
                          </AutocompleteWrapper>
                        )}
                      />
                      <Controller
                        name={`serviceAddresses.${index}.buildingId`}
                        control={control}
                        render={({ field }) => {
                          const currentStreetId = selectedStreetIds[index];
                          return (
                            <AutocompleteWrapper>
                              <CustomAutocomplete
                                {...field}
                                label="Տուն"
                                placeholder="Տուն"
                                options={buildingOptions[index] || []}
                                required
                                width="370px"
                                height="48px"
                                error={errors.serviceAddresses?.[index]?.buildingId?.message}
                                onChange={(_event, value) => {
                                  field.onChange(value?.value || '');
                                  setSelectedBuildingIds((prev) => ({
                                    ...prev,
                                    [index]: value?.buildingId || null,
                                  }));
                                }}
                                onInputChange={(_event, inputValue) => {
                                  if (currentStreetId && inputValue) {
                                    setBuildingSearchTerms((prev) => ({
                                      ...prev,
                                      [index]: {
                                        streetId: currentStreetId,
                                        name: inputValue,
                                      },
                                    }));
                                  }
                                }}
                                disabled={!currentStreetId}
                                freeSolo
                                filterOptions={(x) => x}
                              />
                            </AutocompleteWrapper>
                          );
                        }}
                      />
                    </AddressRow>

                    <AddressRow>
                      <Controller
                        name={`serviceAddresses.${index}.flat`}
                        control={control}
                        render={({ field }) => (
                          <CompactAddressWrapper>
                            <Input
                              {...field}
                              label="Բն/Օֆիս"
                              placeholder="Բն/Օֆիս"
                              width="370px"
                              height="48px"
                              error={errors.serviceAddresses?.[index]?.flat?.message}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <CharacterCount>միայն թվանշաններ</CharacterCount>
                          </CompactAddressWrapper>
                        )}
                      />
                      <SmallInputsRow>
                        <Controller
                          name={`serviceAddresses.${index}.room`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              label="Սենյակի համար"
                              placeholder="համար"
                              width="113px"
                              error={errors.serviceAddresses?.[index]?.room?.message}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                        <Controller
                          name={`serviceAddresses.${index}.entrance`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              {...field}
                              label="Մուտք"
                              placeholder="Մուտք"
                              width="113px"
                              error={errors.serviceAddresses?.[index]?.entrance?.message}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                              min={0}
                              max={999}
                            />
                          )}
                        />
                        <Controller
                          name={`serviceAddresses.${index}.floor`}
                          control={control}
                          render={({ field }) => (
                            <NumberInput
                              {...field}
                              label="Հարկ"
                              placeholder="Հարկ"
                              width="113px"
                              error={errors.serviceAddresses?.[index]?.floor?.message}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                              min={0}
                              max={999}
                            />
                          )}
                        />
                      </SmallInputsRow>
                    </AddressRow>

                    <Controller
                      name={`serviceAddresses.${index}.comment`}
                      control={control}
                      render={({ field }) => (
                        <FullWidthInputWrapper>
                          <Input
                            {...field}
                            label="Մեկնաբանություն"
                            placeholder="Մեկնաբանություն"
                            width="97%"
                            error={errors.serviceAddresses?.[index]?.comment?.message}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        </FullWidthInputWrapper>
                      )}
                    />
                  </AddressFormContainer>
                </FormContainer>
              ))}
            </StyledFormControl>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="Էլ․ փոստ"
                    placeholder="Էլ․ փոստ"
                    error={errors.email?.message}
                    width="390px"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('email')(e.target.value);
                    }}
                  />
                </CompactInputWrapper>
              )}
            />
            <Controller
              name="externalId"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="ERP External Id"
                    placeholder="ERP External Id"
                    error={errors.externalId?.message}
                    width="390px"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('externalId')(e.target.value);
                    }}
                  />
                </CompactInputWrapper>
              )}
            />
            <StyledFormControl>
              <PassportLabel>Ավելացնել Հեռախոսահամար *</PassportLabel>
              <SecondaryButtonWithFont
                width="292"
                secondary
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addPhone();
                }}
                disabled={phoneNumbers.length >= 4}
              >
                + Ավելացնել Հեռախոսահամար
              </SecondaryButtonWithFont>
              {phoneNumbers.map((_, index) => (
                <FormContainer key={index}>
                  {index > 0 && (
                    <>
                      <WhiteSpacer />
                      <DeleteButtonContainer>
                        <DeleteButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deletePhone(index);
                          }}
                        >
                          <img src={TrashIcon} alt="icon" />
                        </DeleteButton>
                      </DeleteButtonContainer>
                    </>
                  )}
                  <PhoneRow>
                    <Controller
                      name={`phoneNumbers.${index}.number`}
                      control={control}
                      render={({ field }) => (
                        <CompactAddressWrapper>
                          <Input
                            {...field}
                            label="Հեռախոսահամար"
                            placeholder="+374"
                            width="370px"
                            height="48px"
                            required
                            error={errors.phoneNumbers?.[index]?.number?.message}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                          <CharacterCount>10 նիշ թվային կոդ</CharacterCount>
                        </CompactAddressWrapper>
                      )}
                    />
                    <Controller
                      name={`phoneNumbers.${index}.comment`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Մեկնաբանություն"
                          placeholder="Մեկնաբանություն"
                          width="370px"
                          error={errors.phoneNumbers?.[index]?.comment?.message}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                  </PhoneRow>
                </FormContainer>
              ))}
            </StyledFormControl>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePickerWrapper>
                  <CustomDatePicker
                    label="Ծննդյան ամսաթիվ"
                    placeholder="Ծննդյան ամսաթիվ"
                    height="44px"
                    disableFuture={true}
                    required={true}
                    error={errors.birthDate?.message}
                    value={field.value}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(date) => {
                      const dateValue = date ? new Date(date) : undefined;
                      field.onChange(dateValue);
                      handleFieldChange('birthDate')(dateValue);
                    }}
                  />
                </DatePickerWrapper>
              )}
            />
          </FormRow>
          <ButtonsFormWrapper>
            <Button width="184" outlined onClick={() => navigate(-2)}>
              Չեղարկել
            </Button>
            <Button width="184" secondary type="submit" disabled={loading}>
              {loading ? 'Հաստատվում է...' : 'Հաստատել'}
            </Button>
          </ButtonsFormWrapper>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default IndividualForm2;
