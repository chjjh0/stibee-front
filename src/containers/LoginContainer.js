import React, { useState } from 'react'
import styled from 'styled-components';
import beeBasic from 'asset/img/login_bee_basic.png';
import stibeeText from 'asset/img/stibee_text.png';


const BasicDiv = styled.div.attrs({
  className: props => props.cls
})`
  margin: 50px auto 0;
  width: ${props => props.width || '100%'};
  padding: ${props => props.padding || 'none'};
`;

const LoginHeader = styled.div`
  width: 80px;
  margin: 0 auto;
`;

const BasicImg = styled.img`
  width: ${props => props.width || '100%'};
`;

const FieldsetLogin = styled.fieldset`
  width: 320px;
  position: relative;
  margin: 0 auto;
  text-align: left;
`;

const LabelBasic = styled.label`
  display: block;
  font-size: 16px;
  padding: 0 0 10px 0;
`;

const InputBasic = styled.input`
  width: 100%;
  font-size: 16px;
  padding-bottom: 25px;
  padding: 13px 15px;
`;

const ErrorMsgArea = styled.p`
  color: #f95a1f;
  font-size: 12px;
`;

const LoginBtn = styled.button`
  width: 100%;
  font-size: 18px;
  padding: 15px 0;
  background: #3e81f6;
  color: #fff;
  border: 0;
  transition: all .3s;

  &:hover {
    background: #245cbd;
  }
`;

const Footer = styled.footer`
  padding: 50px 0;
  width: 100%;
`;


const LoginContainer = () => {
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [errorMsg, setErrorMsg] = useState({ userId: '', password: '' });

  const handleChangeInput = (e) => {
    console.log('chagne',e.target.name, e.target.value)
    const { name, value } = e.target;

    setFormData({
      [name]: value
    });
  }

  const handleValid = (e) => {
    const { name } = e.target;
    const { userId, password } = formData;

    switch(name) {
      case 'userId':
        console.log('valid::: ', /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userId))
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userId)) {
          setErrorMsg({
            ...errorMsg,
            [name]: ''
          })
        } else {
          setErrorMsg({
            ...errorMsg,
            [name]: '이메일 형식을 지켜주세요'
          })
        }
        break;
      case 'password':
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{8,20}$/.test(password.trim())) {
          setErrorMsg({
            ...errorMsg,
            [name]: ''
          })
        } else if (password.trim() === "") {
          setErrorMsg({
            ...errorMsg,
            [name]: '비밀번호를 입력해주세요'
          })
        } else {
          setErrorMsg({
            ...errorMsg,
            [name]: '8자리 이상 입력하세요'
          })
        }
        break;
      default: break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  }

  return (
    <BasicDiv cls="login">
      <LoginHeader>
        <a href="/">
          <BasicImg src={beeBasic} />
        </a>
      </LoginHeader>

      <BasicDiv cls="login-inner">
        <form>
          <FieldsetLogin>
            <LabelBasic htmlFor="userId">이메일 주소</LabelBasic>
            <InputBasic 
              type="email" 
              id="userId"
              name="userId" 
              onChange={handleChangeInput} 
              onBlur={handleValid} 
            />
            <ErrorMsgArea>{errorMsg.userId}</ErrorMsgArea>

            <LabelBasic htmlFor="password">비밀번호</LabelBasic>
            <InputBasic 
              type="password" 
              id="password" 
              name="password"
              onChange={handleChangeInput}
              onBlur={handleValid} 
            />
            <ErrorMsgArea>{errorMsg.password}</ErrorMsgArea>

            <LoginBtn type="submit" onClick={handleSubmit}>로그인</LoginBtn>
          </FieldsetLogin>          
        </form>

        <Footer>
          <BasicImg width="100px" src={stibeeText} />
        </Footer>
      </BasicDiv>
    </BasicDiv>
  )
}

export default LoginContainer;