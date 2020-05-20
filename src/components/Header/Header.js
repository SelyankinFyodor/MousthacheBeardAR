import React from "react";
import LanguageSelector from "../../tools/LanguageSelector";
import Image from 'react-bootstrap/Image'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";

import {Common, Icons} from '../../imports'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {withNamespaces} from 'react-i18next';

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
const Header =({setPage, t})=> {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);


    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setPage(index)
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (<div className={classes.header}>
        <Grid
            container
            direction={'row'}
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
        <div className={classes.root}>
            <List component="nav" aria-label="Device settings">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    onClick={handleClickListItem}
                >
                    <ListItemText primary={t('Menu')}/>
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {[
                    t('Home'),
                    t('About'),
                ].map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    </div>)
};

export default withNamespaces()(Header);
