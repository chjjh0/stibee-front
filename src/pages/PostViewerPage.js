import React from 'react';
import Postviewer from '../components/PostViewer';

function PostViewerPage({ match, history }) {
  return (
    <>
      <Postviewer match={match} history={history} />
    </>
  );
}

export default PostViewerPage;
