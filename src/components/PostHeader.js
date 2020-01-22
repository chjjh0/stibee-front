import React from 'react';
import styled from 'styled-components';
import logo from 'asset/img/stibee_text.png';
import bee from 'asset/img/bee.png';
// router
import { Link } from 'react-router-dom';

const Header = styled.header`
  background: #fafafa;
  position: fixed;
  width: 100%;
  padding: 0 120px;
  z-index: 100;
  box-shadow: ${props => props.scrollVal ? '0 2px 4px 0 rgba(0,0,0,0.1)' : '0'};
`;

const HeaderInner = styled.div`
  max-width: 1000px;
  margin-right: 0;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const HeaderLogo = styled.h1`
  line-height: 1.6;
  border: 0;
  margin: 0;
  padding: 0;
`;

const HomeLink = styled.a`
  display: block;
  float: left;
  padding: 15px 0;
  text-decoration: none;
  border: 0;
  margin: 0;
`;

const LogoImg = styled.img`
  display: block;
  width: 100px;
  height: 30px;
`;

const ImgBox = styled.div`
  float: right;
`;

const WriteImg = styled.img`
  vertical-align: unset;
  width: 16px;
  height: 30px;
`;

function PostHeader({ scrollVal }) {
  return (
      <Header scrollVal={scrollVal} >
        <HeaderInner className='header-inner'>
          <HeaderLogo>
            <HomeLink 
              href='/'
              rel='home'
            >
              <LogoImg src={logo} alt='스티비' />
            </HomeLink>
            <ImgBox>
              <Link to="/write">
                <WriteImg src={bee} alt='포스트 작성' />
              </Link>
            </ImgBox>
          </HeaderLogo>
        </HeaderInner>
      </Header>
  )
}

export default PostHeader;