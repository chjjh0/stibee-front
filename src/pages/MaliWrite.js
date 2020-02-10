import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import html2canvase from 'html2canvas';

// markdown
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
// color-picker
import TagContainer from 'containers/TagContainer';
import ColorPicContainer from 'containers/ColorPicContainer';
import BasicBtn from 'components/BasicBtn';
import Axios from 'axios';

// styled
const PreviewImg = styled.img`
  width: 100%;
`;

const WriteArea = styled.div`
  width: 100%;
  height: 100vh;
  padding: 5% 5%;
`;

const OptionArea = styled.div`
  width: 100%;
  padding: 5% 2%;
  border: 1px solid #dfdfdf;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const BtnArea = styled.div`
  padding: 5% 5%;
  text-align: center;
`;

const saveBtnStyle = {
  backColor: '#3d6fe2',
  fontSize: '18px',
  fontColor: '#fff'
}

const previewBtnStyle = {
  backColor: '#fff',
  fontSize: '18px',
  fontColor: '#3d6fe2'
}

const TitleArea = styled.div`
  padding-top: 5%;
`;

const TitleInput = styled.input`
  border: 1px solid #dfdfdf;
  margin: 0 auto;
  width: 100%;
  font-size: 2rem;
  padding: 1%;
`;

function MailWrite({ update, match }) {
  // submit data
  const [title, setTitle] = useState('');
  const [cont, setCont] = useState({ mdCont: "", htmlCont: "" });
  // post screenshot
  const [previewImg, setPreviewImg] = useState('');
  let canvasImg = useRef('');
  // tag
  const [tags, setTags] = useState([]);
  // color
  const [colors, setColors] = useState([]);
  let colorUID = useRef(1);
  let mdEditorRef = useRef('');
  // markdown editor
  const [mdParser, setmdParser] = useState(() => new MarkdownIt().use(emoji));
  const [imgBlob, setImgBlob] = useState([]);
  
  const [show, setShow] = useState(false);
  
  const { mdCont, htmlCont } = cont;

  const checkForUpdate = () => {
    console.log(match.path);
    return match.path.includes('/post/update')
  }

  useEffect(function() {
    console.log('mailWrite', match.path, checkForUpdate())
    if (checkForUpdate()) {
      console.log('forUpdate');
      fetchPostbyId();
    }
  }, [])

// func
// tag 선택 여부에 따른 UI 활성화 효과
const checkSelectTag = (tagName) => {
  console.log('checkSelectTag', tagName, tags);
  return tags.includes(tagName)
};

// 선택된 tag
const handleSelectTag = (tag) => {
  console.log('mailWrite handleTags', tag);
  if (checkSelectTag(tag)) {
    console.log('선택된 것 또 선택');
    setTags(tags.filter(prevTag => prevTag !== tag))
  } else if (tags.length < 3) {
    console.log('선택 안된 것 선택');
    setTags([
      ...tags,
      tag
    ])
  } else {
    console.log('3개만 등록가능')
  }
}

const handleScreenshot = () => {
  // 내용 여부 체크
  console.log('screenshot toMD check', cont.mdCont);
  return new Promise((resolve, reject) => {
    if (typeof cont.mdCont !== "") {
      const ele = document.querySelector('.html-wrap');

      html2canvase(ele).then(res => {
        // screnshotURL by base64
        canvasImg =  res.toDataURL('image/png');
        setPreviewImg(res.toDataURL('image/png'));
        console.log('html2canvas inside');
        resolve(true)
      }).catch(err => {
        console.log('canvas err', err);
        // 실패 시 alert을 띄울지 시나리오 개선 필요
        reject(false)
      });
    } else {
      alert('미리보기 할 내용이 없습니다.')
      reject(false)
    }
  })
}

const handleEditorChange = ({ html, text }) => {
  console.log('mdChange', text, html);
  setCont({
    mdCont: text.trim(),
    htmlCont: html
  })
}

// base64 > blob 형태로 변경
const convertBase64UrlToBlob = (urlData) => {
  const arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], {type:mime})
}
// blob > base64 형태로 변경
const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        console.log('base64 반환', base64)
        resolve(base64);
    };

    reader.readAsDataURL(blob);
  })
}

const fetchPostbyId = () => {
    Axios.post(`/api/post/postOrigin/${match.params.postId}`)
      .then(res => {
        const { title, mdCont, htmlCont, tags, colors } = res.data.post
        console.log('성공', res);
        if (res.data.post.mdCont.length !== 0) {
          setCont({ mdCont, htmlCont });
          setTitle(title);
          setTags(tags);
          if (colors.length !== 0) {
            setColors(colors)
          }
        }
      })
      .catch(err => {
        console.log('err', err);
        alert('잘못된 접근입니다.')
      })
  }

const handleImageUpload = (file, callback) => {
  return alert('이미지 업로드 불가');
  console.log('image',file, callback)
  const reader = new FileReader()
  reader.onload = () => {      
    console.log('result', reader.result)
    const blobObj = convertBase64UrlToBlob(reader.result);
    const blobURL = window.URL.createObjectURL(blobObj);

    setImgBlob([
      ...imgBlob,
      {
        blobObj,
        blobURL,
        base64URL: reader.result
      }
    ]);

    setTimeout(() => {
      callback(blobURL)
      // callback(reader.result)
    }, 1000)
  }
  console.log('시작')
  reader.readAsDataURL(file)
}

const handleSubmit = () => {
  console.log('submit', mdEditorRef.current.state.html);
  const submitData = {
    title,
    screenshot: canvasImg,
    mdCont,
    htmlCont,
    tags,
    colors
  }
  
  console.log('handleSubmit', submitData);
  Axios.post('/api/post/save', submitData)
    .then(res => {
      console.log('write 완료', res);
    })
    .catch(err => {
      console.log('write err: ', err);
    })
}
// 미리보기용 html2canvas 이용 시 img 태그의 경우 base64 이미지를 스크린샷으로 전환 가능 다른 형식이면 불가능
// 미리보기, 저장 시 필요한 함수
const handleConvertBlobToBase64 = (imgTag) => {
  return new Promise((resolve, reject) => {
    if (imgTag.length > 0) {
      imgBlob.map(blob => {
        const base64URL = convertBlobToBase64(blob.blobObj);
        base64URL.then(res => {
          // console.log('base64', res);
          const blobURL = blob.blobURL;
  
          Array.from(imgTag).map(img => {
            // console.log(img.src, blobURL, img.src === blobURL)
  
            img.src = (blobURL === img.src) ? `data:image/png;base64,${res}` : img.src;
            // console.log('img src 변경 확인', img)
            resolve(true);
          })  
        })
      })
    } else {
      console.log('blobTobase64');
      resolve(true);
    }
  })
}
const submitUpdate = () => {
  const submitData = {
    title,
    screenshot: canvasImg,
    mdCont,
    htmlCont,
    tags,
    colors
  }
  
  console.log('handleupdate', submitData);
  Axios.put(`/api/post/update/${match.params.postId}`, submitData)
    .then(res => {
      if (res.data.success) {
        console.log('update 성공', res);
      } else {
        console.log('update 실패');
      }
    })
}

const handleUpdate = () => {
  console.log('handleupdate');

  // color는 필수가 아닌 옵션
  if (title === "" || mdCont === "" || htmlCont === "" || tags.length === 0) {
    alert('내용을 입력해주세요.')
  } else {
    const imgTag = document.querySelectorAll('.html-wrap img');


    handleConvertBlobToBase64(imgTag)
      .then(handleScreenshot)
      .then(submitUpdate)
  }
}

const handleSave = () => {
  // color는 필수가 아닌 옵션
  if (title === "" || mdCont === "" || htmlCont === "" || tags.length === 0) {
    alert('내용을 입력해주세요.')
  } else {
    const imgTag = document.querySelectorAll('.html-wrap img');

    console.log('img tag', imgTag);

    handleConvertBlobToBase64(imgTag)
      .then(handleScreenshot)
      // .then(handleConvertBlobToBase64(imgTag))
      .then(handleSubmit)
  }
}



const handlePreview = () => {

  if (mdCont !== "") {
    // document.createElement로 생성한 형태가 html2canvas에 적용되지 않아 일단 queryselector로 진행
    const imgTag = document.querySelectorAll('.html-wrap img');
    console.log('preview', imgTag);
    handleConvertBlobToBase64(imgTag)
      .then(handleScreenshot)
      .then(handleShow)
      .catch((res) => { console.log('err', res ); })
  } else {
    alert('미리보기 할 내용이 없습니다.')
  }
  
}

const handleInput = e => {
  console.log('input', e.target.value);
  setTitle(e.target.value);
}

// colorPicker
const handleColorChange = (e) => {
  // 선택 3개로 제한
  const limitColorPic = colors.length;
  if (validDuplicateColor(e.hex)) {
  } else {
    addColor(e.hex);
  }
}

const addColor = (hex) => {
  if (colors.length < 3) {
    setColors([
      ...colors,
      {
        id: colorUID.current++,
        hex
      }
    ])
  } else {
    console.log('3개까지 추가 가능')
  }
}
 
const validDuplicateColor = (currentHex) => {
  let res = false;
  colors.map(colorObj => {
    if (currentHex === colorObj.hex) {
      cancelColorPicker(currentHex);
      // handleColorChange에서 호출 반환값
      res = true;
      // map 해제용
      return false;
    }
  })
  return res;
}

const cancelColorPicker = (currentHex) => {
  setColors(
    colors.filter(({ hex }) => {
      return (hex !== currentHex);
    })
  )
}

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  return (
    <WriteArea>
      <TitleArea>
        <TitleInput
          placeholder="제목을 입력해주세요"
          onChange={handleInput}
          value={title}
        >
        </TitleInput>
      </TitleArea>

      <MdEditor
        style={{ height: '50%' }}
        ref={mdEditorRef}
        value={mdCont}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        onImageUpload={false}
      />  

      <OptionArea>
        <ColorPicContainer 
          handleColorChange={handleColorChange}
          colorPicker={colors}
          cancelColorPicker={cancelColorPicker} />

        <TagContainer
          handleSelectTag={handleSelectTag}
          selectedTags={tags} 
          checkSelectTag={checkSelectTag} />
      </OptionArea>

      <BtnArea>
        {
          checkForUpdate() ? 
          <BasicBtn 
            func={handleUpdate}
            btnName='수정'
            style={saveBtnStyle}
          /> :
          <BasicBtn 
            func={handleSave}
            btnName='저장'
            style={saveBtnStyle}
          />
        }

        <BasicBtn 
          func={handlePreview}
          btnName='미리보기'
          style={previewBtnStyle}
        />
        
        
      </BtnArea>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PreviewImg src={previewImg} alt="미리보기" />
        </Modal.Body>
      </Modal>       
    </WriteArea>
  )
}

export default MailWrite;
