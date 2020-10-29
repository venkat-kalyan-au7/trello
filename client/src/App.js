import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Alert from './components/Common/Alert';
import UpdateProfile from "./pages/UpdateProfile"

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
import { loadUser } from './Redux/actions/auth';
import setAuthToken from './Helpers/setAuthToken.js';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/board/:id' component={Board} />
            <Route exact path="/profile/edit" component={UpdateProfile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
