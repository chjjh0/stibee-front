import React from 'react';
import styled from 'styled-components';

const BasicButton = styled.button`
  background: ${props => props.style.backColor || 'white'};
  font-size: ${props => props.style.fontSize || '14px'};
  color: ${props => props.style.fontColor || 'black'};
  border: 0;
  border-radius: 100px;
  padding: 0 30px;
  line-height: 40px;
`;

function BasicBtn({ btnName, func, style }) {
  return (
    <BasicButton style={style} onClick={func}>
      {btnName}
    </BasicButton>
  )
}

export default BasicBtn;
