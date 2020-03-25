import React, { useEffect, useState, useRef } from 'react';
// lib
import Axios from 'axios';
import { screenshotHelper } from '../lib/screenshot';
import { basicAl } from '../lib/alert';
import useSubmit from '../customHook/useSubmit';
// redux
import { useDispatch } from 'react-redux';
import { initPostEdit } from '../modules/postEdit';
import { changeVal } from '../modules/postEdit';
// components
import PostTemplate from '../components/common/postTemplate';
import { setPostForEdit } from '../modules/post';

function PostUpdatePage({ match, history }) {
  // reudx
  const dispatch = useDispatch();
  const { tags, colors, title, cont } = useSubmit();
  const { mdCont, htmlCont } = cont;

  const fetchHandler = () => {
    dispatch(setPostForEdit(match.params.postId));
  };

  const validSubmitDataMsg = () => {
    if (!title.trim()) {
      return '제목을 입력해주세요.';
    } else if (!mdCont.trim()) {
      return '포스트 내용을 입력해주세요.';
    } else if (tags.length === 0) {
      return '태그를 선택해주세요.';
    }
  };

  const submitUpdate = screenshot => {
    const submitData = {
      title,
      screenshot,
      mdCont,
      htmlCont,
      tags,
      colors,
    };

    Axios.put(`/api/post/update/${match.params.postId}`, submitData)
      .then(res => {
        basicAl(() => history.push('/list'), {
          icon: 'success',
          title: '포스트를 수정했습니다.',
        });
      })
      .catch(err => {
        basicAl(null, { icon: 'error', title: '포스트 수정에 실패했습니다.' });
      });
  };

  const handleUpdate = () => {
    if (!!title.trim() && !!mdCont.trim() && tags.length !== 0) {
      // const node = document.querySelector('.html-wrap');
      const node = document.querySelector('.custom-html-style');

      screenshotHelper(node).then(submitUpdate);
    } else {
      basicAl(null, { icon: 'error', title: validSubmitDataMsg() });
    }
  };

  useEffect(function() {
    fetchHandler();
    return () => {
      dispatch(initPostEdit());
    };
  }, []);

  const btnHandler = {
    func: handleUpdate,
    btnName: '수정',
  };

  return <PostTemplate btnHandler={btnHandler} />;
}

export default PostUpdatePage;
