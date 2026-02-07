import Button from 'common-ui/button';

import { BadgeButtonBox, BadgeButtonCountBox } from './BadgeButton.styles';

export const BadgeButton = ({ count, title = 'New requests', onPress = () => {} }) => {
  return (
    <BadgeButtonBox>
      <Button outlined width="150px" onClick={onPress}>
        {title}
        {count > 0 && <BadgeButtonCountBox>{count}</BadgeButtonCountBox>}
      </Button>
    </BadgeButtonBox>
  );
};
