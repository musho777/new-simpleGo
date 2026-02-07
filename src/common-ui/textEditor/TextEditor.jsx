import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useEffect } from 'react';

import ReactQuill from 'react-quill';

import errorIcon from 'common-ui/input/assets/error.svg';
import { CharacterCount, EditorCount } from 'common-ui/textArea/TextArea.styles';
import PropTypes from 'prop-types';
import { stripHtmlTags } from 'utils';
import { notifyError } from 'utils/notifyConfig';

import {
  Container,
  ErrorText,
  Icon,
  Label,
  LoadingIcon,
  SendBtnWrapper,
} from './TextEditor.styles';
import loadingIcon from './loading.svg';
import sendIcon from './send.svg';

const TextEditor = forwardRef(
  (
    {
      value,
      label,
      loading = false,
      onChange,
      placeholder,
      sendButton = false,
      sendBtnDisabled = false,
      handleSendClick,
      maxLength = 10000,
      errorText,
      required,
      ...props
    },
    ref
  ) => {
    const quillRef = useRef(null);

    const handleChange = (content) => {
      if (onChange) {
        onChange(content);
      }
    };

    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current?.getEditor(),
      focus: () => {
        const editor = quillRef.current?.getEditor();
        if (editor) {
          editor.focus();
        }
      },
    }));

    const handleSend = () => {
      if (handleSendClick && !loading && !sendBtnDisabled) {
        handleSendClick(value);
      }
    };

    useEffect(() => {
      const quill = quillRef.current.getEditor();
      const onDrop = (e) => {
        const hasImage = Array.from(e.dataTransfer.items).some((item) =>
          item.type.includes('image')
        );
        if (hasImage) {
          notifyError('Image pasting is not supported');
          e.preventDefault();
        }
      };

      const onPaste = (e) => {
        const hasImage = Array.from(e.clipboardData.items).some((item) =>
          item.type.includes('image')
        );
        if (hasImage) {
          notifyError('Image pasting is not supported');
          e.preventDefault();
        }
      };

      quill.root.addEventListener('drop', onDrop);
      quill.root.addEventListener('paste', onPaste);

      return () => {
        quill.root.removeEventListener('drop', onDrop);
        quill.root.removeEventListener('paste', onPaste);
      };
    }, []);

    return (
      <>
        {label && (
          <Label>
            {label}
            {required && <span>*</span>}
          </Label>
        )}

        <Container $sendButton={sendButton}>
          <ReactQuill
            {...props}
            ref={quillRef}
            className={
              stripHtmlTags(value)?.length > maxLength || errorText
                ? 'ql-error'
                : 'text-editor'
            }
            theme="snow"
            value={value}
            onChange={handleChange}
            placeholder={placeholder || 'Type your content here...'}
          />
          {sendButton && (
            <SendBtnWrapper
              $sendBtnDisabled={sendBtnDisabled}
              disabled={sendBtnDisabled}
              onClick={handleSend}
              type="submit"
            >
              {loading ? (
                <LoadingIcon alt="loading" src={loadingIcon} />
              ) : (
                <Icon src={sendIcon} alt="sendIcon" />
              )}
            </SendBtnWrapper>
          )}
          {errorText && (
            <ErrorText>
              <Icon src={errorIcon} alt="error" />
              {errorText}
            </ErrorText>
          )}
          <CharacterCount>
            <EditorCount $isExceeded={stripHtmlTags(value)?.length > maxLength}>
              {stripHtmlTags(value)?.length}
            </EditorCount>
            -{maxLength} characters
          </CharacterCount>
        </Container>
      </>
    );
  }
);

TextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  sendButton: PropTypes.bool,
  sendBtnDisabled: PropTypes.bool,
  handleSendClick: PropTypes.func,
};

export default TextEditor;
