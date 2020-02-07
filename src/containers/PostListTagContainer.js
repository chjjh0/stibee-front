import React, { useState } from 'react';
import styled from 'styled-components';
import PostlistTagBtn from 'components/PostlistTagBtn';
import { tagList } from 'static/tagList';



const TagArea = styled.nav`
  text-align: center;
`;

const TagListUl = styled.ul`
  padding: 0 120px;
`;

const TagListLi = styled.li`
  display: inline-block;
  list-style: none;
`;

function TagContainer({ fetchFindByTag }) {
  const [isActive, setIsActive] = useState('');
  
  const handleSelectTag = (tagName) => {
    console.log('postListcontainer tagName: ', tagName);
    setIsActive(tagName);
    fetchFindByTag(tagName);
  }

  return (
    <TagArea>
      <TagListUl>
      {
        tagList.map((tag, idx) => (
          <TagListLi>
            <PostlistTagBtn 
            tag={tag} 
            key={idx}
            isActive={isActive === tag ? true : false}
            handleActive={handleSelectTag} />
          </TagListLi>
        ))
      }
      </TagListUl>
    </TagArea>
  )
}

export default TagContainer;
