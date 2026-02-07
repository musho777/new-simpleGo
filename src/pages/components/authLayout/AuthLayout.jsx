import authImage from 'assets/authAssets/authImage.svg';

import {
  Container,
  Content,
  Div,
  Image,
  TermsLink,
  TermsText,
  TermsWrapper,
} from './AuthLayout.styles';

const AuthLayout = ({ children }) => {
  return (
    <Container>
      <Image alt="auth image" src={authImage} />
      <Content>
        <Div />
        {children}
        <TermsWrapper>
          <TermsText>By signing up to create an account I accept Company’s</TermsText>
          <TermsLink>Terms of use & Privacy Policy.</TermsLink>
        </TermsWrapper>
      </Content>
    </Container>
  );
};

export default AuthLayout;
