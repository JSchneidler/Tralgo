import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import NavBar from 'components/NavBar';
import Home from 'containers/Home';
import Tralgo from 'containers/Tralgo';
import TralgoEditor from 'containers/TralgoEditor';
import './style.css';

const App = (props) => {
  return (
    <div>
      <NavBar />

      <Route exact path="/" component={Home} />
      <Route path="/tralgo" component={Tralgo} />
      <Route path="/editor" component={TralgoEditor} />
    </div>
  );
};

export default App;