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
import { Select } from 'common-ui/select';
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
  DeleteButton,
  DeleteButtonContainer,
  FormContainer,
  FormRow,
  FormWrapper,
  FullWidthAddressInputWrapper,
  FullWidthInputWrapper,
  PassportLabel,
  PhoneRow,
  SecondaryButtonWithFont,
  SectionTitle,
  SelectWrapper,
  SmallInputsRow,
  StyledFormControl,
  Subtitle,
  Title,
  WhiteSpacer,
} from './LegalEntityForm.styles';
import { legalEntityFormSchema } from './schema';
import { useLegalEntityFormSearchParams } from './useLegalEntityFormSearchParams';

const LegalEntityForm = () => {
  const { formData, setFormSearchData } = useLegalEntityFormSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.main?.loading?.addCustomer || false);
  const [phoneNumbers, setPhoneNumbers] = useState(
    formData.phoneNumbers?.length > 0 ? formData.phoneNumbers : [{ number: '', comment: '' }]
  );
  const [serviceAddresses, setServiceAddresses] = useState(
    formData.serviceAddresses?.length > 0
      ? formData.serviceAddresses
      : [
          {
            streetId: '',
            buildingId: '',
            flat: '',
            room: '',
            entrance: '',
            floor: '',
            comment: '',
          },
        ]
  );
  const [streetOptions, setStreetOptions] = useState([]);
  const [streetSearchTerms, setStreetSearchTerms] = useState({});
  const debouncedStreetSearchTerms = useDebounce(streetSearchTerms, 300);
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [buildingSearchTerms, setBuildingSearchTerms] = useState({});
  const debouncedBuildingSearchTerms = useDebounce(buildingSearchTerms, 300);
  const [selectedStreetIds, setSelectedStreetIds] = useState({});
  const [selectedBuildingIds, setSelectedBuildingIds] = useState({});
  const [passportType, setPassportType] = useState(
    formData.passportType || 'ARMENIAN_PASSPORT'
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(legalEntityFormSchema),
    defaultValues: {
      companyName: formData.companyName || '',
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      patronymic: formData.patronymic || '',
      passportType: formData.passportType || 'ARMENIAN_PASSPORT',
      passportNumber: formData.passportNumber || '',
      idCardNumber: formData.idCardNumber || '',
      socialCardNumber: formData.socialCardNumber || '',
      issueDate: formData.issueDate ? new Date(formData.issueDate) : undefined,
      issuerCode: formData.issuerCode || '',
      address: formData.address || '',
      location: formData.location || '',
      taxpayerRegistrationNumber: formData.taxpayerRegistrationNumber || '',
      email: formData.email || '',
      erpExternalId: formData.erpExternalId || '',
      serviceAddresses: [
        {
          streetId: '',
          buildingId: '',
          flat: '',
          room: '',
          entrance: '',
          floor: '',
          comment: '',
        },
      ],
      phoneNumbers: [{ number: '', comment: '' }],
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

  const addPhone = () => {
    const currentFormValues = getValues();
    const currentPhones = currentFormValues.phoneNumbers || [];
    if (currentPhones.length < 5) {
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

  const handleFieldChange = (field) => (value) => {
    setFormSearchData({ [field]: value });
  };

  const onSubmit = async (data) => {
    try {
      const subscriberTypeId = sessionStorage.getItem('subscriberTypeId') || '2';

      const customerData = {
        name: {
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          patronymic: data.patronymic || '',
        },
        customerType: {
          id: parseInt(subscriberTypeId),
          name: 'Իրավաբանական անձ',
        },
        passportInfo: {
          type: data.passportType || 'ARMENIAN_PASSPORT',
          number: data.passportNumber || data.idCardNumber || '',
          issueDate: data.issueDate ? data.issueDate.toISOString().split('T')[0] : '',
          issuerCode: data.issuerCode || '',
          address: data.address || '',
        },
        location: data.location || '',
        email: data.email || '',
        externalId: parseInt(data.erpExternalId) || 0,
        taxpayerRegistrationNumber: data.taxpayerRegistrationNumber || '',
        companyName: data.companyName || '',
        serviceAddresses: (data.serviceAddresses || []).map((address, index) => ({
          building: {
            id: selectedBuildingIds[index] || 0,
          },
          flat: parseInt(address.flat) || null,
          room: parseInt(address.room) || null,
          entrance: parseInt(address.entrance) || null,
          floor: parseInt(address.floor) || null,
          comment: address.comment || '',
        })),
        phoneNumbers: (data.phoneNumbers || []).map((phone) => ({
          number: phone.number || '',
          comment: phone.comment || '',
        })),
      };

      await dispatch(addCustomer(customerData)).unwrap();

      navigate('/erp/subscriber');
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <Container>
      <Title>Իրավաբանական անձ</Title>
      <Subtitle>Լրացրեք բաժինները</Subtitle>
      <BackAction onClick={() => navigate(-1)}>
        <img src={ArrowIcon} alt="icon" />
        <BackTitle>Գնալ հետ</BackTitle>
      </BackAction>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FullWidthInputWrapper>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Կազմակերպության անվանում"
                  placeholder="Կազմակերպության անվանում"
                  error={errors.companyName?.message}
                  required
                  fullWidth
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('companyName')(e.target.value);
                  }}
                />
              )}
            />
          </FullWidthInputWrapper>

          <FormRow>
            <SectionTitle>Կազմակերպության ղեկավարի տվյալներ</SectionTitle>

            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Անուն"
                  placeholder="Անուն"
                  error={errors.firstName?.message}
                  width="390px"
                  maxLength={50}
                  required
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('firstName')(e.target.value);
                  }}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Ազգանուն"
                  placeholder="Ազգանուն"
                  error={errors.lastName?.message}
                  width="390px"
                  maxLength={50}
                  required
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('firstName')(e.target.value);
                  }}
                />
              )}
            />
          </FormRow>
          <FormRow>
            <Controller
              name="patronymic"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Հայրանուն"
                  placeholder="Հայրանուն"
                  error={errors.patronymic?.message}
                  width="390px"
                  required
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('patronymic')(e.target.value);
                  }}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Գտնվելու վայրի հասցեն"
                  placeholder="Գտնվելու վայրի հասցեն"
                  error={errors.location?.message}
                  width="390px"
                  required
                />
              )}
            />
          </FormRow>

          <FormRow>
            <Controller
              name="passportType"
              control={control}
              render={({ field }) => (
                <SelectWrapper>
                  <Select
                    {...field}
                    label="Անձնագրի տեսակի ընտրություն *"
                    placeholder="Ընտրեք անձնագրի տեսակը"
                    options={[
                      { value: 'ARMENIAN_PASSPORT', label: 'Հայկական անձնագիր' },
                      {
                        value: 'ARMENIAN_ID_CARD',
                        label: 'Հայկական նույնականացման (ID) քարտ',
                      },
                      { value: 'FOREIGN_PASSPORT', label: 'Ոչ-հայկական անձնագիր' },
                    ]}
                    value={{
                      value: field.value,
                      label:
                        field.value === 'ARMENIAN_PASSPORT'
                          ? 'Հայկական անձնագիր'
                          : field.value === 'ARMENIAN_ID_CARD'
                            ? 'Հայկական նույնականացման (ID) քարտ'
                            : field.value === 'FOREIGN_PASSPORT'
                              ? 'Ոչ-հայկական անձնագիր'
                              : null,
                    }}
                    onChange={(option) => {
                      field.onChange(option?.value || '');
                      setPassportType(option?.value || 'ARMENIAN_PASSPORT');
                    }}
                    $error={errors.passportType?.message}
                  />
                </SelectWrapper>
              )}
            />
          </FormRow>

          <FormRow>
            {passportType === 'ARMENIAN_ID_CARD' ? (
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
                      }}
                    />
                    {passportType === 'ARMENIAN_PASSPORT' && (
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
                <CompactInputWrapper>
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
                    }}
                  />
                </CompactInputWrapper>
              )}
            />
          </FormRow>

          <FormRow>
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
                    }}
                  />
                  <CharacterCount>միայն հայերեն տառեր, թվեր և սիմվոլներ</CharacterCount>
                </CompactInputWrapper>
              )}
            />
          </FormRow>

          {/* Father Name and Address Row */}

          {/* Service Address Section */}
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
                            label="Բնակարան"
                            placeholder="Բնակարան"
                            width="370px"
                            error={errors.serviceAddresses?.[index]?.flat?.message}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        </CompactAddressWrapper>
                      )}
                    />
                    <SmallInputsRow>
                      <Controller
                        name={`serviceAddresses.${index}.room`}
                        control={control}
                        render={({ field }) => (
                          <NumberInput
                            {...field}
                            label="Սենյակի համար"
                            placeholder="համար"
                            width="113px"
                            error={errors.serviceAddresses?.[index]?.room?.message}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            min={0}
                            max={999}
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
                      <FullWidthAddressInputWrapper>
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
                      </FullWidthAddressInputWrapper>
                    )}
                  />
                </AddressFormContainer>
              </FormContainer>
            ))}
          </StyledFormControl>

          <FormRow>
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
                    }}
                  />
                </CompactInputWrapper>
              )}
            />
            <Controller
              name="erpExternalId"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="ERP External Id"
                    placeholder="ERP External Id"
                    error={errors.erpExternalId?.message}
                    width="390px"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </CompactInputWrapper>
              )}
            />
          </FormRow>

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
              disabled={phoneNumbers.length >= 5}
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
                      <Input
                        {...field}
                        label="Հեռախոսահամար"
                        placeholder="+374"
                        error={errors.phoneNumbers?.[index]?.number?.message}
                        width="370px"
                        required
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
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

          <FormRow>
            <Controller
              name="taxpayerRegistrationNumber"
              control={control}
              render={({ field }) => (
                <CompactInputWrapper>
                  <Input
                    {...field}
                    label="ՀՎՀՀ"
                    placeholder="ՀՎՀՀ"
                    error={errors.taxpayerRegistrationNumber?.message}
                    width="390px"
                    maxLength={8}
                    required
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      field.onChange({ ...e, target: { ...e.target, value } });
                    }}
                  />
                </CompactInputWrapper>
              )}
            />
          </FormRow>

          <ButtonsFormWrapper>
            <Button width="184" outlined onClick={() => navigate(-1)}>
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

export default LegalEntityForm;
