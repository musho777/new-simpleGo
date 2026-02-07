import { forwardRef } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import deletePending from 'assets/deletePending.svg';
import MyCheckbox from 'common-ui/myCheckbox';
import { selectAdditionalInfo } from 'features/profile/profileSlice';

import {
  CenterItem,
  Column,
  Container,
  Content,
  EditIcon,
  EditIconWrapper,
  Item,
  LeftItem,
  LoadContainer,
  LoadingIcon,
  RightItem,
  TitleWrapper,
} from './FieldItem.styles';
import edit from './edit.svg';
import loadIcon from './loading.svg';
import pending from './pending.svg';

const FieldItem = forwardRef(
  (
    {
      title,
      type,
      data,
      onEdit,
      loading,
      children,
      editable,
      hideTitle,
      hideBorder,
      selectedItems,
      onCheckboxClick,
      showCheckbox = false,
    },
    ref
  ) => {
    const userType = localStorage.getItem('userType');
    const additionalInfo = useSelector(selectAdditionalInfo);
    const { uuid } = useParams();

    const handleCheckboxClick = (uuid) => {
      onCheckboxClick(uuid);
    };

    const showEdit =
      !uuid ||
      (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper && uuid);

    return (
      <Container ref={ref} $hideBorder={hideBorder}>
        {!hideTitle && (
          <TitleWrapper>
            {title}
            {showEdit && editable && (
              <EditIconWrapper onClick={onEdit}>
                <EditIcon src={edit} alt="Edit" />
              </EditIconWrapper>
            )}
          </TitleWrapper>
        )}
        {loading ? (
          <LoadContainer>
            <LoadingIcon src={loadIcon} alt="Loading..." />
          </LoadContainer>
        ) : (
          <>
            {type === 'container' ? (
              <Content>{children}</Content>
            ) : (
              <Content>
                <Column>
                  {data?.map((item, index) => (
                    <Item
                      key={index}
                      $opacity={item.pending || item.disabled === false}
                      $isSelected={selectedItems?.includes(item.uuid)}
                      $bordered={item.bordered}
                    >
                      <LeftItem>
                        {item.pending && (
                          <EditIcon
                            src={item.type === 'remove' ? deletePending : pending}
                            alt="Pending"
                          />
                        )}
                        {item.leftItem}
                      </LeftItem>
                      {item.centerItem && <CenterItem>{item.centerItem}</CenterItem>}
                      <RightItem>
                        {item.rightItem}
                        {showCheckbox && (
                          <MyCheckbox
                            uuid={item.uuid}
                            selected={selectedItems?.includes(item.uuid)}
                            onClick={handleCheckboxClick}
                          />
                        )}
                      </RightItem>
                    </Item>
                  ))}
                  {children}
                </Column>
              </Content>
            )}
          </>
        )}
      </Container>
    );
  }
);

export default FieldItem;
