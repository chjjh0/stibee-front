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
  transition: all ease .2s;

  &.active {
    background: #ffcb08;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: #ffcb08;
  }
`;

function PostlistTagBtn({ tag, isActive, handleActive }) {
  return (
    <TagButton 
      className={isActive && 'active'} 
      onClick={() => handleActive(tag)} 
    >
      {tag}
    </TagButton>
  )
}

export default PostlistTagBtn;
