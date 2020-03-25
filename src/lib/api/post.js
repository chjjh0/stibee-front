import client from './client';

export const fetchPost = postId => {
  return client.get(`/api/post/postOrigin/${postId}`);
};
