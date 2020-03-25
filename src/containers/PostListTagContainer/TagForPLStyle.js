import styled from 'styled-components';

// TagContainer for postList
const TagArea = styled.nav`
  text-align: center;
`;

TagArea.TagListUl = styled.ul`
  padding: 0 120px;
`;

TagArea.TagListLi = styled.li`
  display: inline-block;
  list-style: none;
`;

export default TagArea;
