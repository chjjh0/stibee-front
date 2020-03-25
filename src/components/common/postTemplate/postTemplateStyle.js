import styled from 'styled-components';

const PostEdit = styled.div`
  width: 100%;
  height: 100vh;
  padding: 5% 5%;
`;

PostEdit.PreviewImg = styled.img`
  width: 100%;
`;

PostEdit.OptionArea = styled.div`
  width: 100%;
  padding: 5% 2%;
  border: 1px solid #dfdfdf;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

PostEdit.BtnArea = styled.div`
  padding: 5% 5%;
  text-align: center;
`;

PostEdit.saveBtnStyle = {
  backColor: '#3d6fe2',
  fontSize: '18px',
  fontColor: '#fff',
};

PostEdit.previewBtnStyle = {
  backColor: '#fff',
  fontSize: '18px',
  fontColor: '#3d6fe2',
};

PostEdit.TitleArea = styled.div`
  padding-top: 5%;
`;

PostEdit.TitleInput = styled.input`
  border: 1px solid #dfdfdf;
  margin: 0 auto;
  width: 100%;
  font-size: 2rem;
  padding: 1%;
`;

export default PostEdit;
