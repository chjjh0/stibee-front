import React, { useEffect, useState, useRef } from 'react';
// pages
import LoginPage from 'pages/LoginPage';
import PostListPage from 'pages/PostListPage';
import MailWrite from 'pages/MaliWrite';
// components
import Auth from 'hoc/auth';
import PostOrigin from 'components/PostOrigin';
// router
import { BrowserRouter, Route } from 'react-router-dom';


function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Auth(LoginPage, false)} />
        <Route exact path="/list" component={Auth(PostListPage, true)} />
        <Route exact path="/write" component={Auth(MailWrite, true)} />
        <Route exact path={`/post/:postId`} component={Auth(PostOrigin, false)} />
        <Route 
          exact path={`/post/update/:postId`} 
          component={Auth(MailWrite, true)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
