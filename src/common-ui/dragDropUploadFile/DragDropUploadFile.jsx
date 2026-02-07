import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { useDropzone } from 'react-dropzone';

import { Alert, Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import trash from 'assets/profile/trash.svg';
import Tag from 'pages/components/tag';
import PropTypes from 'prop-types';
import { formatFileSize } from 'utils';

import { Column, Icon, Row, RowEnd } from './DragDropUploadFile.styles';
import fileIcon from './file.svg';
import successIcon from './success.svg';
import uploadIcon from './upload.svg';

const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FORMATS_DEFAULT = {
  'video/*': [],
  'audio/*': [],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/pdf': ['.pdf'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
};
const defaultUploadDescription = `Max 20 files, 10MB per file, 100MB total. Formats: video, audio, doc, docx, pdf, ppt, pptx, xls, xlsx, jpeg, jpg, png`;

const DragDropUploadFile = forwardRef(
  (
    {
      uploadDescription = defaultUploadDescription,
      ACCEPTED_FORMATS = ACCEPTED_FORMATS_DEFAULT,
      onFilesChange,
      defaultFiles,
      removeDefaultFile,
      isMulti = true,
      maxFiles = 20,
      clickTitle = 'Browse',
      uploadTitle = 'or drag and drop',
    },
    ref
  ) => {
    const MAX_FILES = maxFiles;

    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    const calculateTotalSize = (fileList) =>
      fileList.reduce((total, file) => total + file.size, 0);

    const onDrop = (acceptedFiles, rejectedFiles) => {
      const filteredFiles = acceptedFiles.filter(
        (newFile) =>
          !files.some(
            (existingFile) =>
              existingFile.name === newFile.name && existingFile.size === newFile.size
          )
      );

      const totalSize = calculateTotalSize(files) + calculateTotalSize(filteredFiles);

      if (rejectedFiles.length > 0) {
        setError('Some files were rejected due to size or format.');
      } else if (totalSize > MAX_TOTAL_SIZE) {
        setError('Total file size exceeds 100MB.');
      } else if (files.length + filteredFiles.length > MAX_FILES) {
        setError(`You can upload a maximum of ${MAX_FILES} files.`);
      } else if (filteredFiles.length < acceptedFiles.length) {
        setError('Some files are duplicates and were not added.');
      } else {
        setError('');
        const updatedFiles = [...files, ...filteredFiles].slice(0, MAX_FILES);
        setFiles(updatedFiles);

        if (onFilesChange) onFilesChange(updatedFiles);
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: ACCEPTED_FORMATS,
      maxSize: MAX_FILE_SIZE,
      multiple: isMulti || true,
    });

    const removeFile = (fileName) => {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      setFiles(updatedFiles);

      if (updatedFiles.length <= MAX_FILES) {
        setError('');
      }

      if (onFilesChange) onFilesChange(updatedFiles);
    };

    const clearAllFiles = () => {
      setFiles([]);
      setError('');
      if (onFilesChange) onFilesChange([]);
    };

    useImperativeHandle(ref, () => ({
      clearAllFiles,
      getFiles: () => files,
    }));

    return (
      <Box>
        <Paper
          {...getRootProps()}
          sx={{
            p: 3,
            textAlign: 'center',
            border: '1px dashed #D4D8DD !important',
            borderColor: isDragActive ? 'primary.main' : '#D4D8DD',
            bgcolor: isDragActive ? 'primary.light' : 'background.default',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            boxShadow: 'none',
          }}
        >
          <input {...getInputProps()} />
          <Icon src={uploadIcon} alt="Upload Icon" />
          {isDragActive ? (
            <Typography variant="body1" color="primary">
              Drop the files here...
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              <span style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                {clickTitle}
              </span>{' '}
              {uploadTitle}
            </Typography>
          )}
          <Typography variant="caption" color="textSecondary">
            {uploadDescription}
          </Typography>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {files.length > 0 && (
          <RowEnd>
            <div onClick={clearAllFiles}>
              <Tag type="statuses" variant="Remove all x" />
            </div>
          </RowEnd>
        )}

        <Stack
          spacing={1}
          sx={{
            mt: 2,
            maxHeight: '190px',
            overflowY: 'auto',
            maskImage: 'linear-gradient(#000, #000)',
            WebkitMaskImage: 'linear-gradient(#000, #000)',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          {files.map((file) => (
            <Box
              key={file.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '8px',
                background: '#FBFCFF',
                paddingTop: '12px !important',
                paddingRight: '16px !important',
                paddingBottom: '12px !important',
                paddingLeft: '16px !important',
                p: 1,
              }}
            >
              <Row>
                <Icon src={fileIcon} alt="file" style={{ width: '18px', height: '22px' }} />
                <Column>
                  <p>{file.name}</p>
                  <p>{formatFileSize(file.size)}</p>
                </Column>
              </Row>
              <Row>
                <Icon src={successIcon} alt="success" style={{ width: '20px' }} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeFile(file.name)}
                >
                  <Icon src={trash} alt="trash" style={{ width: '30px' }} />
                </IconButton>
              </Row>
            </Box>
          ))}
          {defaultFiles && (
            <>
              {defaultFiles?.map((file) => (
                <Box
                  key={file.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '8px',
                    background: '#FBFCFF',
                    paddingTop: '12px !important',
                    paddingRight: '16px !important',
                    paddingBottom: '12px !important',
                    paddingLeft: '16px !important',
                    p: 1,
                  }}
                >
                  <Row>
                    <Icon
                      src={fileIcon}
                      alt="file"
                      style={{ width: '18px', height: '22px' }}
                    />
                    <Column>
                      <p>{file.name}</p>
                      <p>{formatFileSize(file.size)}</p>
                    </Column>
                  </Row>
                  <Row>
                    <Icon src={successIcon} alt="success" style={{ width: '20px' }} />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeDefaultFile(file.uuid)}
                    >
                      <Icon src={trash} alt="trash" style={{ width: '30px' }} />
                    </IconButton>
                  </Row>
                </Box>
              ))}
            </>
          )}
        </Stack>
      </Box>
    );
  }
);

DragDropUploadFile.propTypes = {
  onFilesChange: PropTypes.func,
};

export default DragDropUploadFile;
