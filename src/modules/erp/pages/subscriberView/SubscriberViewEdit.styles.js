import styled from 'styled-components';

export const Container = styled.div`
  padding: 25px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SearchSection = styled.div`
  margin-bottom: 30px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: #1d3557;
    margin-bottom: 24px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  .select-container {
    flex: 1;
    min-width: 250px;
  }

  .input-container {
    flex: 1;
    min-width: 250px;
  }
`;

export const CustomerSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 22px 0px rgba(108, 117, 125, 0.25);

  h2 {
    font-size: 20px;
    font-weight: 500;
    color: #1d3557;
    margin-bottom: 20px;
  }

  .subscriber-data {
    margin: 20px 0;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;

    pre {
      margin: 0;
      font-size: 12px;
      color: #495057;
    }
  }
`;

export const ErrorText = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
  font-weight: 500;
`;

export const LoadingText = styled.div`
  color: #6c757d;
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
`;

export const WarningText = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
`;

export const InputWithIcons = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 2;
  margin-top: 12px;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const PassportLabel = styled.label`
  color: #1d3557;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
`;

export const ServiceAddressLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-right: 20px;
`;

export const ServiceAddressLabel = styled(PassportLabel)`
  margin: 0;
`;

export const EditIconButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  &:hover {
    opacity: 0.7;
  }
`;
