import React, { useState } from 'react';
import styled from 'styled-components';
import PostlistTagBtn from 'components/PostlistTagBtn';


const TagArea = styled.nav`
  text-align: center;
`;

const TagListUl = styled.ul`
  padding: 0;
`;

const TagListLi = styled.li`
  display: inline-block;
  list-style: none;
`;

const tagList = ['태그1', '태그2', '태그3', '태그4'];

function TagContainer() {
  const [selectTag, setSelectTag] = useState([]);
  const [isActive, setIsActive] = useState('');
  
  const handleSelectTag = (tagName) => {
    console.log('tagName: ', tagName);
    setIsActive(tagName);
  }

  return (
    <TagArea>
      <TagListUl>
          <TagListLi>
            {
              tagList.map((tag, idx) => (
                <PostlistTagBtn 
                  tag={tag} 
                  key={idx}
                  isActive={isActive === tag ? true : false}
                  handleActive={handleSelectTag}
                />
              ))
            }
          </TagListLi>
      </TagListUl>
    </TagArea>
  )
}

export default TagContainer;
