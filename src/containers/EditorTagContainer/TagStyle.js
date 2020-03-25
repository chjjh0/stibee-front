import styled from 'styled-components';

// TagContainer for editor
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

TagArea.TagBox = styled.div`
  margin-right: 25px;
  float: left;

  h1 {
    font-size: 2rem;
  }

  & span {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

TagArea.TagListUl = styled.ul`
  padding: 0;
`;

TagArea.TagListLi = styled.li`
  display: inline-block;
  list-style: none;
`;

export default TagArea;
