/**
 * @fileOverview Main App component
 * @author Polytech
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************

import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import './i18n';
import {withNamespaces} from 'react-i18next';

/**
 * main component of the app
 * @returns Main app component
 */
const App = () => {
  return (
    <div className="Moustache Beard AR ">
      <Header/>
      <Content/>
    </div>
  );
};

export default withNamespaces()(App);
