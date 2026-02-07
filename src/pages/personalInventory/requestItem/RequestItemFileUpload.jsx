import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import {
  submitBatchRequests,
  validateBatchRequests,
} from 'features/inventory/inventoryActions';
import { selectBatchValidationResult, selectLoading } from 'features/inventory/inventorySlice';

import {
  ButtonWrapper,
  Container,
  Description,
  Title,
  UploadFile,
  UploadFileWrapper,
} from './RequestItemFileUpload.styles';

const RequestItemFileUpload = ({ isOpen, onClose, onSelectRegular }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const validationResult = useSelector(selectBatchValidationResult);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationStep, setValidationStep] = useState('upload');
  const fileInputRef = React.useRef(null);

  const handleFileSelect = (files) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setValidationStep('upload');
    }
  };

  const handleValidate = async () => {
    if (selectedFile) {
      setValidationStep('validating');

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const result = await dispatch(validateBatchRequests(formData));
        if (result.meta.requestStatus === 'fulfilled') {
          // Auto-submit after successful validation
          setValidationStep('submitting');
          const submitResult = await dispatch(submitBatchRequests(result.payload));
          if (submitResult.meta.requestStatus === 'fulfilled') {
            handleSubmit();
            onClose();
          } else {
            setValidationStep('review');
          }
        } else {
          setValidationStep('upload');
        }
      } catch (error) {
        console.error('Upload failed:', error);
        setValidationStep('upload');
      }
    }
  };

  const handleSubmit = () => {
    if (validationResult) {
      setValidationStep('submitting');
      dispatch(submitBatchRequests(validationResult)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setSelectedFile(null);
          setValidationStep('upload');
          onClose();
        } else {
          setValidationStep('review');
        }
      });
    }
  };

  const handleClose = () => {
    onClose();
  };

  const isExcelFile = (file) => {
    const excelMimeTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    return (
      excelMimeTypes.includes(file.type) ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.csv')
    );
  };

  const handleRegularRequest = () => {
    onClose();
    onSelectRegular();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0 && isExcelFile(files[0])) {
      handleFileSelect([files[0]]);
    } else if (files && files.length > 0) {
      alert('Please select a valid Excel file (.xls, .xlsx, or .csv)');
    }
  };

  return (
    <Modal closeIcon isOpen={isOpen} onClose={handleClose} width="430px">
      <Container>
        <UploadFile onClick={handleUploadClick}>+</UploadFile>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx,.csv"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        <Title>Request Form</Title>
        <Description>
          Submit request by filling in the form manually or by {'\n'} uploading a ready request
        </Description>
      </Container>
      <ButtonWrapper>
        <div>
          <Button onClick={handleRegularRequest} secondary>
            Regular Request
          </Button>
        </div>
        <UploadFileWrapper>
          <Button
            onClick={handleValidate}
            disabled={
              !selectedFile || !isExcelFile(selectedFile) || loading.validateBatchRequests
            }
          >
            {loading.validateBatchRequests ? 'Processing...' : 'Upload  File'}
          </Button>
        </UploadFileWrapper>
      </ButtonWrapper>
    </Modal>
  );
};

export default RequestItemFileUpload;
