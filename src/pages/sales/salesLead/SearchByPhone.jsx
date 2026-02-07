import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import { searchLeadByPhone } from 'features/sales/salesActions';
import { setResetAll } from 'features/sales/salesSlice';
import MyPhoneInput from 'pages/components/myPhoneInput';
import * as yup from 'yup';

import {
  Container,
  Form,
  InputWrapper,
  SearchBox,
  SearchDescription,
  SearchTitle,
} from './SalesLead.styles';

const schema = yup.object().shape({
  phone: yup.object({
    value: yup
      .string()
      .required('Phone number is required')
      .min(11, 'Phone number is too short'),
  }),
});

export const SearchByPhone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { state } = useLocation();
  const onSubmit = async ({ phone }) => {
    dispatch(setResetAll());
    const phonNumber = phone?.value;
    const resultAction = await dispatch(searchLeadByPhone(phonNumber));
    const data = resultAction.payload;
    if (data?.found) {
      navigate(`/leads/${data.leadId}`, {
        state: { from: '/sales/search-lead' },
      });
    } else {
      if (state?.leadId) {
        navigate(`/leads/${state.leadId}`, {
          state: { phone: phonNumber, from: '/sales/search-lead' },
        });
      } else {
        navigate('/leads/not-found', {
          state: { phone: phonNumber, from: '/sales/search-lead' },
        });
      }
    }
  };
  return (
    <Container>
      <SearchBox>
        <SearchTitle>Add New Lead</SearchTitle>
        <SearchDescription>
          Enter phone number to see if the lead is connected with projects. If there is no
          result you will be redirecting to form of adding page
        </SearchDescription>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => {
                return (
                  <MyPhoneInput
                    value={field.value?.value || ''}
                    error={errors.phone?.value?.message}
                    onChange={(phone) => field.onChange({ ...field.value, value: phone })}
                  />
                );
              }}
            />
            <Button type="submit">Search</Button>
          </InputWrapper>
        </Form>
      </SearchBox>
    </Container>
  );
};
