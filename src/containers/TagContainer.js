import React from 'react';
import styled from 'styled-components';
import TagBtn from 'components/TagBtn';
import { tagListForPostList } from 'static/tagList';


const TagArea = styled.div`
  float: right;
  width: 50%;

  @media screen and (max-width: 640px) {
    width: 100%;
    text-align: center;

    .tagBox {
      float: unset;
      margin-right: 0;
    }
  }
`;

const TagBox = styled.div`
  margin-right: 25px;
  float: left;

  h1 {
    font-size: 2rem;
  }

  & span {
    display: block;
    margin-bottom: .5rem;
  }
`;

const TagListUl = styled.ul`
  padding: 0;
`;

const TagListLi = styled.li`
  display: inline-block;
  list-style: none;
`;

function TagContainer({ handleSelectTag, selectedTags }) {
  return (
    <TagArea className="tagArea">
      <TagBox className="tagBox">
        <h1>Tags</h1>
        <span>(태그를 선택해주세요)</span>
      </TagBox>

      <TagListUl>
          <TagListLi>
            {
              tagListForPostList.map((tag, idx) => (
                <TagBtn 
                  tagName={tag.nameKor} 
                  key={idx}
                  handleSelectTag={handleSelectTag}
                  isActive={selectedTags.some(seletedTag => seletedTag === tag.nameKor)} />
              ))
            }
          </TagListLi>
      </TagListUl>
    </TagArea>
  )
}

export default TagContainer;
