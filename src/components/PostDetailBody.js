import React from 'react';
// lib
import Swal from 'sweetalert2';
import { basicAl, confirmAl } from '../lib/alert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// img
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { deletePost } from '../modules/posts';

const Side = styled.div`
  float: right;
  width: 38.04%;
  padding: 0 3.26% 0 0;

  .box {
    border-top: 1px solid #e6e6eb;
    padding: 20px 0;
  }

  ul,
  li {
    list-style: none;
  }

  ul {
    padding-left: 0;
  }

  li {
    display: inline-block;
  }

  .view a {
    display: block;
    font-size: 16px;
    color: #3e81f6;
    font-weight: bold;
    line-height: 2;
  }

  @media screen and (max-width: 640px) {
    float: none;
    width: 89.14%;
    margin: 0 auto;
    padding: 0 0 10px 0;
  }
`;

const TagBtn = styled.button`
  display: inline-block;
  font-size: 12px;
  padding: 7px 12px;
  border: 1px solid #dcdce1;
  border-radius: 50em;
  margin: 0 3px 0 0;
  text-decoration: none;
`;

const Colors = styled.button`
  background: ${props => props.color};
  border: solid 1px #dcdce1;
  border-radius: 50em;
  display: inline-block;
  margin-right: 0.5rem;
  width: 25px;
  height: 25px;
  cursor: auto;
`;

const Heading = styled.h1`
  font-size: 14px;
  padding: 0 0 20px 0;
`;

const Content = styled.div`
  float: left;
  width: 55%;

  img {
    width: 100%;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;

function PostDetailBody({ currentPost, handleClose }) {
  const dispatch = useDispatch();

  const postDelete = () => {
    Axios.delete(`/api/post/delete/${currentPost._id}`)
      .then(res => {
        if (res) {
          Swal.fire({
            title: '포스터를 삭제했습니다.',
            allowOutsideClick: false,
          }).then(({ value }) => {
            if (value) {
              dispatch(deletePost(currentPost._id));
              handleClose();
            }
          });
        }
      })
      .catch(err => {
        basicAl(null, {
          icon: 'error',
          title: '오류가 발생하여 삭제에 실패했습니다.',
        });
      });
  };
  const handleDelete = () => {
    confirmAl(postDelete);
  };

  return (
    <>
      <Side>
        <div className="tags">
          <Heading>Tags</Heading>
          <ul>
            {currentPost.tags.map((tag, idx) => (
              <li key={idx}>
                <TagBtn>{tag}</TagBtn>
              </li>
            ))}
          </ul>
        </div>

        <div className="colors box">
          <Heading>Colors</Heading>
          <ul>
            <li>
              {currentPost.colors.length !== 0 &&
                currentPost.colors.map((color, idx) => (
                  <Colors key={idx} color={color} />
                ))}
            </li>
          </ul>
        </div>

        <div className="view box">
          <Link to={`/post/viewer/${currentPost._id}`} target="_blank">
            이메일 원본 보기
          </Link>
          <Link to={`/post/update/${currentPost._id}`} target="_blank">
            수정하기
          </Link>
          <span
            style={{
              color: '#3e81f6',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: '2',
              cursor: 'pointer',
            }}
            onClick={handleDelete}
          >
            삭제하기
          </span>
        </div>
      </Side>

      <Content>
        <img src={currentPost.screenshot} alt="스크린샷"></img>
      </Content>
    </>
  );
}

export default PostDetailBody;
