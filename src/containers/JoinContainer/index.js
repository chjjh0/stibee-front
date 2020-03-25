import React, { useEffect } from 'react';
// style
import JoinArea from './JoinStyle';
// asset
import logoImg from '../../asset/img/join_bee.png';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { join, initJoinSuccess } from '../../modules/user';
// lib
import { withRouter } from 'react-router-dom';
import useInputs from '../../customHook/useInputs';
import useValid from '../../customHook/useValid';
import { basicAl } from '../../lib/alert';
// components
import SignTemplate from '../../components/common/SignTemplate';

function JoinContainer({ history }) {
  const [{ email, name, password }, onChange] = useInputs({
    email: '',
    name: '',
    password: '',
  });
  const {
    emailErrMsg,
    nameErrMsg,
    passwordErrMsg,
    signValid,
    checkAll,
  } = useValid();
  // redux
  const dispatch = useDispatch();
  // const { err, joinSuccess } = useSelector(({ user }) => ({
  //   ...user,
  // }));
  const err = useSelector(({ user }) => user.err);
  const joinSuccess = useSelector(({ user }) => user.joinSuccess);

  const handleValid = e => {
    const type = e.target.name;
    signValid({ type, email, name, password });
  };

  const preSubmit = e => {
    e.preventDefault();

    if (checkAll({ email, name, password })) {
      handleSubmit();
    } else {
      basicAl(null, {
        icon: 'error',
        title: '입력값을 확인해주세요.',
      });
    }
  };

  const handleSubmit = () => {
    const submitData = {
      email,
      name,
      password,
    };
    dispatch(join(submitData));
  };

  useEffect(() => {
    if (err) {
      const { errMsg } = err.data;

      if (errMsg === 'already exist') {
        basicAl(null, {
          icon: 'error',
          title: '이미 존재하는 이메일입니다.',
          stopKeydownPropagation: false,
        });
      } else {
        basicAl(null, {
          icon: 'error',
          title: '서버에 문제가 생겨 회원가입에 실패했습니다.',
        });
      }
    }
  }, [err]);

  useEffect(() => {
    if (joinSuccess) {
      basicAl(
        () => {
          history.push('/');
          dispatch(initJoinSuccess());
        },
        {
          icon: 'success',
          title: '회원가입에 성공했습니다.',
        },
      );
    }
  }, [joinSuccess, dispatch, history]);

  const propsArr = {
    logoImg,
    logoBoxWidth: '140px',
    slogan: '환영합니다!',
    subSlogan: '쉽고 빠르게 이메일을 만들고 발송하세요. 모두 무료입니다.',
    linkContent: '이미 가입하셨나요? 로그인하기',
    linkURL: '/',
  };

  return (
    <SignTemplate {...propsArr}>
      <form>
        <JoinArea.FieldsetLogin>
          <JoinArea.InputBox>
            <JoinArea.LabelBasic htmlFor="email">
              이메일 주소
            </JoinArea.LabelBasic>
            <JoinArea.Info>
              로그인 할 때 사용할 업무용 개인 이메일 주소를 입력하세요.
            </JoinArea.Info>
            <JoinArea.InputBasic
              type="email"
              id="email"
              name="email"
              placeholder="ex) sample@sample.com"
              onChange={onChange}
              onBlur={handleValid}
            />
            <JoinArea.ErrorMsgArea>{emailErrMsg}</JoinArea.ErrorMsgArea>
          </JoinArea.InputBox>

          <JoinArea.InputBox>
            <JoinArea.LabelBasic htmlFor="text">이름</JoinArea.LabelBasic>
            <JoinArea.Info>
              이름은 한글 또는 영문, 20글자 미만입니다.
            </JoinArea.Info>
            <JoinArea.InputBasic
              type="text"
              id="text"
              name="name"
              placeholder="ex) 최정훈 or choijunghun"
              onChange={onChange}
              onBlur={handleValid}
            />
            <JoinArea.ErrorMsgArea>{nameErrMsg}</JoinArea.ErrorMsgArea>
          </JoinArea.InputBox>

          <JoinArea.InputBox>
            <JoinArea.LabelBasic htmlFor="password">
              비밀번호
            </JoinArea.LabelBasic>
            <JoinArea.Info>
              비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상입니다.
            </JoinArea.Info>
            <JoinArea.InputBasic
              type="password"
              id="password"
              name="password"
              onChange={onChange}
              onBlur={handleValid}
            />
            <JoinArea.ErrorMsgArea>{passwordErrMsg}</JoinArea.ErrorMsgArea>
          </JoinArea.InputBox>

          <JoinArea.SubmitBtn type="submit" onClick={preSubmit}>
            가입하기
          </JoinArea.SubmitBtn>
        </JoinArea.FieldsetLogin>
      </form>
    </SignTemplate>
  );
}

export default withRouter(JoinContainer);
