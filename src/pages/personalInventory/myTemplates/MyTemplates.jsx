import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTemplates } from 'features/inventory/inventoryActions';
import { BackToListBtn } from 'pages/projectManagement/singleTicketView/SingleTicketView.styles';

import RequestItem from '../requestItem';
import {
  Container,
  EmptyContainer,
  ErrorContainer,
  GridContainer,
} from './MyTemplates.styles';
import TemplateCard from './TemplateCard';

const MyTemplates = ({ searchTerm = '', onTemplateSelect }) => {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const fetchTemplates = async (search = '') => {
    setError(null);
    try {
      const params = {
        ...(search && { name: search }),
      };
      const response = await dispatch(getTemplates(params)).unwrap();
      setTemplates(response || []);
    } catch (err) {
      console.error('Error fetching templates:', err);
      setError('Failed to load templates');
      setTemplates([]);
    }
  };

  useEffect(() => {
    fetchTemplates(searchTerm);
  }, [searchTerm]);

  const handleTemplateClick = (template) => {
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  const handleTemplateDelete = (deletedTemplateId) => {
    setTemplates((prevTemplates) =>
      prevTemplates.filter((template) => template.uuid !== deletedTemplateId)
    );
  };

  const handleCloseRequestModal = () => {
    setIsRequestModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleTemplateEdit = (template) => {
    setSelectedTemplate(template);
    setIsRequestModalOpen(true);
  };

  const handleBack = () => {
    navigate(-1);
  };
  if (error) {
    return (
      <ErrorContainer>
        <p>{error}</p>
        <button onClick={() => fetchTemplates(searchTerm)}>Retry</button>
      </ErrorContainer>
    );
  }

  if (!templates.length) {
    return (
      <Container>
        <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>
        <EmptyContainer>
          <p>No templates found</p>
          {searchTerm && <p>Try adjusting your search criteria</p>}
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>
      <GridContainer>
        {templates.map((template) => (
          <TemplateCard
            key={template.uuid}
            template={template}
            onClick={() => handleTemplateClick(template)}
            onDelete={handleTemplateDelete}
            onEdit={() => handleTemplateEdit(template)}
          />
        ))}
        <RequestItem
          editTemplate={selectedTemplate}
          isOpen={isRequestModalOpen}
          onClose={handleCloseRequestModal}
        />
      </GridContainer>
    </Container>
  );
};

export default MyTemplates;
