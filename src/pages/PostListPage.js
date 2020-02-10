import React, { useEffect, useState, useRef } from 'react';
import PostHeader from 'components/PostHeader';
import PostNav from 'components/PostNav';
import PostMain from 'components/PostMain';
import Axios from 'axios';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setMorePost, setPostByTag } from '../modules/post';

function PostListpage() {
  const [scrollVal, setScrollVal] = useState(false);
  // const [posts, setPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  let currentPage = useRef(1);
  const [endPage, setEndPage] = useState(false);
  const [emptyPost, setEmptyPost] = useState(false);
  // redux
  const posts = useSelector(state => state.post.posts);
  const selectedTag = useSelector(state => state.post.selectedTag);
  const dispatch = useDispatch();

  const onScroll = (e) => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setScrollVal(true)
    } else {
      setScrollVal(false)
    }
  }

  const settingPosts = (res, all) => {
    if (res.data.msg === 'endPage') {
      setEndPage(true);
    } else if (all) {
      // 모두보기용, posts 덮어쓰기
      dispatch(setPostByTag(res.data.posts))
    } else {
      // 초기 posts 불로오기 및 더보기용
      dispatch(setMorePost(res.data.posts));
    }
  }

  const fetchPost = (all = false) => {
    // 초기화 
    setEmptyPost(false);
    setEndPage(false);
    // 태그 전체보기 선택시에만 작동
    if (all) {currentPage.current = 1;}


    Axios.get(`/api/post/list/${currentPage.current}`)
    .then(res => {
      // console.log('fetchpost res ', res);
      settingPosts(res, all);
    })
    .catch(err => {
      console.log('fetchpost err', err);
    })
  }

  const fetchFindByTag = (tag) => {
    // console.log('fetchFindByTag', tag);
    const submitData = { tag }
    // 현재페이지, 더보기, emptyPost 초기화
    currentPage.current = 1;
    setEndPage(false);
    setEmptyPost(false);
    // console.log('findbytag', tag, currentPage.current, selectedTag) ;

    Axios.post(`/api/post/findByTag/${currentPage.current}`, submitData)
      .then(res => {  
        // console.log('findByTag res', res);
        if (res.data.success) {
          dispatch(setPostByTag(res.data.posts));
        } else {
          // 포스트가 없을 때
          setEmptyPost(true);
        }
      })
      .catch(err => {
        console.log('postsByTag err', err);
      })
  }

  const handlePagination = () => {
    currentPage.current++
    fetchPost();
  }

  const handlePaginationByTag = () => {
    // console.log('handlePaginationByTag', selectedTag, currentPage.current);
    currentPage.current++
    
    const submitData = { tag: selectedTag }

    Axios.post(`/api/post/findByTag/${currentPage.current}`, submitData)
      .then(res => {  
        // console.log('handlePaginationByTag 더보기', res);
        settingPosts(res);

        // dispatch(setPostByTag(res.data.posts));
      })
      .catch(err => {
        console.log('handlePaginationByTag 더보기 err', err);
      })
  }

  useEffect(() => {
    fetchPost();
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      <PostHeader scrollVal={scrollVal} />
      <PostNav 
        fetchPost={fetchPost}
        fetchFindByTag={fetchFindByTag} />
      <PostMain 
        posts={posts} 
        handlePagination={handlePagination} 
        handlePaginationByTag={handlePaginationByTag} 
        fetchFindByTag={fetchFindByTag}
        emptyPost={emptyPost}
        endPage={endPage} />
    </>
  )
}

export default PostListpage;
