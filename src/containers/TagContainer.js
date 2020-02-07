import React, { useState } from 'react';
import styled from 'styled-components';
import TagBtn from 'components/TagBtn';
import { tagList } from 'static/tagList';


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

// const tagList = ['공공기관', '교육', '금융', '디자인', 
//                  '라이프스타일', '미디어', '법률', '비영리단체', 
//                  '스타트업', '시사', '영화제', '음악', '출판', 
//                  '커머스', '패션', '푸드'];

function TagContainer({ handleTags, checkSelectTag }) {
  
  return (
    <TagArea className="tagArea">
      <TagBox className="tagBox">
        <h1>Tags</h1>
        <span>(태그를 선택해주세요)</span>
      </TagBox>

      <TagListUl>
          <TagListLi>
            {
              tagList.map((tag, idx) => (
                <TagBtn 
                  tag={tag} 
                  key={idx}
                  handleToggle={handleTags}
                  toggleActive={checkSelectTag(tag)}
                />
              ))
            }
          </TagListLi>
      </TagListUl>
    </TagArea>
  )
}

export default TagContainer;
