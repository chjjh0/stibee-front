import React from 'react';
// lib
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// pages
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import PostListPage from './pages/PostListPage';
import PostWritePage from './pages/PostWritePage';
import PostUpdatePage from './pages/PostUpdatePage';
// components
import PostViewerPage from './pages/PostViewerPage';
// router

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/list" component={PostListPage} />
        <Route exact path="/post/write" component={PostWritePage} />
        <Route exact path="/post/viewer/:postId" component={PostViewerPage} />
        <Route exact path="/post/update/:postId" component={PostUpdatePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
