import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from 'assets/delete.svg';
import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import { addNoteToCategoryItem } from 'features/inventory/inventoryActions';
import {
  selectLoading,
  selectSuccess,
  setResetAssignNoteSuccess,
} from 'features/inventory/inventorySlice';
import { getCountdown } from 'utils';
import { formatDateTime } from 'utils/dateUtils';
import { notifySuccess } from 'utils/notifyConfig';

import AddRemoveNoteToItem from './AddRemoveNoteToItem';
import {
  AddRemoveNoteButtonContainer,
  DeleteButtonOfModal,
  DetailsTableWrapper,
  ExpirationText,
} from './Inventory.styles';

const PersonalItemDetails = ({ isOpen, onClose, data = [] }) => {
  const dispatch = useDispatch();

  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [itemToAddNote, setItemToAddNote] = useState(null);
  const [hasNote, setHasNote] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeletingNote, setIsDeletingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);

  const handleCancelDelete = () => {
    setOpenModal(false);
  };

  const handleClickAddRemoveNote = (r, hasNote) => {
    setIsDeletingNote(false);
    setIsEditingNote(!!hasNote);
    setIsNotesModalOpen(true);
    setItemToAddNote(r);
    setHasNote(hasNote);
  };

  const handleCloseNotesModal = () => {
    setIsNotesModalOpen(false);
    setHasNote(false);
    setItemToAddNote(null);
  };

  const COLUMNS = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Provided date',
      dataIndex: 'providedDate',
      key: 'providedDate',
      render: (providedDate) => formatDateTime(providedDate) ?? '-',
    },
    {
      title: 'Expiration date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (expirationDate) => {
        const remainingTime = getCountdown(expirationDate);
        return (
          <ExpirationText $expired={remainingTime === 'Expired'}>
            {remainingTime}
          </ExpirationText>
        );
      },
    },
    {
      title: 'Notes',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (uuid, r) => {
        const handleDeleteNotes = () => {
          setIsDeletingNote(true);
          setOpenModal(false);
          dispatch(
            addNoteToCategoryItem({
              customerId: '',
              customerName: '',
              description: '',
              itemId: r.uuid,
            })
          );
        };

        return (
          <AddRemoveNoteButtonContainer>
            <Button
              className={r.customerId ? 'added-button' : 'add-button'}
              type="link"
              onClick={() => handleClickAddRemoveNote(r, !!r.customerId)}
            >
              {r.customerId ? 'View' : '+ Add note'}
            </Button>
            {r.customerId && (
              <>
                <DeleteButtonOfModal
                  src={DeleteIcon}
                  alt="Delete"
                  onClick={() => setOpenModal(true)}
                />
                <Modal
                  isOpen={openModal}
                  onClose={handleCancelDelete}
                  onOk={handleDeleteNotes}
                  title="Are you sure you want to delete it?"
                  footer={true}
                ></Modal>
              </>
            )}
          </AddRemoveNoteButtonContainer>
        );
      },
    },
  ];

  useEffect(() => {
    if (success.assignNoteToItem) {
      handleCloseNotesModal();
      dispatch(setResetAssignNoteSuccess());

      if (isDeletingNote) {
        notifySuccess('Note deleted successfully');
      } else if (isEditingNote) {
        notifySuccess('Note updated successfully');
      } else {
        notifySuccess('Note added successfully');
      }

      setIsDeletingNote(false);
      setIsEditingNote(false);
    }
  }, [success.assignNoteToItem]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeIcon
        width={'fit-content'}
        height={'350px'}
      >
        <DetailsTableWrapper>
          <Table data={data} columns={COLUMNS} />
          <AddRemoveNoteToItem />
        </DetailsTableWrapper>
      </Modal>
      <AddRemoveNoteToItem
        data={itemToAddNote}
        isOpen={isNotesModalOpen}
        onClose={handleCloseNotesModal}
        isLoading={isLoading.assignNoteToItem}
        hasNote={hasNote}
      />
    </>
  );
};

export default PersonalItemDetails;
