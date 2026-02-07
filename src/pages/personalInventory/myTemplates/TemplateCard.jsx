import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import EditIcon from 'assets/edit.svg';
import Trash from 'assets/profile/trash.svg';
import Modal from 'common-ui/modal';
import { deleteTemplate } from 'features/inventory/inventoryActions';

import {
  CardContainer,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CreatedDate,
  Icon,
  IconWrapper,
  ModalText,
} from './MyTemplates.styles';

const TemplateCard = ({ template, onClick, onDelete, onEdit }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteTemplate(template.uuid)).unwrap();
      if (onDelete) {
        onDelete(template.uuid);
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting template:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <CardContainer onClick={onClick}>
        <CardContent>
          <CardHeader>
            <CardTitle title={template.name}>{template.name}</CardTitle>
            <IconWrapper>
              <Icon
                src={EditIcon}
                alt="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              />
              <Icon src={Trash} alt="Trash" onClick={handleClickDelete} />
            </IconWrapper>
          </CardHeader>
          <CardFooter>
            <CreatedDate>Created: {formatDate(template.createdAt)}</CreatedDate>
          </CardFooter>
        </CardContent>
      </CardContainer>

      <Modal
        isOpen={showDeleteModal}
        onOk={handleConfirmDelete}
        onClose={handleCancelDelete}
        title="Delete Template"
        width="430px"
        height="auto"
        isLoading={isDeleting}
        footer
      >
        <ModalText>
          Are you sure you want to delete template &quot;{template.name}&quot;?
        </ModalText>
      </Modal>
    </>
  );
};

export default TemplateCard;
