import React, { useEffect, useState, useRef } from 'react';
// lib
import { basicAl } from '../lib/alert';
import { setPosts } from '../modules/posts';
// components
import PostHeader from '../components/PostHeader';
import PostNav from '../components/PostNav';
import PostMain from '../components/PostMain';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setPostsByTag,
  setMorePosts,
  setMorePostsByTag,
} from '../modules/posts';

function PostListpage({ history }) {
  const [scrollVal, setScrollVal] = useState(false);
  let currentPage = useRef(1);
  // redux
  const user = useSelector(({ user }) => user.user);
  const loading = useSelector(({ loading }) => loading['posts/SET_POSTS']);
  const posts = useSelector(({ posts }) => posts.posts);
  const selectedTag = useSelector(({ posts }) => posts.selectedTag);
  const errorMsg = useSelector(({ posts }) => posts.errorMsg);
  const dispatch = useDispatch();

  const onScroll = e => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      setScrollVal(true);
    } else {
      setScrollVal(false);
    }
  };

  const fetchPosts = (all = false) => {
    // 모두보기 선택시에만 작동
    if (all) {
      currentPage.current = 1;
    }
    dispatch(setPosts(currentPage.current));
  };

  const fetchFindByTag = tag => {
    currentPage.current = 1;
    dispatch(setPostsByTag(currentPage.current, selectedTag));
  };
  // 태그가 바뀌면 실행
  useEffect(() => {
    // 태그 기본값 = all 이라 처음에도 실행 됨
    if (selectedTag.nameEng === 'all') {
      fetchPosts(true);
    } else {
      fetchFindByTag();
    }
  }, [selectedTag]);

  const handlePagination = () => {
    // 더보기 버튼이 사라지긴 하지만, errMsg가 있을 때는 아예 요청을 안하게 방어코딩 해야할 듯
    // 노드에서처럼 조건에 맞을 때 return으로 아래구문들 실행 안하게 하는 것처럼 처리하기
    currentPage.current++;
    if (selectedTag.nameKor === '모두보기') {
      dispatch(setMorePosts(currentPage.current));
    } else {
      dispatch(setMorePostsByTag(currentPage.current, selectedTag));
    }
  };

  useEffect(() => {
    if (!user) {
      basicAl(() => history.push('/'), {
        icon: 'error',
        title: '로그인이 필요합니다.',
      });
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <PostHeader scrollVal={scrollVal} history={history} />
      <PostNav />
      <PostMain
        posts={posts}
        loading={loading}
        errorMsg={errorMsg}
        handlePagination={handlePagination}
        fetchFindByTag={fetchFindByTag}
      />
    </>
  );
}

export default PostListpage;
