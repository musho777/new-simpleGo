import { Title, TitleWrapper } from './ProfileInfoTag.styles';

const ProfileInfoTag = ({ title }) => {
  return (
    <TitleWrapper title={title}>
      <Title>{title}</Title>
    </TitleWrapper>
  );
};

export default ProfileInfoTag;
