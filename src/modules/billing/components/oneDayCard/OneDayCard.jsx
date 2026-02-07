import {
  CardContainer,
  IconContainer,
  Number,
  TextContainer,
  Title,
} from './OneDayCard.styles';

const OneDayCard = ({ title, number, icon, bgColor, mood }) => {
  return (
    <CardContainer $bgColor={bgColor} $mood={mood}>
      <TextContainer>
        <Title>{title}</Title>
        <Number $mood={mood} $bgColor={bgColor}>
          {number}
        </Number>
      </TextContainer>
      <IconContainer src={icon} alt="icon" />
    </CardContainer>
  );
};

export default OneDayCard;
