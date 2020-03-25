import React from 'react';
// style
import TagArea from './TagStyle';
// components
import TagBtn from 'components/TagBtn';
// static
import { tagListForPostEditor } from '../../static/tagList';
// lib
import { basicAl } from '../../lib/alert';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { removeOption, addOption } from '../../modules/postEdit';

function TagContainerForEditor() {
  const selectedTags = useSelector(({ postEdit }) => postEdit.tags);
  const dispatch = useDispatch();

  const checkSelectTag = tag => {
    return selectedTags.includes(tag);
  };

  const handleSelectTag = tag => {
    if (checkSelectTag(tag)) {
      dispatch(removeOption('tags', tag));
    } else if (selectedTags.length < 3) {
      dispatch(addOption('tags', tag));
    } else {
      basicAl(null, {
        icon: 'error',
        title: '태그는 3개까지 등록가능합니다. ',
      });
    }
  };

  return (
    <TagArea className="tagArea">
      <TagArea.TagBox className="tagBox">
        <h1>Tags</h1>
        <span>(태그를 선택해주세요)</span>
      </TagArea.TagBox>

      <TagArea.TagListUl>
        <TagArea.TagListLi>
          {tagListForPostEditor.map((tag, idx) => (
            <TagBtn
              tagName={tag.nameKor}
              key={idx}
              handleSelectTag={handleSelectTag}
              isActive={selectedTags.some(
                seletedTag => seletedTag === tag.nameKor,
              )}
            />
          ))}
        </TagArea.TagListLi>
      </TagArea.TagListUl>
    </TagArea>
  );
}

export default TagContainerForEditor;
