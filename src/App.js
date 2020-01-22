import React, { useEffect, useState, useRef } from 'react';
// pages
import LoginPage from 'pages/LoginPage';
import PostListPage from 'pages/PostListPage';
import MailWrite from 'pages/MaliWrite';
// components
import PostContainer from 'containers/PostContainer';
import Auth from 'hoc/auth';


// router
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  


  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/list" component={Auth(PostListPage, true)} />
        <Route exact path="/write" component={MailWrite} />
      </div>

    </BrowserRouter>
  );
}

export default App;
