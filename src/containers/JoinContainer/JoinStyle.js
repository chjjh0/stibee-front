import styled from 'styled-components';

const JoinArea = styled.div`
  margin: 50px auto 0;
  width: ${({ width }) => width || '100%'};
  padding: ${({ padding }) => padding || 'none'};
`;

JoinArea.Info = styled.div`
  font-size: 14px;
  color: #414245;
  margin-bottom: 0.5rem;
`;

JoinArea.FieldsetLogin = styled.div`
  width: 380px;
  position: relative;
  margin: 0 auto;
  text-align: left;
`;

JoinArea.InputBox = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

JoinArea.LabelBasic = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

JoinArea.InputBasic = styled.input`
  width: 100%;
  border: solid 1px #bcbdc1;
  border-radius: 4px;
  font-size: 16px;
  padding-bottom: 25px;
  padding: 13px 15px;
`;

JoinArea.ErrorMsgArea = styled.p`
  color: #f95a1f;
  font-size: 12px;
  margin: 0;
  height: 1rem;
`;

JoinArea.SubmitBtn = styled.button`
  width: 100%;
  font-size: 18px;
  padding: 15px 0;
  background: #ff6464;
  border-radius: 4px;
  color: #fff;
  border: 0;
  transition: all 0.3s;

  &:hover {
    background: #ff5252;
  }
`;

JoinArea.Footer = styled.footer`
  padding: 50px 0;
  width: 100%;
  text-align: center;
`;

export default JoinArea;
