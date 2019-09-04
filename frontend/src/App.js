import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from "mobx-react";
import './App.scss';

import Board from './Board';
import Profile from './Profile';
import Home from './Home';

import Stores from './Stores';

function App() {
  return (
    <Provider stores={Stores}>
      <BrowserRouter>
        <section className='app-body'>
          <Route path='/' exact component={Home}/>
          <Route path='/board/:command?/:id?' exact component={Board}/>
          <Route path='/profile/:command?' exact component={Profile}/>
        </section>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
