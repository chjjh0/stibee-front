import React from 'react';
import styled from 'styled-components';

const BasicButton = styled.button`
  background: ${({ style }) => style.backColor || 'white'};
  font-size: ${({ style }) => style.fontSize || '14px'};
  color: ${({ style }) => style.fontColor || 'black'};
  border: 0;
  border-radius: 100px;
  padding: 0 30px;
  line-height: 40px;
`;

function BasicBtn({ btnName, func, style, disabled }) {
  return (
    <BasicButton style={style} onClick={func} disabled={disabled ? true : null}>
      {btnName}
    </BasicButton>
  );
}

export default BasicBtn;
