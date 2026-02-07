import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  position: relative;

  .ql-toolbar {
    border-radius: 20px 20px 0 0;
    padding: 17px 22px;
  }

  .ql-tooltip {
    left: 10px !important;
  }

  .ql-container {
    border-radius: 0 0 20px 20px;
    padding-bottom: 20px;
  }

  .ql-editor.ql-blank {
    padding: 17px !important;
  }

  .ql-editor {
    padding-right: ${({ $sendButton }) => ($sendButton ? '55px' : '20px')};
    word-break: break-word;
    padding-left: 20px;
    min-height: 80px;
    max-height: 140px;
    overflow-y: auto;

    mask-image: linear-gradient(#000, #000);
    -webkit-mask-image: linear-gradient(#000, #000);

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  }

  .ql-error {
    .ql-toolbar {
      border: 1px solid red;
    }

    .ql-container {
      border-left: 1px solid red;
      border-right: 1px solid red;
      border-bottom: 1px solid red;
    }
  }
`;

export const SendBtnWrapper = styled.button`
  position: absolute;
  right: 21px;
  bottom: 24px;
  cursor: pointer;
  opacity: ${({ $sendBtnDisabled }) => ($sendBtnDisabled ? '0.5' : '1')};
  background: none;
  border: none;
  &:hover {
    opacity: 0.5;
  }
`;

export const Icon = styled.img``;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 30px;
  height: 30px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-self: start;
  margin-bottom: 5px;

  span {
    color: ${theme.colors.danger};
    margin-left: 2px;
  }
`;
export const ErrorText = styled.legend`
  color: #e63946;
  font-weight: 600;
  display: flex;
  justify-content: end;
  font-size: 12px;
  line-height: 20px;
`;
