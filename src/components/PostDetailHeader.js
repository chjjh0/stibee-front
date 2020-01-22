import React from 'react';
import styled from 'styled-components';


const Header = styled.header`
  padding: 40px 5.43%;

  @media screen and (max-width: 640px) {
    padding: 30px 5.43%;
    
  }
`;

const Title = styled.h1`
  font-size: 20px;
  padding: 0 0 10px 0;
  line-height: 1.6;
`;

const SubTitle = styled.h2`
  font-size: 14px;
  display: inline-block;

  @media screen and (max-width: 640px) {
    display: block;
    padding: 0;
  }
`;

const CreatedAt = styled.span`
  display: inline-block;
  padding: 0 0 0 10px;
  color: #b4b4b4;

  @media screen and (max-width: 640px) {
    display: block;
    padding: 0;
  }
`;

function PostDetailHeader() {
  return (
      <Header>
        <Title>스티비 스요레터</Title>
        <SubTitle>구독자님, 우리 이제 매주 만나요!</SubTitle>
        <CreatedAt>2019.11.4</CreatedAt>
      </Header>
  )
}

export default PostDetailHeader;
