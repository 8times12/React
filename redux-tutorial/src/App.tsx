import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';

const TopPage: React.FunctionComponent<RouteComponentProps> = () => (
  <React.Fragment>
    <AddPostForm />
    <PostsList />
  </React.Fragment>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={TopPage} />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
