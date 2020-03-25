import React, { useEffect, useState, useRef } from 'react';
// style
import PostEdit from './postTemplateStyle';
// lib
import { basicAl } from '../../../lib/alert';
import { Modal } from 'react-bootstrap';
import { screenshotHelper } from '../../../lib/screenshot';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-markdown-editor-lite/lib/index.css';
// compoenents
import TagContainer from '../../../containers/EditorTagContainer';
import ColorPicContainer from '../../../containers/ColorPicContainer';
import BasicBtn from '../../BasicBtn';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { changeVal, initPostEdit } from '../../../modules/postEdit';

const previewBtnStyle = {
  backColor: '#fff',
  fontSize: '18px',
  fontColor: '#3d6fe2',
};

const submitBtnStyle = {
  backColor: '#3d6fe2',
  fontSize: '18px',
  fontColor: '#fff',
};

function PostEditor({ btnHandler }) {
  const screenshotURL = useRef('');
  // redux
  const dispatch = useDispatch();
  const title = useSelector(({ postEdit }) => postEdit.title);
  const cont = useSelector(({ postEdit }) => postEdit.cont);
  // markdown
  const [mdParser, _] = useState(() => new MarkdownIt().use(emoji));
  let mdEditorRef = useRef('');
  const { mdCont, htmlCont } = cont;
  // modal
  const [show, setShow] = useState(false);

  const handleTitle = ({ target }) => {
    dispatch(changeVal('title', target.value));
  };

  const handleEditorChange = ({ html, text }) => {
    dispatch(
      changeVal('cont', {
        mdCont: text.trim(),
        htmlCont: html,
      }),
    );
  };

  const handleImageUpload = (file, callback) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        callback(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleScreenshot = dataUrl => {
    screenshotURL.current = dataUrl;
  };

  const handlePreview = () => {
    if (!!mdCont) {
      // const node = document.querySelector('.html-wrap');
      const node = document.querySelector('.custom-html-style');

      screenshotHelper(node)
        .then(handleScreenshot)
        .then(handleShow)
        .catch(err => {
          basicAl(null, {
            icon: 'error',
            title: '미리보기 생성에 실패했습니다.',
          });
        });
    } else {
      basicAl(null, { icon: 'error', title: '미리보기 할 내용이 없습니다.' });
    }
  };

  // modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <PostEdit>
      <PostEdit.TitleArea>
        <PostEdit.TitleInput
          placeholder="제목을 입력해주세요"
          onChange={handleTitle}
          value={title}
        />
      </PostEdit.TitleArea>

      <MdEditor
        style={{ height: '50%' }}
        ref={mdEditorRef}
        value={mdCont}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
        onImageUpload={handleImageUpload}
      />

      <PostEdit.OptionArea>
        <ColorPicContainer />
        <TagContainer />
      </PostEdit.OptionArea>

      <PostEdit.BtnArea>
        <BasicBtn style={submitBtnStyle} {...btnHandler} />

        <BasicBtn
          func={handlePreview}
          btnName="미리보기"
          style={previewBtnStyle}
        />
      </PostEdit.BtnArea>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PostEdit.PreviewImg src={screenshotURL.current} alt="미리보기" />
        </Modal.Body>
      </Modal>
    </PostEdit>
  );
}

export default PostEditor;
