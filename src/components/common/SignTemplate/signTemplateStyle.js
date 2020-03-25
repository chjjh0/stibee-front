import styled from 'styled-components';

const SignArea = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width || '100%'};
  padding: ${({ padding }) => padding || 'none'};

  @media screen and (max-height: 1000px) {
    position: relative;
    top: 0;
    margin-top: 50px;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
`;

SignArea.Header = styled.div`
  text-align: center;
`;

SignArea.Slogan = styled.h1`
  font-size: 24px;
  padding: 30px 0 0 0;
  font-weight: 600;
  line-height: 1.5;
`;

SignArea.SubSlogan = styled.h2`
  font-size: 16px;
  padding: 0;
  font-weight: 400;
  color: #414245;
  width: 300px;
  margin: 0.5rem auto;
`;

SignArea.LogoImgBox = styled.div`
  width: ${({ width }) => width || '100%'};
  margin: 0 auto;
`;

SignArea.LogoImg = styled.img`
  width: ${({ width }) => width || '100%'};
  margin: 0 auto;
`;

SignArea.LinkBox = styled.div`
  padding-bottom: 40px;
  color: #3e81f6;
  font-size: 14px;
`;

SignArea.Inner = styled.div``;

SignArea.Footer = styled.footer`
  padding: 50px 0;
  width: 100%;
  text-align: center;
`;

export default SignArea;
