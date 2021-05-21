/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppContainer from "./app/router";
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {appReducers} from "./app/reducers";
import rootSaga from "./app/sagas/root";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  appReducers,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);


const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  );
};

export default App;
