import React, { useState } from 'react';
// lib
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
// redux
import { useDispatch } from 'react-redux';
import { setTag } from '../modules/posts';
// components
import PostDetailHeader from '../components/PostDetailHeader';
import PostDetailBody from '../components/PostDetailBody';
// static
import { tagListForPostList } from '../static/tagList';

const Main = styled.main`
  position: relative;
  padding: 0 120px;

  @media screen and (max-width: 640px) {
    padding: 0 30px;
  }
`;

const LoadingLayout = styled.div`
  text-align: center;
  color: #ffcb08;
`;

const ItemUl = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;

  &::after {
    display: block;
    content: '';
    clear: both;
  }
`;

const ItemLi = styled.li`
  list-style: none;
  float: left;
  width: 21.2%;
  margin: 0 1.9% 65px;

  @media screen and (max-width: 640px) {
    float: none;
    width: 100%;
    margin: 0 0 60px 0;
  }
`;

const ItemBox = styled.div`
  position: relative;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  min-height: 345px;
  cursor: pointer;
`;

const ImgBox = styled.div`
  width: 100%;
  max-height: 345px;
  overflow: hidden;
`;

const ItemImg = styled.img`
  width: 100%;
  height: auto;
  vertical-align: middle;
`;

const ItemCont = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  background: #ffcb08;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  transition: all ease 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ContTitle = styled.h1`
  font-size: 18px;
  padding: 67% 0 10px 0;
  margin: 0;
`;

const ContCreatAt = styled.h2`
  font-size: 12px;
  font-weight: normal;
`;

const TagBox = styled.div`
  padding-top: 8px;

  @media screen and (max-width: 640px) {
    text-align: right;
  }
`;

const TagUl = styled(ItemUl)`
  padding: 0;
`;

const TagLi = styled.li`
  font-size: 9px;
  padding: 5px 7px;
  border: 1px solid #dcdce1;
  border-radius: 50em;
  display: inline-block;
  margin: 0 3px 0 0;
  list-style: none;
  cursor: pointer;
`;

const PaginationArea = styled.div`
  text-align: center;
  padding: 5%;
  margin-bottom: 1.5rem;

  .fade {
    font-size: 1.5rem;
    font-weight: 540;
  }

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

const PaginationBtn = styled.button`
  background: #e6e6eb;
  border: 0;
  border-radius: 50em;
  padding: 14px 42px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  transition: all ease 0.2s;
`;

function PostMain({
  posts,
  loading,
  errorMsg,
  handlePagination,
  fetchFindByTag,
}) {
  const [currentPost, setCurrentPost] = useState({});
  const [show, setShow] = useState(false);
  // redux
  const dispatch = useDispatch();

  const changeDate = date => {
    // ex) "2020-01-21T18:59:36.774Z"
    return date.split('T')[0];
  };

  const checkErrorMsg = () => {
    if (errorMsg.data) {
      return errorMsg.data.errMsg === 'endPage' ? true : false;
    }
  };

  const handleSelectTag = (e, tagName) => {
    e.stopPropagation();
    dispatch(setTag(convertTagObj(tagName)));
    fetchFindByTag(convertTagObj(tagName));
  };

  const convertTagObj = tagName => {
    return tagListForPostList.filter(tag => {
      return tag.nameKor === tagName;
    })[0];
  };

  const handleClose = () => setShow(false);
  const handleShow = postIdx => {
    setCurrentPost(posts[postIdx]);
    setShow(true);
  };

  const onTogglePaginationBtn = () => {
    return (
      <PaginationBtn onClick={() => handlePagination()}>더보기</PaginationBtn>
    );
  };

  if (loading && !posts) {
    return (
      <LoadingLayout>
        <CircularProgress color="inherit" />
      </LoadingLayout>
    );
  }

  return (
    <Main>
      <ItemUl>
        {posts &&
          posts.map((post, idx) => (
            <ItemLi key={idx} onClick={() => handleShow(idx)}>
              <ItemBox>
                <ImgBox>
                  <ItemImg src={post.screenshot} />
                </ImgBox>

                <ItemCont>
                  <ContTitle>{post.title}</ContTitle>
                  <ContCreatAt>{changeDate(post.updatedAt)}</ContCreatAt>
                </ItemCont>
              </ItemBox>

              <TagBox>
                <TagUl>
                  {post.tags.map((tag, idx) => (
                    <TagLi key={idx} onClick={e => handleSelectTag(e, tag)}>
                      {tag}
                    </TagLi>
                  ))}
                </TagUl>
              </TagBox>
            </ItemLi>
          ))}
      </ItemUl>
      {/* post가 없는 처음에만 로딩 노출, 더보기가 출렁여서 더보기때는 로딩을 빼기위함 */}
      <PaginationArea>
        {errorMsg && checkErrorMsg() ? (
          <div>데이터가 없습니다</div>
        ) : (
          posts && onTogglePaginationBtn()
        )}
      </PaginationArea>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <PostDetailHeader currentPost={currentPost} />
        </Modal.Header>

        <Modal.Body scrollable="true">
          <PostDetailBody currentPost={currentPost} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Main>
  );
}

export default PostMain;
