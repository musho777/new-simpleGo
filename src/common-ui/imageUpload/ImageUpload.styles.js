import styled from 'styled-components';

export const CropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  gap: 29px;
  align-items: center;
`;

export const Video = styled.video`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background-color: #000;
  transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform-origin: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;

  button {
    width: 128px;
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Slider = styled.input`
  width: 221px;
  height: 3px;
  background: #e0e0e0;
  border-radius: 5px;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-runnable-track {
    height: 3px;
    background: #e0e0e0;
    border-radius: 99999px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 3px;
    background: #e0e0e0;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: #2d6cdf;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -4px;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #2d6cdf;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-thumb {
    background: #2d6cdf;
    border-radius: 50%;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PlusMinus = styled.img``;

export const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Dropdown = styled.ul`
  width: 152px;
  border-radius: 10px;
  padding: 5px;
  background: #fff;
  box-shadow: 0px 4px 35px 9px rgba(0, 0, 0, 0.12);
  position: absolute;
  list-style-type: none;
  right: 100%;
  transform: translate(100%, 0);

  color: #1d3557;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
`;

export const DropdownItem = styled.li`
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  .menu-icon {
    width: 16px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const ChildWrapper = styled.div`
  position: relative;
`;
