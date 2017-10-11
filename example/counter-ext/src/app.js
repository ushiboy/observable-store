/* @flow */
import createObservableStore from '@ushiboy/observable-store';
import React from 'react';
import { hydrate } from 'react-dom';
import Application from './presentation/component/Application.js';
import AppContext from './AppContext.js';
import RemoteCounterRepository from './infrastructure/RemoteCounterRepository.js';


function getInitialData() {
  const el = document.querySelector('#initial-data');
  const data = el ? el.getAttribute('data-json') : null;
  return data ? JSON.parse(data) : { count: 0 };
}

const store = createObservableStore(getInitialData());
const counterRepository = new RemoteCounterRepository();
const appContext = AppContext(store, counterRepository);
hydrate(
  <Application appContext={appContext} store={store} />,
  document.querySelector('#app')
);
