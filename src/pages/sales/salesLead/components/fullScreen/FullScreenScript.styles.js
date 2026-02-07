import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: white;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};

  overflow: hidden; /* 🔴 important */
  overscroll-behavior: contain; /* 🔴 important */

  transition: opacity 0.25s ease;
  z-index: 999;
`;

export const Container = styled.div`
  position: fixed;
  inset: 0;
  background: #fff;
  overflow: auto;
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0%' : '100%')});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  padding: 20px;
  flex-direction: Row;
  gap: 20px;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Content = styled.div`
  background: #fff;
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .uploaded-files-wrapper {
    flex-wrap: wrap;
  }
`;

export const Card = styled.div`
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    transform: ${({ $noHover }) => ($noHover ? 'none' : 'translateY(-2px)')};
    box-shadow: ${({ $noHover }) =>
      $noHover ? 'none' : '0 25px 30px -5px rgba(0, 0, 0, 0.15)'};
  }
`;

export const Header = styled.div`
  border-radius: 16px 16px 0 0;
  border: 1px solid #e5e7eb;
  background: ${({ $background }) =>
    $background || 'linear-gradient(89deg, #1d3557 -82.95%, #3f73bd 32.31%)'};
  padding: 30px;
  display: flex;
  gap: 10px;
  align-items: center;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

export const HeaderTitle = styled.div`
  color: ${({ white }) => (white ? '#364153' : '#fff')};
  font-size: 16px;
  font-weight: 700;
`;

export const Body = styled.div`
  border-radius: 0 0 16px 16px;
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

export const Box = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Description = styled.div`
  border-radius: 14px;
  border: 2px solid #bedbff;
  background: linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%);
  padding: 26px;
`;

export const BoxTitle = styled.div`
  color: #364153;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: #e5e7eb;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media screen and (min-width: 1400px) {
    display: none;
  }
`;

export const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? '#2D6CDF' : '#f8f9fa')};
  color: ${({ $active }) => ($active ? '#fff' : '#6c757d')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#2D6CDF' : '#e9ecef')};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  button {
    width: max-content;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    background: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
`;

export const OptionWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .previous {
    width: max-content;
  }
  button {
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    background: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    &:focus {
      border-radius: 14px;
      border: 2px solid var(--succes_green, #15c7a7);
      background: linear-gradient(90deg, #ecfeff 0%, #eff6ff 100%);
      box-shadow:
        0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px -1px rgba(0, 0, 0, 0.1);
      outline: none;
    }
    div {
      justify-content: flex-start;
    }
  }
`;
export const PrevueWrapper = styled.div`
  padding: 0 20px 20px;
  display: flex;
  gap: 20px;
  button {
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    background: rgba(255, 255, 255, 0.8);
    width: max-content !important;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
`;

export const MessageSvg = styled.div`
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: max-content;
`;

export const Step = styled.div`
  border-radius: 14px;
  border: 1px solid #bedbff;
  background: linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%);
  display: flex;
  align-items: center;
  padding: 0px 10px;
  text-align: center;
  font-size: 16px;
  color: #2d6cdf;
  font-weight: 700;
`;

export const SuccessCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: max-content;
  padding: 80px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

export const SuccessIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const SuccessWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SuccessText = styled.div`
  color: #212529;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const SuccessDescription = styled.div`
  color: #6c757d;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #6c757d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: #fff;
    color: #212529;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;
