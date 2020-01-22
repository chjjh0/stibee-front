import React, { useEffect, useState } from 'react';
import PostHeader from 'components/PostHeader';
import PostList from 'components/PostList';
import PostMain from 'components/PostMain';
import Axios from 'axios';

function PostListpage() {
  const [scrollVal, setScrollVal] = useState(false);
  const [posts, setPosts] = useState([]);

  const onScroll = (e) => {
    console.log('scroll', window.scrollY);
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setScrollVal(true)
    } else {
      setScrollVal(false)
    }
  }

  const fetchPost = () => {
    Axios.get('/api/post/list')
      .then(res => {
        console.log('posts ', res.data.posts);
        setPosts(res.data.posts)
      })
  }

  useEffect(() => {
    console.log('/list page');
    window.addEventListener('scroll', onScroll, true);
    fetchPost();
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      <PostHeader scrollVal={scrollVal} />
      <PostList />
      <PostMain posts={posts} />
    </>
  )
}

export default PostListpage;
