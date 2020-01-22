import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { CirclePicker, SliderPicker } from 'react-color';


const ColorPickerArea = styled.div`
  float: left;
  width: 50%;

  & h1 {
    font-size: 2rem;
  }

  & li {
    display: inline-block;
    padding-right: 10px;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    text-align: center;
    margin-bottom: 10%;
  }
`;

const ColorBox = styled.div`
  margin-right: 25px;
  float: left;

  & span {
    display: block;
    margin-bottom: .5rem;
  }

  & ul {
    padding: 0;
    margin-bottom: 0;
  }

  @media screen and (max-width: 640px) {
    float: unset;
    margin-right: 0;
  }
`;

const ColorPickerBox = styled.div`
  @media screen and (max-width: 640px) {
    display: inline-block;
  }
`;

const ColorPicRes = styled.button`
  display: block;
  background: ${props => props.color || 'white' };
  border: solid 1px #dcdce1;
  border-radius: 20px;
  width: 25px;
  height: 25px;

  &:focus {
    outline: none;
  }
`;


function ColorPicContainer({ handleColorChange, cancelColorPicker, colorPicker }) {

  return (
    <ColorPickerArea className="colorPickerArea">
      <ColorBox className="colors">
        <h1>Colors</h1>
        <span>(대표 색상을 선택해주세요)</span>
        <ul>
          {
            colorPicker.map(({ id, hex }) => (
              <li key={id}>
                <ColorPicRes 
                  onClick={() => cancelColorPicker(hex)} 
                  color={hex} />
              </li>
            ))
          }
        </ul>
      </ColorBox>

      <ColorPickerBox>
        <CirclePicker onChange={handleColorChange} />
      </ColorPickerBox>
    </ColorPickerArea>
  )
}

export default ColorPicContainer;
