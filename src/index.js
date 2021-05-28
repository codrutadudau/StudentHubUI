import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
