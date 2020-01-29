import React, { useEffect, useState, useRef, useReducer } from 'react';
// plugin
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

// components
import BasicBtn from 'components/BasicBtn';


const saveBtnStyle = {
  backColor: '#3d6fe2',
  fontSize: '18px',
  fontColor: '#fff'
}

const BtnArea = styled.div`
  padding: 5% 5%;
  text-align: center;
`;

const PostOriginContainer = styled.div`
  margin: 0 auto;
  padding: 10%;
`;

const PostContArea = styled.div`
  padding: 5% 1%;
  border: 1px solid #f1f1f1;
`

const TitleArea = styled.div`
  padding-top: 5%;
`;

const TitleInput = styled.input`
  border: 1px solid #f1f1f1;
  border-bottom: 0;
  margin: 0 auto;
  width: 100%;
  font-size: 2rem;
  padding: 1%;
`;

const SendMailArea = styled.div`
  padding: 5%;
  border: 1px solid #f1f1f1;
  border-top: 0;
`;

const SendMailInput = styled.div`
  margin-bottom: 10px;
  height: 30px;

  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

function PostOrigin({ match }) {
  const [htmlCont, setHtmlCont] = useState({ __html: '' });
  const [title, setTitle] = useState('');
  const [sendMailList, setSendMailList] = useState([]);

  const [textAreaVal, setTextAreaVal] = useState('');
  const textAreaRef = useRef('')

  const fetchPostbyId = () => {
    Axios.post(`/api/post/postOrigin/${match.params.postId}`)
      .then(res => {
        console.log('성공', res);
        if (res.data.post.htmlCont.length !== 0) {
          setHtmlCont({
            __html: res.data.post.htmlCont
          });
        }
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  const handleInput = e => {
    setTitle(e.target.value);
  }

  const handleResize = e => {

    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      setSendMailList(sendMailList.concat({
        validMailAdd: checkMail(e.target.value),
        mailAdd: e.target.value
      }));
      // textAreaRef.current.value = ''
      setTextAreaVal('');
    }
    
    // e.target.style.height = "1px";
    // e.target.style.height = (15 + e.target.scrollHeight) + "px";
  }

  const validMaillist = () => {
    return new Promise((resolve, reject) => {
      const res = sendMailList.every(mail => mail.validMailAdd === true);
      resolve(res);
    })
  }

  const handleSendMail = () => {
    if (sendMailList.length === 0) {
      alert('메일을 보낼 주소를 입력해주세요.')
      return;
    };
    // console.log('sendMail', sendMailList.length);

    validMaillist().then(res => {
      if (res) {
        let mailList = [];
        
        sendMailList.map(mail => {
          mailList.push(mail.mailAdd)
        })

        const submitData = {
          title,
          emailCont: htmlCont.__html,
          mailList
        }

        console.log('submitData', submitData);

        Axios.post('/api/mail/sendMail', submitData)
          .then(res => {
            console.log('res', res);
          })
      } else {
        alert('잘못 입력된 이메일 주소가 있습니다. 빨간색 표시된 주소를 수정하거나 삭제하고 메일을 다시 보내주세요.')
      }
    })
    .catch(err => {
      console.log('err', err);
    })
  }


  const handleTAchange = e => {
    // console.log(e.target.value);
    setTextAreaVal(e.target.value);
  }

  const checkMail = (mailAdd) => {
    const mailChecker = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return mailChecker.test(mailAdd);
  }

  const handleRemoveMail = (removeIdx) => {
    setSendMailList(sendMailList.filter((mail, idx) => idx !== removeIdx))
  }

  useEffect(() => {
    fetchPostbyId();
  }, [match.params.postId]);

  useEffect(() => {
    console.log('렌더링');
  })
  return (
    <PostOriginContainer>
      <TitleArea>
        <TitleInput
          placeholder="이메일 제목을 입력해주세요"
          onChange={handleInput}
          value={title}
        >
        </TitleInput>
      </TitleArea>

      <PostContArea>
        <div dangerouslySetInnerHTML={htmlCont}></div>
      </PostContArea>

      <SendMailArea>
        <SendMailInput>
          <div 
            style={{
              float: 'left',
              width: '10%'
          }}
          >받는사람</div>

          <input 
            onKeyDown={handleResize}
            style={{ 
              overflowY: 'hidden', 
              padding: '10px', 
              width: '90%',
              float: 'right',
              height: '100%'
            }} 
            onChange={handleTAchange}
            ref={textAreaRef}
            value={textAreaVal}
          ></input>
        </SendMailInput>
        <div>
          {
            sendMailList &&
            sendMailList.map((mail, idx) => {
              if (mail.validMailAdd) {
                return (
                  <>
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'inline-block', 
                      border: '1px solid black',
                      borderRadius: '5px'
                    }}
                  >
                  {mail.mailAdd}
                  <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveMail(idx)} />
                  </div>
                  </>
                )
              } else {
                return (
                  <>
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'inline-block',
                      border: '1px solid #d93025',
                      background: '#d93025',
                      borderRadius: '40px',
                      minWidth: '40px',
                      padding: '1px 3px',
                      color: 'white',
                      textAlign: 'center',
                      marginRight: '5px'
                    }}
                  >{mail.mailAdd}
                  <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveMail(idx)} />
                  </div>
                  </>
                )
              }
            })
          }
        </div>
      </SendMailArea>

      <BtnArea>
        <BasicBtn 
          btnName='보내기'
          style={saveBtnStyle}
          func={handleSendMail}
        />
      </BtnArea>


      
    </PostOriginContainer>
  )
}

export default PostOrigin;