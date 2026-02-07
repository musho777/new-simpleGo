import { Button, Icon, Text } from './ResetButton.styles';
import ResetIcon from './resetIcon.svg';

const ResetButton = ({ onClick, title = 'Reset' }) => {
  return (
    <Button onClick={onClick}>
      <Icon src={ResetIcon} alt="Reset Icon" />
      <Text>{title}</Text>
    </Button>
  );
};

export default ResetButton;
