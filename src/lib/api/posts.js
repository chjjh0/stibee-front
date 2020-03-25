import client from './client';

export const setPosts = pageNum => {
  return client.get(`/api/post/list/${pageNum}`);
};

export const setPostsByTag = ({ pageNum, selectedTag: tag }) => {
  return client.post(`/api/post/findByTag/${pageNum}`, { tag });
};
