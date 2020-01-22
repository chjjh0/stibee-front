import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// img
import stibeeLetter from 'asset/img/post/stibee_letter.png';
import lush from 'asset/img/post/lush.png';
import moneyLetter from 'asset/img/post/money_letter.png';
import newneek from 'asset/img/post/newneek.png';
// bootstrap
import { Modal, Button } from 'react-bootstrap';
// components
import PostDetailHeader from 'components/PostDetailHeader';
import PostDetailBody from 'components/PostDetailBody';

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

const PaginationBox = styled.div`
  text-align: center;

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
  

  &:focus {
    outline: none;
  }

  &.bounce {
    animation-name: bounce;
    animation-duration: 2s;

    /* 크로스브라우징 추가해야함 */
    /* https://codepen.io/velopert/pen/PzoWpE 참고 */
    @keyframes bounce {
      0% {
        opacity: .5;
        bottom: -30px;
      }
      100% {
        bottom: 0;
      }
    }
  }
`;

const CustomModal = styled.div`
  background: #f4f4f5;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #0003;
  border-radius: .3rem;
  outline: 0;
`;


function PostMain({ posts }) {
  const postItem = [stibeeLetter, lush, newneek, moneyLetter];
  const tagDummy = ['미디어', '스타트업'];
  const [item, setItem] = useState([]);
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);

  const paginationRef = useRef();
  

  useEffect(() => {
      setItem(posts)
    // console.log('paginationRef: ', paginationRef.current);
  }, [posts])

  const handleSelectTag = (tagName) => {
    // console.log('tagName: ', tagName);
    
  }

  const handleBounceEffect = () => {
    return new Promise((resolve, reject) => {
      paginationRef.current.classList.remove('bounce');
      // 리트리거용
      // 콘솔로 요소의 offsetWidth를 확인 또는 아래와 같이 할당하는 경우 리트리거 발생
      const test = paginationRef.current.offsetWidth;
      paginationRef.current.classList.add('bounce');
      resolve(true);
    })
  }

  const handlePagination = () => {
    console.log('handlePagination');
    handleBounceEffect().then(res => {
      console.log('next');
      setTimeout(() => {
        let temp = [...item];
        postItem.map(cuItem => {
          console.log('item: ', item);

          temp = temp.concat(cuItem);
          console.log('복사후 ', temp);

        })
        setItem(temp);

      }, 500)
    });  
  }

  const changeDate = (date) => {
    // "2020-01-21T18:59:36.774Z"
    return date.split('T')[0];
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Main>
      <ItemUl>
        {
          item.map((item, idx) => (
            <ItemLi key={idx} onClick={handleShow}>
              <ItemBox>
                <ImgBox>
                  <ItemImg src={`data:image/png;base64,${item.screenshot}`} />
                </ImgBox>

                <ItemCont>
                  <ContTitle>{item.title}</ContTitle>
                  <ContCreatAt>{changeDate(item.updatedAt)}</ContCreatAt>
                </ItemCont>
              </ItemBox>

              <TagBox>
                <TagUl>
                  {
                    tagDummy.map((tag, idx) => (
                      <TagLi key={idx} onClick={() => handleSelectTag(tag)}>{tag}</TagLi>
                    ))
                  }
                </TagUl>
              </TagBox>
            </ItemLi>
          ))
        }
      </ItemUl>

      <PaginationBox>
        <PaginationBtn ref={paginationRef} more={more} onClick={handlePagination}>더보기</PaginationBtn>
      </PaginationBox>


      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <PostDetailHeader />
        </Modal.Header>

        <Modal.Body scrollable="true">
          <PostDetailBody />
        </Modal.Body>

      </Modal>  
    </Main>
  )
}

export default PostMain;
