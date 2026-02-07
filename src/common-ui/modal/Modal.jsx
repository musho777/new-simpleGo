import React, { useCallback, useEffect } from 'react';

import { createPortal } from 'react-dom';

import Button from 'common-ui/button';
import PropTypes from 'prop-types';

import {
  Body,
  CloseButton,
  CloseIcon,
  CloseWrapper,
  Content,
  Footer,
  Header,
  Overlay,
  Title,
} from './Modal.styles';
import close from './close.svg';

const Modal = ({
  onOk,
  title,
  width,
  isOpen,
  footer,
  height,
  maxHeight,
  onClose,
  centered,
  children,
  container,
  disabled,
  className,
  onOkLoading,
  closeIcon,
  overlayClassName,
  okText = 'Submit',
  cancelText = 'Cancel',
  component: Component = 'div',
}) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      // onClose();
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const renderModal = () => {
    return (
      <>
        <Overlay className={overlayClassName} onClick={handleOverlayClick}>
          <Content
            className={className}
            $centered={centered}
            width={width}
            height={height}
            $maxHeight={maxHeight}
          >
            <CloseWrapper>
              <CloseButton onClick={onClose}>
                {closeIcon && <CloseIcon src={close} />}
              </CloseButton>
            </CloseWrapper>
            {title && <Header>{title && <Title>{title}</Title>}</Header>}
            <Body>{children}</Body>
            {footer && (
              <Footer>
                <Button onClick={onClose} outlined>
                  {cancelText}
                </Button>
                <Button type="submit" secondary onClick={onOk} loading={onOkLoading}>
                  {okText}
                </Button>
              </Footer>
            )}
          </Content>
        </Overlay>
      </>
    );
  };

  return isOpen
    ? createPortal(<Component>{renderModal()}</Component>, container || document.body)
    : null;
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  $centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  footer: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default Modal;
