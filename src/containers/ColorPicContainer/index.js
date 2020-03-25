import React from 'react';
// style
import ColorPickerArea from './ColorPickerStyle';
// lib
import { CirclePicker } from 'react-color';
import { basicAl } from '../../lib/alert';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { removeOption, addOption } from '../../modules/postEdit';

function ColorPicContainer() {
  const selectedColors = useSelector(({ postEdit }) => postEdit.colors);
  const dispatch = useDispatch();

  const checkSelectColor = color => {
    return selectedColors.includes(color);
  };

  const handleSelectColor = ({ hex }) => {
    if (checkSelectColor(hex)) {
      dispatch(removeOption('colors', hex));
    } else if (selectedColors.length < 3) {
      dispatch(addOption('colors', hex));
    } else {
      basicAl(null, {
        icon: 'error',
        title: '색상은 3개까지 등록가능합니다. ',
      });
    }
  };

  const cancelColor = hex => {
    dispatch(removeOption('colors', hex));
  };

  return (
    <ColorPickerArea className="colorPickerArea">
      <ColorPickerArea.ColorBox className="colors">
        <h1>Colors</h1>
        <span>(대표 색상을 선택해주세요)</span>
        <ul>
          {selectedColors.map((color, idx) => (
            <li key={idx}>
              <ColorPickerArea.ColorPicRes
                onClick={() => cancelColor(color)}
                color={color}
              />
            </li>
          ))}
        </ul>
      </ColorPickerArea.ColorBox>

      <ColorPickerArea.ColorPickerBox>
        <CirclePicker onChange={handleSelectColor} />
      </ColorPickerArea.ColorPickerBox>
    </ColorPickerArea>
  );
}

export default ColorPicContainer;
