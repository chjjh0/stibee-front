import React, { useEffect, useState, useRef } from 'react';
import PostHeader from 'components/PostHeader';
import PostNav from 'components/PostNav';
import PostMain from 'components/PostMain';
import Axios from 'axios';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../modules/post';

function PostListpage() {
  const [scrollVal, setScrollVal] = useState(false);
  // const [posts, setPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  let currentPage = useRef(1);
  const [endPage, setEndPage] = useState(false);
  // redux
  const posts = useSelector(state => state.post);
  const dispatch = useDispatch();

  const onScroll = (e) => {
    console.log('scroll', window.scrollY);
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setScrollVal(true)
    } else {
      setScrollVal(false)
    }
  }

  const settingPosts = (res) => {
    if (res.data.msg === 'endPage') {
      setEndPage(true);
    } else {
      dispatch(setPost(res.data.posts));
    }
  }

  const fetchPost = () => {
    Axios.get(`/api/post/list/${currentPage.current}`)
      .then(res => {
        console.log('fetchpost res ', res);
        settingPosts(res);
      })
      .catch(err => {
        console.log('fetchpost err', err);
      })
  }

  const fetchFindByTag = (tagName) => {
    const submitData = { tagName };

    Axios.post('/api/post/findByTag', submitData)
      .then(res => {  
        // console.log('findByTag res', res);
        dispatch(setPost(res.data.post));
      })
      .catch(err => {
        console.log('postsByTag err', err);
      })
    
  }

  const handlePagination = () => {
    currentPage.current++
    fetchPost()
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll, true);
    fetchPost();
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      <PostHeader scrollVal={scrollVal} />
      <PostNav fetchFindByTag={fetchFindByTag} />
      <PostMain 
        posts={posts} 
        handlePagination={handlePagination} 
        endPage={endPage} />
    </>
  )
}

export default PostListpage;
