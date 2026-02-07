import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import {
  selectLoading,
  selectSuccess,
  setResetAssignNoteSuccess,
} from 'features/inventory/inventorySlice';
import { formatDateTime } from 'utils/dateUtils';
import { notifySuccess } from 'utils/notifyConfig';

import AddRemoveNoteToItem from './AddRemoveNoteToItem';
import { AddRemoveNoteButtonContainer, DetailsTableWrapper } from './Inventory.styles';

const PersonalItemDetails = ({ isOpen, onClose, data = [] }) => {
  const dispatch = useDispatch();

  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [itemToAddNote, setItemToAddNote] = useState(null);
  const [hasNote, setHasNote] = useState(false);

  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);

  const handleClickAddRemoveNote = (r, hasNote) => {
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
      title: 'Notes',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (uuid, r) => (
        <AddRemoveNoteButtonContainer>
          <Button
            className={r.customerId ? 'added-button' : 'add-button'}
            type="link"
            onClick={() => handleClickAddRemoveNote(r, !!r.customerId)}
          >
            {r.customerId ? 'View' : '+ Add note'}
          </Button>
        </AddRemoveNoteButtonContainer>
      ),
    },
  ];

  useEffect(() => {
    if (success.assignNoteToItem) {
      handleCloseNotesModal();
      dispatch(setResetAssignNoteSuccess());
      notifySuccess('Item assigned successfully');
    }
  }, [success.assignNoteToItem]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeIcon height={'350px'}>
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
