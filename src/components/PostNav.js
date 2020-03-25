import React from 'react';
import styled from 'styled-components';
import PostListTagContainer from '../containers/PostListTagContainer';

const Post = styled.div`
  width: 100%;
  padding-top: 64px;
`;

const SiteSlogan = styled.h1`
  line-height: 1.6;
  text-align: center;
  padding: 70px 0;

  p {
    font-size: 35px;
    font-weight: normal;
    margin: 0;
  }

  br {
    display: none;
  }

  @media screen and (max-width: 640px) {
    padding: 50px 0;
    font-size: 21px;

    br {
      display: inline;
    }
  }
`;

const Gnb = styled.nav`
  padding-bottom: 70px;
  text-align: center;

  @media screen and (max-width: 640px) {
    padding-bottom: 50px;
  }
`;

function PostNav() {
  return (
    <Post>
      <SiteSlogan>
        <p>
          스티비로 만든 <br />
          다양한 이메일을 확인해보세요.
        </p>
        <p>누구나 더 좋은 이메일을 만들 수 있습니다.</p>
      </SiteSlogan>

      <Gnb>
        <PostListTagContainer />
      </Gnb>
    </Post>
  );
}

export default PostNav;
