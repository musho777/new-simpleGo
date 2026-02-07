import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, Radio, RadioGroup } from '@mui/material';
import Button from 'common-ui/button';
import Input from 'common-ui/input';

import ArrowIcon from '../../../assets/back.svg';
import {
  BackAction,
  BackTitle,
  ButtonsWrapper,
  Container,
  FormRow,
  FormWrapper,
  PassportLabel,
  StyledFormControlLabel,
  Subtitle,
  Title,
} from './IndividualForm.styles';
import { individualFormSchema } from './schema';
import { useIndividualFormSearchParams } from './useIndividualFormSearchParams';

const IndividualForm1 = () => {
  const { formData, setFormSearchData } = useIndividualFormSearchParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(individualFormSchema),
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      patronymic: formData.patronymic || '',
      passportType: formData.passportType || 'ARMENIAN_PASSPORT',
    },
  });

  const onSubmit = (data) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('step', '2');
    navigate(`/erp/subscriber/individual?${currentParams.toString()}`);
  };

  const handleFieldChange = (field) => (value) => {
    setFormSearchData({ [field]: value });
  };

  return (
    <Container>
      <Title>Ֆիզիկական անձ</Title>
      <Subtitle>Լրացրեք բաժինները</Subtitle>
      <BackAction onClick={() => navigate(-1)}>
        <img src={ArrowIcon} alt="icon" />
        <BackTitle>Գնալ հետ</BackTitle>
      </BackAction>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FormRow>
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
                    handleFieldChange('lastName')(e.target.value);
                  }}
                />
              )}
            />
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
                  maxLength={50}
                  required
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('patronymic')(e.target.value);
                  }}
                />
              )}
            />
            <Controller
              name="passportType"
              control={control}
              render={({ field }) => (
                <FormControl style={{ width: '100%' }}>
                  <PassportLabel>Անձնագրի տեսակի ընտրություն *</PassportLabel>
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange('passportType')(e.target.value);
                    }}
                  >
                    <StyledFormControlLabel
                      value="ARMENIAN_PASSPORT"
                      control={<Radio />}
                      label="Հայկական անձնագիր"
                    />
                    <StyledFormControlLabel
                      value="ARMENIAN_ID_CARD"
                      control={<Radio />}
                      label="Հայկական նույնականացման (ID) քարտ"
                    />
                    <StyledFormControlLabel
                      value="FOREIGN_PASSPORT"
                      control={<Radio />}
                      label="Ոչ-հայկական անձնագիր"
                    />
                  </RadioGroup>
                  {errors.passportType && (
                    <span style={{ color: '#E63946', fontSize: 12, marginTop: 4 }}>
                      {errors.passportType.message}
                    </span>
                  )}
                </FormControl>
              )}
            />
          </FormRow>
          <ButtonsWrapper>
            <Button width="184" outlined onClick={() => navigate(-1)}>
              Չեղարկել
            </Button>
            <Button width="184" secondary type="submit">
              Առաջ
            </Button>
          </ButtonsWrapper>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default IndividualForm1;
