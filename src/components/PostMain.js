import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, useTransition, animated } from 'react-spring';
import { Modal } from 'react-bootstrap';
// components
import PostDetailHeader from 'components/PostDetailHeader';
import PostDetailBody from 'components/PostDetailBody';
import Axios from 'axios';

const Main = styled.main`
  position: relative;
  padding: 0 120px;

  @media screen and (max-width: 640px) {
    padding: 0 30px;
  }
`;

const ItemUl = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;

  &::after {
    display: block;
    content: "";
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
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
  min-height: 345px;
  cursor: pointer;
`;

const ImgBox = styled.div`
  width: 100%;
  /* box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1); */
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
  transition: all ease .2s;

  &:hover {
    opacity: .9;
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
    content: "";
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
  transform:translateX(-50%);
  transition: all ease 0.2s;
`;


function PostMain({ posts, handlePagination, endPage }) {
  const [currentPost, setCurrentPost] = useState({});
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  // spring
  const fade = useSpring({
    to: [{ opacity: 1 }, { opacity: 0 }],
    from: { opacity: 0 },
    config: { duration: 1200 },
  })

  const props = useSpring({
    to: async (next, cancel) => {
      await next({opacity: 1, color: 'orange' })
      await next({opacity: 0, color: 'yellow' })
    },
    from: {opacity: 0, color: 'red', background: 'green'}
  })


  // useEffect(() => {
  //     setItem(posts)
  // }, [posts])

  const handleSelectTag = (e, tagName) => {
    e.stopPropagation();
    
  }

  const changeDate = (date) => {
    // "2020-01-21T18:59:36.774Z"
    return date.split('T')[0];
  }

  const handleClose = () => setShow(false);
  const handleShow = (postIdx) => {
    console.log('handleShow', postIdx);
    setCurrentPost(posts[postIdx]);
    setShow(true);
  }

  useEffect(() => {
    console.log(posts.length);
    posts.map(post => {
      console.log('postmain', post);
    })
    // setShow(true);
  }, [currentPost]);

  return (
    <Main>
      <ItemUl>
      {
        posts.map((post, idx) => (
          <ItemLi 
            key={idx} 
            onClick={() => handleShow(idx)}
          >
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
                {
                  post.tags.map((tag, idx) => (
                    <TagLi key={idx} onClick={(e) => handleSelectTag(e, tag)}>{tag}</TagLi>
                  ))
                }
              </TagUl>
            </TagBox>
          </ItemLi>
        ))
      }
      </ItemUl>

      <PaginationArea>
        {
          endPage ?
            <animated.div style={fade}>더 이상 데이터가 없습니다.</animated.div>
            : <PaginationBtn more={more} onClick={() => handlePagination()}>더보기</PaginationBtn>
        }
      </PaginationArea>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <PostDetailHeader 
            currentPost={currentPost}
          />
        </Modal.Header>

        <Modal.Body scrollable="true">
          <PostDetailBody 
            currentPost={currentPost}
          />
        </Modal.Body>

      </Modal>  
    </Main>
  )
}

export default PostMain;
