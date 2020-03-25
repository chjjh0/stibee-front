import React, { useEffect, useRef } from 'react';
// lib
import Axios from 'axios';
import { screenshotHelper } from '../lib/screenshot';
import { basicAl } from '../lib/alert';
// redux
import { useDispatch } from 'react-redux';
import { initPostEdit } from '../modules/postEdit';
// components
import PostTemplate from '../components/common/postTemplate';
import useSubmit from '../customHook/useSubmit';
import { useCallback } from 'react';

function PostWritePage({ match, history }) {
  // reudx
  const dispatch = useDispatch();
  const { tags, colors, title, cont } = useSubmit();
  const { mdCont, htmlCont } = cont;

  const validSubmitDataMsg = () => {
    if (!title.trim()) {
      return '제목을 입력해주세요.';
    } else if (!mdCont.trim()) {
      return '포스트 내용을 입력해주세요.';
    } else if (tags.length === 0) {
      return '태그를 선택해주세요.';
    }
  };

  const handleSubmit = screenshot => {
    const submitData = {
      title,
      screenshot,
      mdCont,
      htmlCont,
      tags,
      colors,
    };

    Axios.post('/api/post/save', submitData)
      .then(res => {
        basicAl(() => history.push('/list'), {
          icon: 'success',
          title: '포스트를 저장했습니다.',
        });
      })
      .catch(err => {
        basicAl(null, { icon: 'error', title: '포스트 저장에 실패했습니다.' });
      });
  };

  const handleSave = () => {
    if (!!title.trim() && !!mdCont.trim() && tags.length !== 0) {
      const node = document.querySelector('.custom-html-style');

      screenshotHelper(node).then(handleSubmit);
    } else {
      basicAl(null, { icon: 'error', title: validSubmitDataMsg() });
    }
  };

  useEffect(function() {
    return () => {
      dispatch(initPostEdit());
    };
  }, []);

  const btnHandler = {
    func: handleSave,
    btnName: '저장',
  };

  return <PostTemplate btnHandler={btnHandler} />;
}

export default PostWritePage;
