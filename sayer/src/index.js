import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import Header from './containers/header';
import Main from './containers/main';
import Login from './containers/login';
import jwt from 'jsonwebtoken';

const store = createStore(allReducers);


const SECRET = 'jhg2341234jg234g32h414asdf6assdfasd7f';
const token = localStorage.getItem('sayerToken');
let user = false;
if(token){
  try{
    user = jwt.verify(token, SECRET);
  } catch(err) {
    console.log(err);
  }
}

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        {user ? (
          <div className="App">
            <Header />
            <Main user={user}/>
          </div>
        ) : (
          <div className="App">
            <Login />
          </div>
        )}
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
