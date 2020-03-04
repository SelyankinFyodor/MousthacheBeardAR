import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Content from "./components/Content/Content";
import './i18n';
import {withNamespaces} from 'react-i18next';

const App = ({t}) => {

  return (
    <div className="App">
        <Header/>
        <Content/>
    </div>
  )
}

export default withNamespaces()(App);
