import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { changePhone, verifyOtp } from 'features/auth/authActions';
import { resetOtp, selectOtp, selectOtpToken } from 'features/auth/authSlice';
import CodeInput from 'pages/components/codeInput';
import * as Yup from 'yup';

import {
  CloseIcon,
  Form,
  FormDescription,
  FormRow,
  FormTitle,
  PhoneStyle,
  Row,
} from './EditWorkPhone.styles';
import close from './close.svg';

const validationSchema = Yup.object().shape({
  code: Yup.array()
    .of(
      Yup.string()
        .matches(/^[0-9]$/, 'Must be a number')
        .required('Required')
    )
    .length(6, 'Must be exactly 6 digits'),
});

const OtpValidation = ({ isOpen, phoneNumber, onClose }) => {
  const code = useSelector(selectOtp);
  const token = useSelector(selectOtpToken);

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      code: Array(6).fill(''),
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const otp = data.code.join('');
    if (otp !== code) {
      setError('code', {
        type: 'manual',
        message: 'The code entered is incorrect. Please try again.',
      });
      return;
    }

    dispatch(
      verifyOtp({
        token,
        otp,
        action: 'update main phone',
      })
    );
    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(resetOtp());
    reset();
    onClose();
  };

  const handleClickResendCode = () => {
    dispatch(changePhone({ phoneNumber }));
  };

  useEffect(() => {
    if (code) {
      alert(`Your OTP is: ${code}`);
    }
  }, [code]);

  return (
    <Modal isOpen={isOpen}>
      <Row>
        <div onClick={handleCloseModal}>
          <CloseIcon src={close} alt="Close" />
        </div>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Verify phone number</FormTitle>
        <FormRow>
          <FormDescription>Enter the 6-digit code we sent to</FormDescription>
          <PhoneStyle>+{phoneNumber}</PhoneStyle>
        </FormRow>
        <Controller
          name="code"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CodeInput
              codeCount={6}
              error={!!errors.code}
              value={value || Array(6).fill('')}
              onChange={(newValues) => {
                onChange(newValues);
              }}
            />
          )}
        />
        <Button type="link" onClick={handleClickResendCode}>
          Resend code
        </Button>
        {errors.code && (
          <div style={{ marginBottom: '14px' }} className="error-message">
            {errors?.code?.message}
          </div>
        )}
        <Button primary type="submit" className="otp-btn">
          Continue
        </Button>
      </Form>
    </Modal>
  );
};

export default OtpValidation;
