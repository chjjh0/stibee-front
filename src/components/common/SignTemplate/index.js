import React from 'react';
import SignArea from './signTemplateStyle';
// lib
import { withRouter, Link } from 'react-router-dom';
// asset
import stibeeText from '../../../asset/img/stibee_text.png';

const SignTemplate = ({
  logoImg,
  logoBoxWidth,
  slogan,
  subSlogan,
  linkContent,
  linkURL,
  children,
}) => {
  return (
    <SignArea>
      <SignArea.Header>
        <SignArea.LogoImgBox width={logoBoxWidth}>
          <Link to="/">
            <SignArea.LogoImg src={logoImg} alt="bee" />
          </Link>
        </SignArea.LogoImgBox>

        <SignArea.Slogan>{slogan}</SignArea.Slogan>
        {subSlogan && <SignArea.SubSlogan>{subSlogan}</SignArea.SubSlogan>}

        <SignArea.LinkBox>
          <Link to={linkURL}>{linkContent}</Link>
        </SignArea.LinkBox>
      </SignArea.Header>

      <SignArea.Inner>
        {children}

        <SignArea.Footer>
          <SignArea.LogoImg width="100px" src={stibeeText} />
        </SignArea.Footer>
      </SignArea.Inner>
    </SignArea>
  );
};

export default withRouter(SignTemplate);
