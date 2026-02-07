import {
  AvatarImage,
  AvatarWrapper,
  MembersWrapper,
  RemainingMembers,
} from './Members.styles';

const Members = ({ members }) => {
  const visibleMembers = members?.slice(0, 5);
  const remainingCount = members?.length - 5;

  return (
    <MembersWrapper>
      {visibleMembers?.map((member, index) => (
        <AvatarWrapper key={index} size="32px">
          <AvatarImage src={member.avatarUrl} alt={member.name} />
        </AvatarWrapper>
      ))}
      {remainingCount > 0 && <RemainingMembers>+{remainingCount}</RemainingMembers>}
    </MembersWrapper>
  );
};

export default Members;
