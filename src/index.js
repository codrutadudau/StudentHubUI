import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";

const persistConfig = {
    key: 'root',
    storage,
}

const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools()
);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
