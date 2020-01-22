import React from 'react';
import styled from 'styled-components';

const TagButton = styled.button`
    display: inline-block;
    background: #f4f4f5;
    padding: 9px 15px;
    font-size: 14px;
    border: 0;
    border-radius: 50em;
    margin: 0 3px 10px;

    &.active {
      background: #ffcb08;
    }

    &:focus {
      outline: none;
    }
`;

function TagBtn({ tag, toggleActive, handleToggle }) {
  return (
    <TagButton 
      className={toggleActive && 'active'} 
      onClick={() => handleToggle(tag)} 
    >
      {tag}
    </TagButton>
  )
}

export default TagBtn;
