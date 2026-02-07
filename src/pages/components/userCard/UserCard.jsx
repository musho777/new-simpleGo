import AvatarIcon from 'assets/userCard/avatar.svg';
import Pagination from 'common-ui/table/Pagination';
import { SYSTEM_USERS, USERS } from 'constants/constants';
import Tag from 'pages/components/tag';
import Actions from 'pages/userManagement/actions';

import {
  ActionWrapper,
  Avatar,
  CardContainer,
  ContentWrapper,
  Email,
  GridContainer,
  InfoContainer,
  Name,
  PhoneNumber,
  StatusBadge,
  TeamLeadTag,
  WrapperContainer,
} from './UserCard.styles';

const initialFilters = {
  uuid: '',
  deletedAt: null,
  name: '',
  surname: '',
  phoneNumber: '',
  occupation: '',
  userType: '',
};

const UserCard = ({
  users = initialFilters,
  currentPage = 1,
  totalPages = 1,
  onPaginationChange,
}) => {
  const handlePageChange = (page) => {
    if (onPaginationChange) {
      onPaginationChange(page);
    }
  };
  const userType = localStorage.getItem('userType');
  return (
    <ContentWrapper>
      <GridContainer>
        {users?.map((user) => (
          <WrapperContainer
            key={user.uuid}
            $inActive={
              user.deletedAt !== null ? true : user?.isVerified === true ? false : true
            }
          >
            {(SYSTEM_USERS.includes(user.userType) && userType === 'Super Admin') ||
            (USERS.includes(user.userType) && userType === 'Hr Manager') ||
            (user.deletedAt === null && user.isVerified) ? (
              <ActionWrapper>
                <Actions
                  id={user.uuid}
                  role={user.userType}
                  row={user}
                  iconClassName="trigger-icon"
                  grid={true}
                />
              </ActionWrapper>
            ) : (
              <ActionWrapper></ActionWrapper>
            )}
            <CardContainer disabled={user.deletedAt === null}>
              <StatusBadge
                $status={
                  user.deletedAt !== null
                    ? 'Disabled'
                    : user?.isVerified === true
                      ? 'Active'
                      : 'Pending'
                }
              >
                {user.deletedAt !== null
                  ? 'Disabled'
                  : user?.isVerified === true
                    ? 'Active'
                    : 'Pending'}
              </StatusBadge>
              <Avatar>
                <img
                  src={user.photo ? user.photo : AvatarIcon}
                  alt={`${user.name}'s avatar`}
                />
              </Avatar>
              <InfoContainer>
                <Name>
                  {user.name + ' '}
                  {user.surname}
                </Name>
                <Email>{user.email}</Email>
                <PhoneNumber>{user.phoneNumber}</PhoneNumber>
                <Tag type="roles" variant={user.userType} />
              </InfoContainer>
            </CardContainer>

            <TeamLeadTag>{user.occupation}</TeamLeadTag>
          </WrapperContainer>
        ))}
      </GridContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </ContentWrapper>
  );
};

export default UserCard;
