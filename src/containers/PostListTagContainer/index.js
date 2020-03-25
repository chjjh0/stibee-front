import React from 'react';
// style
import TagArea from './TagForPLStyle';
// components
import PostlistTagBtn from 'components/PostlistTagBtn';
import { tagListForPostList } from '../../static/tagList';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setTag } from '../../modules/posts';

function TagContainerForPostList() {
  // redux
  const selectedTag = useSelector(state => state.posts.selectedTag);
  const dispatch = useDispatch();

  const handleSelectTag = tag => {
    dispatch(setTag(tag));
  };

  return (
    <TagArea>
      <TagArea.TagListUl>
        {tagListForPostList.map((tag, idx) => (
          <TagArea.TagListLi key={idx}>
            <PostlistTagBtn
              tag={tag}
              key={idx}
              isActive={selectedTag.nameKor === tag.nameKor ? true : false}
              handleActive={handleSelectTag}
            />
          </TagArea.TagListLi>
        ))}
      </TagArea.TagListUl>
    </TagArea>
  );
}

export default TagContainerForPostList;
