import { CardContainer, Content, Number, Title } from './Card.styles';

const Card = ({ title, value, bgColor }) => {
  return (
    <CardContainer $bgColor={bgColor}>
      <Content>
        <Title>{title}</Title>
        <Number>{value}</Number>
      </Content>
    </CardContainer>
  );
};

export default Card;
