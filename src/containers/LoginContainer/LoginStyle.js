import styled from 'styled-components';

const LoginArea = styled.div`
  margin: 50px auto 0;
  width: ${({ width }) => width || '100%'};
  padding: ${({ padding }) => padding || 'none'};
`;

LoginArea.FieldsetLogin = styled.fieldset`
  width: 320px;
  position: relative;
  margin: 0 auto;
  text-align: left;
`;

LoginArea.LabelBasic = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  padding: 0 0 10px 0;
  margin: 0;
  cursor: pointer;
`;

LoginArea.InputBox = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

LoginArea.InputBasic = styled.input`
  width: 100%;
  border: solid 1px #bcbdc1;
  border-radius: 4px;
  font-size: 16px;
  padding-bottom: 25px;
  padding: 13px 15px;
`;

LoginArea.ErrorMsgArea = styled.p`
  color: #f95a1f;
  font-size: 12px;
  height: 1rem;
`;

LoginArea.LoginBtn = styled.button`
  width: 100%;
  font-size: 18px;
  padding: 15px 0;
  background: #3e81f6;
  color: #fff;
  border: 0;
  transition: all 0.3s;

  &:hover {
    background: #245cbd;
  }
`;

LoginArea.Footer = styled.footer`
  padding: 50px 0;
  width: 100%;
  text-align: center;
`;

export default LoginArea;
