import React, { useEffect } from 'react';
import LoginArea from './LoginStyle';
// lib
import { withRouter } from 'react-router-dom';
import useInputs from '../../customHook/useInputs';
import { basicAl } from '../../lib/alert';
import useValid from '../../customHook/useValid';
// asset
import logoImg from '../../asset/img/login_bee_basic.png';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../modules/user';
// components
import SignTemplate from '../../components/common/SignTemplate';

const LoginContainer = ({ history }) => {
  const [{ email, password }, onChange] = useInputs({
    email: '',
    password: '',
  });
  const { emailErrMsg, passwordErrMsg, signValid, checkAll } = useValid();

  const user = useSelector(({ user }) => user.user);
  const err = useSelector(({ user }) => user.err);
  const dispatch = useDispatch();

  const handleValid = e => {
    const type = e.target.name;
    signValid({
      type,
      email,
      password,
      errMsg: '비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상입니다.',
    });
  };

  const preSubmit = e => {
    e.preventDefault();

    if (checkAll({ email, password })) {
      handleSubmit();
    } else {
      basicAl(null, {
        icon: 'error',
        title: '입력값을 확인해주세요.',
      });
    }
  };

  const handleSubmit = () => {
    const submitData = { email, password };

    dispatch(login(submitData));
  };

  useEffect(() => {
    if (err) {
      const { errMsg } = err.data;

      if (errMsg === 'jwt expired') {
        basicAl(null, {
          icon: 'error',
          title: '토큰이 만료되어 재로그인이 필요합니다.',
        });
      } else if (errMsg === 'Wrong password') {
        basicAl(null, {
          icon: 'error',
          title: '비밀번호가 틀렸습니다.',
        });
      } else if (errMsg === 'Auth failed, email not found') {
        basicAl(null, {
          icon: 'error',
          title: '사용자가 존재하지 않습니다.',
        });
      }
    }
  }, [user, err]);

  if (user) {
    history.push('/list');
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.log('localstorage is not working');
    }
    return null;
  }

  const propsArr = {
    logoImg,
    logoBoxWidth: '140px',
    slogan: '다시 만나서 반가워요!',
    linkContent: '처음이신가요? 가입하기',
    linkURL: '/join',
  };

  return (
    <SignTemplate {...propsArr}>
      <form>
        <LoginArea.FieldsetLogin>
          <LoginArea.InputBox>
            <LoginArea.LabelBasic htmlFor="email">
              이메일 주소
            </LoginArea.LabelBasic>

            <LoginArea.InputBasic
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              onBlur={handleValid}
            />
            <LoginArea.ErrorMsgArea>{emailErrMsg}</LoginArea.ErrorMsgArea>
          </LoginArea.InputBox>

          <LoginArea.InputBox>
            <LoginArea.LabelBasic htmlFor="password">
              비밀번호
            </LoginArea.LabelBasic>
            <LoginArea.InputBasic
              type="password"
              id="password"
              name="password"
              onChange={onChange}
              onBlur={handleValid}
            />
            <LoginArea.ErrorMsgArea>{passwordErrMsg}</LoginArea.ErrorMsgArea>
          </LoginArea.InputBox>

          <LoginArea.LoginBtn type="submit" onClick={preSubmit}>
            로그인
          </LoginArea.LoginBtn>
        </LoginArea.FieldsetLogin>
      </form>
    </SignTemplate>
  );
};

export default withRouter(LoginContainer);
