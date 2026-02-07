import NotFound from 'assets/dashboard/not-found.svg';
import Button from 'common-ui/button';

import { Container, Icon, Text, Title } from './EmptyView.styles';

const EmptyView = ({ title, description, action, button, buttonTitle, onClick, icon }) => {
  return (
    <Container>
      <Icon alt="empty view icon" src={icon || NotFound} />
      {title && <Title>{title}</Title>}
      {description && <Text>{description}</Text>}
      {action}
      {button && (
        <Button className="empty-view-btn" width="inherit" secondary onClick={onClick}>
          {buttonTitle}
        </Button>
      )}
    </Container>
  );
};

export default EmptyView;
