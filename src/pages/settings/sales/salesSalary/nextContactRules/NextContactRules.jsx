import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import EditIcon from 'assets/edit.svg';
import Trash from 'assets/profile/trash.svg';
import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { CustomTooltip } from 'common-ui/table/CustomTooltip';
import Pagination from 'common-ui/table/Pagination';
import { deleteNextContactRule, getNextContactRules } from 'features/sales/salesActions';
import {
  selectNextContactRules,
  selectNextContactRulesLoading,
} from 'features/sales/salesSlice';
import EmptyView from 'pages/components/emptyView';
import Tag from 'pages/components/tag';

import { BtnWrapper } from '../Sales.styles';
import Create from './Create';
import {
  ActionWrapper,
  ActionsWrapper,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  GridWrapper,
  HeaderWrapper,
  IconButton,
  InfoRow,
  Label,
  LoadingWrapper,
  ModalText,
  Value,
} from './NextContactRules.styles';
import useSearchData from './useSearchData';

const NextContactRules = () => {
  const dispatch = useDispatch();
  const userType = localStorage.getItem('userType');
  const access = userType === 'Super Admin' || userType === 'General Manager';

  const [editingRule, setEditingRule] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingRule, setDeletingRule] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { searchData, setSearchData } = useSearchData();
  const data = useSelector(selectNextContactRules);
  const isLoading = useSelector(selectNextContactRulesLoading);

  useEffect(() => {
    dispatch(getNextContactRules(searchData));
  }, [dispatch, searchData]);

  const handlePageChange = (page) => {
    setSearchData({ page });
  };

  const handleRowCountChange = (newCount) => {
    setSearchData({ limit: newCount, page: 1 });
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setIsEdit(true);
  };

  const handleDelete = (rule) => {
    setDeletingRule(rule);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingRule) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteNextContactRule(deletingRule.uuid)).unwrap();
      dispatch(getNextContactRules(searchData));
      setShowDeleteModal(false);
      setDeletingRule(null);
    } catch (error) {
      console.error('Error deleting rule:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingRule(null);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setIsEdit(false);
    setEditingRule(null);
  };

  const renderCard = (rule) => (
    <Card key={rule.uuid}>
      <CardHeader>
        <CustomTooltip title={rule.reminderName.length > 25 ? rule.reminderName : ''}>
          <CardTitle>
            {rule.reminderName.length > 25
              ? rule.reminderName.substring(0, 25) + '...'
              : rule.reminderName}
          </CardTitle>
        </CustomTooltip>
        <InfoRow>
          <Tag type="statuses" variant={rule.isEnabled ? 'Enabled' : 'Disabled'} />
        </InfoRow>
      </CardHeader>

      <CardContent>
        <InfoRow>
          <Label>Duration:</Label>
          <Value>{rule.offsetDisplay}</Value>
        </InfoRow>
        <ActionWrapper>
          {access && (
            <ActionsWrapper>
              <IconButton onClick={() => handleEdit(rule)} src={EditIcon} alt="Edit" />
              {data?.reminderRules?.length > 1 && (
                <IconButton onClick={() => handleDelete(rule)} src={Trash} alt="Delete" />
              )}
            </ActionsWrapper>
          )}
        </ActionWrapper>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <>
        <LoadingWrapper>Loading next contact rules...</LoadingWrapper>
      </>
    );
  }

  return (
    <>
      {access && (
        <HeaderWrapper>
          <BtnWrapper>
            <Button secondary onClick={handleOpenCreateModal} className="h-38">
              + Add Next Contact Rule
            </Button>
          </BtnWrapper>
        </HeaderWrapper>
      )}
      {!data?.reminderRules || data.reminderRules.length === 0 ? (
        <EmptyView />
      ) : (
        <>
          <GridWrapper>{data?.reminderRules?.map(renderCard)}</GridWrapper>
          {data?.total > 10 && (
            <Pagination
              currentPage={data?.page || 1}
              totalPages={data?.totalPages || 1}
              onPageChange={handlePageChange}
              handleRowCountChange={handleRowCountChange}
              dataCount={data?.total || 0}
              count={data?.limit || 10}
            />
          )}
        </>
      )}

      <Create
        activeTab="Next Contact Rules"
        isEdit={isEdit}
        initialData={editingRule}
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
      />

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onOk={confirmDelete}
        title="Delete Next Contact Rule"
        width="400px"
        footer={true}
        okText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        danger={true}
      >
        <ModalText>
          Are you sure you want to delete the rule {deletingRule?.reminderName}? This action
          cannot be undone.
        </ModalText>
      </Modal>
    </>
  );
};

export default NextContactRules;
