import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Content from "./components/Content/Content";
// import Footer from "./components/Footer/Footer";
// import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n';
import { withNamespaces } from 'react-i18next';
// import img from "./static/images/mustache.png";
const App = ({t}) => {

  return (
    <div className="App">
        <Header/>
        <Content/>
        {/*<Footer/>*/}
    </div>
  )
}

export default withNamespaces()(App);
