import { useState } from 'react';

function useValid() {
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  const initErrMsg = type => {
    switch (type) {
      case 'email':
        setEmailErrMsg('');
        break;
      case 'name':
        setNameErrMsg('');
        break;
      case 'password':
        setPasswordErrMsg('');
        break;
      default:
        break;
    }
  };

  const handleErrMsg = (type, msg) => {
    switch (type) {
      case 'email':
        setEmailErrMsg(msg);
        break;
      case 'name':
        setNameErrMsg(msg);
        break;
      case 'password':
        setPasswordErrMsg(msg);
        break;
      default:
        break;
    }
  };

  const checkEmail = (type = 'email', email) => {
    let valid = false;

    if (!email) {
      handleErrMsg(type, '이메일을 입력해주세요.');
    } else if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.trim())) {
      initErrMsg(type);
      valid = true;
    } else {
      handleErrMsg(type, '이메일 형식을 지켜주세요.');
    }

    return valid;
  };

  const checkName = (type = 'name', name) => {
    let valid = false;

    if (!name) {
      handleErrMsg(type, '이름을 입력해주세요.');
    } else if (/^[가-힣a-zA-Z]{1,20}$/.test(name.trim())) {
      initErrMsg(type);
      valid = true;
    } else {
      handleErrMsg(type, '이름은 한글 또는 영문, 20글자 미만입니다.');
    }
    return valid;
  };

  const checkPassword = (
    type = 'password',
    password,
    errMsg = '비밀번호는 8-20 자리입니다.',
  ) => {
    let valid = false;

    if (!password) {
      handleErrMsg(type, '비밀번호를 입력해주세요.');
    } else if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(
        password.trim(),
      )
    ) {
      initErrMsg(type);
      valid = true;
    } else {
      handleErrMsg(type, errMsg);
    }
    return valid;
  };

  const checkAll = ({ email, name, password }) => {
    return [
      checkEmail('email', email),
      name || name === '' ? checkName('name', name) : true,
      checkPassword('password', password),
    ].every(res => res);
  };

  const signValid = ({ type, email, name, password, errMsg }) => {
    switch (type) {
      case 'email':
        checkEmail(type, email);
        break;
      case 'name':
        checkName(type, name);
        break;
      case 'password':
        checkPassword(type, password, errMsg);
        break;
      case 'all':
        checkAll({ email, name, password });
        break;
      default:
        break;
    }
  };

  return { emailErrMsg, nameErrMsg, passwordErrMsg, signValid, checkAll };
}

export default useValid;
