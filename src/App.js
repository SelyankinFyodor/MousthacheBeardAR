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
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import {makeStyles} from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
}));

/**
 * main component of the app
 * @returns Main app component
 */
const App = () => {
    const [page, setPage] = React.useState(0)
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header setPage={setPage}/>
            {page === 0 ? <Content/> : <About className={classes.main}/>}
            <Footer/>
        </div>
    );
};

export default withNamespaces()(App);
