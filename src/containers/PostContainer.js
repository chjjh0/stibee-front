import React, { useEffect, useState } from 'react';
import PostHeader from 'components/PostHeader';
import PostList from 'components/PostList';
import PostMain from 'components/PostMain';

function PostContainer() {
  const [scrollVal, setScrollVal] = useState(false);

  const onScroll = (e) => {
    console.log('scroll', window.scrollY);
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setScrollVal(true)
    } else {
      setScrollVal(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      <PostHeader scrollVal={scrollVal} />
      <PostList />
      <PostMain />
    </>
  )
}

export default PostContainer;
