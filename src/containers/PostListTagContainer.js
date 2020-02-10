import React, { useState } from 'react';
import styled from 'styled-components';
import PostlistTagBtn from 'components/PostlistTagBtn';
import { tagListForPostList } from 'static/tagList';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setTag } from '../modules/post'




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

function TagContainer({ fetchFindByTag, fetchPost }) {
  const [isActive, setIsActive] = useState('');
  // redux
  const selectedTag = useSelector(state => state.post.selectedTag);
  const dispatch = useDispatch();

  
  const handleSelectTag = (tag) => {
    // console.log('postListcontainer tagName: ', tag);
    setIsActive(tag.nameKor);
    if (tag.nameEng === 'all') {
      dispatch(setTag(tag));
      fetchPost(true);
    } else {
      dispatch(setTag(tag));
      fetchFindByTag(tag);
    }
  }

  return (
    <TagArea>
      <TagListUl>
      {
        tagListForPostList.map((tag, idx) => (
          <TagListLi>
            <PostlistTagBtn 
              tag={tag} 
              key={idx}
              isActive={selectedTag.nameKor === tag.nameKor ? true : false}
              handleActive={handleSelectTag} />
          </TagListLi>
        ))
      }
      </TagListUl>
    </TagArea>
  )
}

export default TagContainer;
