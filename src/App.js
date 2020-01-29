import React, { useEffect, useState, useRef } from 'react';
// pages
import LoginPage from 'pages/LoginPage';
import PostListPage from 'pages/PostListPage';
import MailWrite from 'pages/MaliWrite';
// components
import PostContainer from 'containers/PostContainer';
import Auth from 'hoc/auth';
import PostOrigin from 'components/PostOrigin';
// router
import { BrowserRouter, Route } from 'react-router-dom';


function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/list" component={Auth(PostListPage, true)} />
        <Route exact path="/write" component={MailWrite} />
        <Route exact path={`/post/:postId`} component={PostOrigin} />
        <Route 
          exact path={`/post/update/:postId`} 
          render={({ match }) => <MailWrite update={true} postId={match.params.postId} />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
