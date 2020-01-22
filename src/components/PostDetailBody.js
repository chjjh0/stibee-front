import React from 'react';
import styled from 'styled-components';
// img
import stibeeLetter from 'asset/img/post/stibeeLetter_detail.png';

const Side = styled.div`
  float: right;
  width: 38.04%;
  padding: 0 3.26% 0 0;

  .box {
    border-top: 1px solid #e6e6eb;
    padding: 20px 0;
  }

  ul, li {
    list-style: none;
  }

  ul {
    padding-left: 0;
  }

  li {
    display: inline-block;
  }

  li a {
    display: inline-block;
    font-size: 12px;
    padding: 7px 12px;
    border: 1px solid #dcdce1;
    border-radius: 50em;
    margin: 0 3px 0 0;
    text-decoration: none;
  }

  .colors a {
    background: #ff671f;
    border: solid 1px #dcdce1;
    border-radius: 50em;
    display: block;
    width: 25px;
    height: 25px;
    cursor: auto;
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

const Heading = styled.h1`
  font-size: 14px;
  padding: 0 0 20px 0;
`;

const Colors = styled.div`

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



function PostDetailBody() {
  return (
    <>
      <Side>
        <div className="tags">
          <Heading>Tags</Heading>
          <ul>
            <li>
              <a href="#">미디어</a>
            </li>
            <li>
              <a href="#">미디어</a>
            </li>
            <li>
              <a href="#">미디어</a>
            </li>
            <li>
              <a href="#">미디어</a>
            </li>
          </ul>
        </div>

        <div className="colors box">
          <Heading>Colors</Heading>
          <ul>
            <li><a title="dd"></a></li>
          </ul>
        </div>

        <div className="view box">
          <a target="_blank" href="/preview?id=319">이메일 원본 보기</a>
          <a target="_blank" href="https://page.stibee.com/subscriptions/3">구독하기</a>
        </div>
      </Side> 

      <Content>
        <img src={stibeeLetter} alt="스요레터"></img>
      </Content>
    </>
  )
}

export default PostDetailBody;
