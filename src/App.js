import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import NotePage from './NotePage';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import store, { history } from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
	<ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={IndexPage} />
            <Route path={`/notes/:id`} component={NotePage} />
          </Switch>
	</ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
