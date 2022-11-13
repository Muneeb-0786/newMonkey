
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import New from './components/New';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <New pageSize={5} />
      </div>
    )
  }
}

