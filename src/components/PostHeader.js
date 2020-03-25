import React, { useState } from 'react';
// lib
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// asset
import logo from 'asset/img/stibee_text.png';
import bee from 'asset/img/bee.png';
// router
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../modules/user';

const Header = styled.header`
  background: #fafafa;
  position: fixed;
  width: 100%;
  padding: 0 120px;
  z-index: 100;
  box-shadow: ${props =>
    props.scrollVal ? '0 2px 4px 0 rgba(0,0,0,0.1)' : '0'};
`;

const HeaderInner = styled.div`
  /* max-width: 1000px; */
  width: 100%;
  margin-right: 0;

  &:after {
    content: '';
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

const BtnBox = styled.div`
  float: right;
`;

const WriteImg = styled.img`
  vertical-align: unset;
  width: 16px;
  height: 30px;
`;

const UserBtnBox = styled.div`
  margin-left: 2rem;
  display: inline-block;
`;

const userBtnStyle = {
  fontSize: '2rem',
  color: '#4a4749',
  cursor: 'pointer',
};

function PostHeader({ scrollVal, history }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // redux
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleUserBtn = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const handleUserBtnClose = () => {
    setAnchorEl(null);
  };

  return (
    <Header scrollVal={scrollVal}>
      <HeaderInner className="header-inner">
        <HeaderLogo>
          <HomeLink href="/" rel="home">
            <LogoImg src={logo} alt="스티비" />
          </HomeLink>

          <BtnBox>
            <Link to="/post/write">
              <WriteImg src={bee} alt="포스트 작성" />
            </Link>
            {user && (
              <UserBtnBox>
                <Icon
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleUserBtn}
                  style={userBtnStyle}
                >
                  account_circle
                </Icon>

                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleUserBtnClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </UserBtnBox>
            )}
          </BtnBox>
        </HeaderLogo>
      </HeaderInner>
    </Header>
  );
}

export default PostHeader;
