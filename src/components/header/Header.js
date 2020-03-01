import React    from "react";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import Image from 'react-bootstrap/Image'
// import logo from "../../static/images/mustache-no-shadow-logo.png"
import logo from "../../static/images/mustahceTree.png"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {withWidth} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import {makeStyles} from "@material-ui/core/styles";


const theme = createMuiTheme({
    typography: {
        fontSize:30,
        fontFamily:['Tangerine']
    },
});
const useStyles = makeStyles(theme => ({
    header:{
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    }
}));

const Languages = [
    {lang: "ru", icon: "src/static/images/russia-flag.png"},
    {lang: "eng", icon: "src/static/images/united-kingdom-flag.png"}
    ];

const Header =()=> {
    const classes = useStyles();
    return (<div className={classes.header}>
            <Grid
                container
                alignItems="center"
            >
                <Grid item>
                    <Image src={logo} width={200} height={100}/>
                </Grid>
                <Hidden smDown>
                    <Grid item>
                        <ThemeProvider theme={theme}>
                            <Typography theme={theme}>Mustache Beard AR</Typography>
                        </ThemeProvider>
                    </Grid>
                </Hidden>
                <Grid item xs>
                    <Box display="flex" flexDirection="row-reverse" bgcolor="background.paper">
                        <LanguageSelector Languages={Languages}/>
                    </Box>
                </Grid>
            </Grid>
        </div>)
};

export default withWidth()(Header);
