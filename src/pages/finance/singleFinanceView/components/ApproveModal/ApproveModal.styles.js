import styled from 'styled-components';

export const Icon = styled.img``;
export const IconButton = styled.img`
  width: 15px;
  height: 15px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    min-height: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Text = styled.p`
  color: #15c7a7;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const ApproveButton = styled.div`
  width: 100%;
  button {
    background-color: #15c7a7;
    border-color: #15c7a7;
    &:hover {
      background-color: #0fa98d;
      border-color: #0fa98d;
    }
  }
  div {
    color: white;
  }
`;

export const AmountInfo = styled.div`
  background-color: #2d6cdf1a;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const KeyText = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const SwitchTitle = styled.div`
  color: #212529;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const SwitchText = styled.div`
  color: #6c757d;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const AmountText = styled.p`
  color: #2d6cdf;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: #2d6cdf1a;
`;
