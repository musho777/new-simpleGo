import { useNavigate } from 'react-router-dom';

import CaseIcon from '../../../assets/case.svg';
import UserIcon from '../../../assets/user.svg';
import UsersIcon from '../../../assets/users.svg';
import {
  BoxItem,
  BoxWrapper,
  Container,
  IconWrapper,
  Label,
  Subtitle,
  Title,
} from './NewSubscriber.styles';

const options = [
  {
    icon: <img src={UserIcon} alt="icon" />,
    label: 'Անհատ ձեռներեց',
    color: '#2D6CDF',
    route: 'private',
    typeId: 3,
  },
  {
    icon: <img src={CaseIcon} alt="icon" />,
    label: 'Իրավաբանական անձ',
    color: '#22B573',
    route: 'legal',
    typeId: 2,
  },
  {
    icon: <img src={UsersIcon} alt="icon" />,
    label: 'Ֆիզիկական անձ',
    color: '#A259FF',
    route: 'individual',
    typeId: 1,
  },
];

const NewSubscriber = () => {
  const navigate = useNavigate();

  const handleClick = (opt) => {
    sessionStorage.setItem('subscriberTypeId', opt.typeId);

    if (opt.label === 'Ֆիզիկական անձ') {
      navigate('/erp/subscriber/individual');
    } else if (opt.label === 'Անհատ ձեռներեց') {
      navigate('/erp/subscriber/entrepreneur');
    } else if (opt.label === 'Իրավաբանական անձ') {
      navigate('/erp/subscriber/legal-entity');
    }
  };

  return (
    <Container>
      <Title>Նոր բաժանորդի ստեղծում</Title>
      <Subtitle>Ընտրեք բաժինը և լրացրեք</Subtitle>
      <BoxWrapper>
        {options.map((opt, index) => (
          <BoxItem key={index} onClick={() => handleClick(opt)}>
            <IconWrapper color={opt.color}>{opt.icon}</IconWrapper>
            <Label>{opt.label}</Label>
          </BoxItem>
        ))}
      </BoxWrapper>
    </Container>
  );
};

export default NewSubscriber;
