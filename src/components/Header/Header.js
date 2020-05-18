import React from "react";
import LanguageSelector from "../../tools/LanguageSelector";
import Image from 'react-bootstrap/Image'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {withWidth} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

import {Common, Icons} from '../../imports'

/**
 * @ignore
 */
const theme = createMuiTheme({
    typography: {
        fontSize:30,
        fontFamily:['Tangerine']
    },
});

/**
 * styles for header
 * @type {function():{header:{}}}
 */
const useStyles = makeStyles(() => ({
    header:{
        lineHeightStep: "32px",
        border: "1px solid #000"
    }
}));
/**
 * @type {{icon:string, lang: string}[]}
 */
const Languages = [
    {lang: "ru", icon: Icons['ru']},
    {lang: "eng", icon: Icons['uk']},
];

/**
 * Header of the app
 * @returns {jsx}
 * @constructor
 */
const Header =()=> {
    const classes = useStyles();

    return (<div className={classes.header}>
        <Grid
            container
            alignItems="center"
        >
            <Grid item xs>
                <Image src={Common.logo} width={200} height={100}/>
            </Grid>
            <Grid item xs>
                <Hidden xsDown>
                    <ThemeProvider theme={theme}>
                        <Typography theme={theme}>Mustache Beard AR</Typography>
                    </ThemeProvider>
                </Hidden>
            </Grid>
            <Grid item xs>
                <Box display="flex" flexDirection="row-reverse" bgcolor="background.paper">
                    <LanguageSelector Languages={Languages}/>
                </Box>
            </Grid>
        </Grid>
    </div>)
};

export default withWidth()(Header);
