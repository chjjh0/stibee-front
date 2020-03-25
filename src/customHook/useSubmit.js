import { useSelector } from 'react-redux';

function useSubmit() {
  // reudx
  const post = useSelector(({ post }) => post.post);
  const tags = useSelector(({ postEdit }) => postEdit.tags);
  const colors = useSelector(({ postEdit }) => postEdit.colors);
  const title = useSelector(({ postEdit }) => postEdit.title);
  const cont = useSelector(({ postEdit }) => postEdit.cont);
  const screenshot = useSelector(({ postEdit }) => postEdit.screenshot);

  return {
    post,
    tags,
    colors,
    title,
    cont,
    screenshot,
  };
}

export default useSubmit;
