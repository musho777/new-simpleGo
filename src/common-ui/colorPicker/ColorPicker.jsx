import React, { forwardRef, useRef } from 'react';

import rainbow from 'assets/project/rainbow.png';
import success from 'assets/project/success.png';

import {
  ColorChoose,
  ColorMainDiv,
  ColorName,
  ColorPalette,
  ColorPreview,
  ColorSwatch,
  Container,
  DefaultColor,
  Icon,
  Input,
  SelectColorSpan,
  SelectedColor,
} from './ColorPicker.styles';

const ColorPicker = forwardRef(
  ({ colorOptions, selectedColor, handleColorClick, label, onChange }, ref) => {
    const colorInputRef = useRef();

    const handleColorChooseClick = () => {
      if (colorInputRef.current) {
        colorInputRef.current.click();
      }
    };

    return (
      <Container>
        <ColorMainDiv>
          {label && <SelectColorSpan>{label}</SelectColorSpan>}
          <ColorPalette>
            {colorOptions.map((color) => (
              <DefaultColor key={color} isSelected={selectedColor === color}>
                <ColorSwatch
                  color={color}
                  ref={ref}
                  isSelected={selectedColor === color}
                  onClick={() => handleColorClick(color)}
                >
                  {selectedColor === color && <Icon src={success} alt="Success" />}
                </ColorSwatch>
              </DefaultColor>
            ))}
            <DefaultColor
              isSelected={!colorOptions.includes(selectedColor)}
              onClick={handleColorChooseClick}
            >
              <ColorChoose src={rainbow} alt="Rainbow" />
              {selectedColor && !colorOptions.includes(selectedColor) && (
                <Icon
                  src={success}
                  alt="Success"
                  style={{ position: 'absolute', top: '8px', left: '8px' }}
                />
              )}
              <Input
                type="color"
                ref={colorInputRef}
                onChange={(e) => {
                  const newColor = e.target.value;
                  handleColorClick(newColor);
                  if (onChange) onChange(newColor);
                }}
              />
            </DefaultColor>
          </ColorPalette>
        </ColorMainDiv>

        {selectedColor && (
          <SelectedColor>
            <ColorPreview color={selectedColor}>
              <ColorName>{selectedColor}</ColorName>
            </ColorPreview>
          </SelectedColor>
        )}
      </Container>
    );
  }
);

export default ColorPicker;
