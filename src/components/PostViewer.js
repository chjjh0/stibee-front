import React, { useEffect, useState, useRef } from 'react';
// lib
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import { basicAl } from '../lib/alert';
import Axios from 'axios';
// components
import BasicBtn from '../components/BasicBtn';
import { setPost } from '../modules/post';
import { useDispatch, useSelector } from 'react-redux';

const saveBtnStyle = {
  backColor: '#3d6fe2',
  fontSize: '18px',
  fontColor: '#fff',
};

const SubmitBtnArea = styled.div`
  padding: 5% 5%;
  text-align: center;
`;

const PostOriginContainer = styled.div`
  margin: 0 auto;
  padding: 10%;
`;

const PostContArea = styled.div`
  padding: 5% 3%;
  border: 1px solid #f1f1f1;
`;

const TitleArea = styled.div`
  padding-top: 5%;
  border: 1px solid #f1f1f1;
  border-bottom: 0;
  padding: 1% 3%;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const SendMailArea = styled.div`
  padding: 5% 3%;
  border: 1px solid #f1f1f1;
  border-top: 0;
`;

const MailToArea = styled.div`
  display: inline-block;
  width: 10%;
`;

const MailAddrArea = styled.div`
  display: inline-block;
  width: 90%;
`;

const MailAddrInput = styled.input`
  width: 200px;
`;

const SendMailBox = styled.div`
  margin-bottom: 1%;
  height: 30px;
`;

const MailListArea = styled.div``;

const MailList = styled.div`
  display: inline-block;
  border-radius: 40px;
  min-width: 40px;
  padding: 1px 3px;
  text-align: center;
  margin-right: 5px;
  padding: 0.2% 1%;
  font-size: 1rem;

  ${({ validMailAdd }) =>
    validMailAdd
      ? `
          border: 1px solid #bfbfbf;
        `
      : `
          border: 1px solid #d93025;
          background: #d93025;
          color: white;
        `}
`;

function PostViewer({ match, history }) {
  const [sendMailList, setSendMailList] = useState([]);
  const [mailLoading, setMailLoading] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const textAreaRef = useRef('');
  // redux
  const post = useSelector(state => state.post.post);
  const { title, htmlCont } = post;
  const __html = { __html: htmlCont };
  const err = useSelector(state => state.post.error);
  const dispatch = useDispatch();

  const closeBtnStyle = { verticalAlign: 'middle', cursor: 'pointer' };

  const fetchPostbyId = () => {
    dispatch(setPost(match.params.postId));
  };

  const submitMail = async () => {
    const submitData = {
      title: title,
      emailCont: htmlCont,
      mailList: sendMailList.map(mail => mail.mailAdd),
    };

    setMailLoading(true);
    await Axios.post('/api/mail/sendMail', submitData)
      .then(res => {
        basicAl(() => history.push('/'), {
          icon: 'success',
          title: '메일 발송에 성공했습니다.',
        });
        // 아래 로딩 false로 만드는 게 이동후에 변경햇다고 오류나면 return 여기에 박고 실험
      })
      .catch(err => {
        basicAl(null, {
          icon: 'error',
          title: '문제가 발생하여 메일발송에 실패했습니다.',
        });
      });
    setMailLoading(false);
  };

  const handleSendMail = () => {
    if (sendMailList.length === 0) {
      basicAl(null, {
        icon: 'error',
        title: '메일을 보낼 주소를 입력해주세요.',
      });
      return;
    }

    const res = sendMailList.every(mail => mail.validMailAdd === true);

    if (res) {
      submitMail();
    } else {
      basicAl(null, {
        icon: 'error',
        title: '잘못 된 메일주소입니다.',
      });
    }
  };

  const handleMailList = e => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setSendMailList(
        sendMailList.concat({
          validMailAdd: checkMail(e.target.value),
          mailAdd: e.target.value,
        }),
      );
      setInputVal('');
    }
  };

  const handleInputchange = e => {
    setInputVal(e.target.value);
  };

  const checkMail = mailAdd => {
    const mailChecker = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return mailChecker.test(mailAdd);
  };

  const handleRemoveMail = removeIdx => {
    setSendMailList(sendMailList.filter((mail, idx) => idx !== removeIdx));
  };

  useEffect(() => {
    fetchPostbyId();
  }, [match.params.postId]);

  if (err) return <div>에러발생!!!</div>;

  return (
    <PostOriginContainer>
      {post && (
        <>
          <TitleArea>
            <Title>{title}</Title>
          </TitleArea>

          <PostContArea>
            <div dangerouslySetInnerHTML={__html}></div>
          </PostContArea>

          <SendMailArea>
            <SendMailBox>
              <MailToArea>받는사람</MailToArea>

              <MailAddrArea>
                <MailAddrInput
                  onKeyPress={handleMailList}
                  onChange={handleInputchange}
                  ref={textAreaRef}
                  value={inputVal}
                />
              </MailAddrArea>
            </SendMailBox>

            <MailListArea>
              {sendMailList &&
                sendMailList.map((mail, idx) => {
                  return (
                    <MailList validMailAdd={mail.validMailAdd} key={idx}>
                      {mail.mailAdd}
                      <Icon
                        style={closeBtnStyle}
                        fontSize="inherit"
                        onClick={() => handleRemoveMail(idx)}
                      >
                        close
                      </Icon>
                    </MailList>
                  );
                })}
            </MailListArea>
          </SendMailArea>

          <SubmitBtnArea>
            <BasicBtn
              btnName={mailLoading ? '보내는 중...' : '보내기'}
              style={saveBtnStyle}
              func={mailLoading ? null : handleSendMail}
              disabled={mailLoading ? true : null}
            />
          </SubmitBtnArea>
        </>
      )}
    </PostOriginContainer>
  );
}

export default PostViewer;
