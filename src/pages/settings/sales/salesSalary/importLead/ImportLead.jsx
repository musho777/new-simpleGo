import React, { useState } from 'react';

import ImportIcon from 'assets/Not Found illustration.png';
import EmptyView from 'pages/components/emptyView';

import { Container } from '../Sales.styles';
import CreateModal from './Create';

const ImportLead = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userType = localStorage.getItem('userType');
  const access = userType === 'Super Admin' || userType === 'General Manager';
  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <EmptyView
        icon={ImportIcon}
        button={access}
        buttonTitle="Create Import Lead"
        onClick={handleImportClick}
      />

      {isModalOpen && (
        <CreateModal isEdit={false} onCloseEdit={handleCloseModal} openFromParent />
      )}
    </Container>
  );
};

export default ImportLead;
