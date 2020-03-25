import React, { useEffect, useState } from 'react';
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

const CreatedAt = styled.span`
  display: inline-block;
  color: #b4b4b4;

  @media screen and (max-width: 640px) {
    display: block;
    padding: 0;
  }
`;

function PostDetailHeader({ currentPost }) {
  const [date, setDate] = useState('');

  const changeDate = () => {
    // "2020-01-21T18:59:36.774Z"
    setDate(currentPost.updatedAt.split('T')[0]);
  };

  useEffect(() => {
    changeDate();
  }, [currentPost]);

  return (
    <Header>
      <Title>{currentPost.title}</Title>
      <CreatedAt>{date}</CreatedAt>
    </Header>
  );
}

export default PostDetailHeader;
