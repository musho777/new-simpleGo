import { Circle, Container, Content, Row, StyledText, StyledTextBold } from './Loading.styles';

const Loading = () => {
  return (
    <Container>
      <Content>
        <StyledText>Thanks for your patience. This should only take a moment!</StyledText>
        <Row>
          <Circle />
          <Circle />
          <Circle />
        </Row>
        <StyledTextBold>Loading...</StyledTextBold>
      </Content>
    </Container>
  );
};

export default Loading;
