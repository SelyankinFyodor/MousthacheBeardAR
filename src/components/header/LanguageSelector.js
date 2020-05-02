import React from 'react'
import i18n from '../../i18n'
import {withNamespaces} from 'react-i18next';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(() => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    text:{
        fontFamily: 'Lobster'
    },
}));


const LanguageSelector = ({Languages , t}) => {
    const changeLanguage = event => {
        i18n.changeLanguage(event.target.value);
        setLang(event.target.value);
    };
    const classes = useStyles();
    const [lang, setLang] = React.useState("ru");

    return (
        <FormControl className={classes.formControl}  >
            <Select value={lang}  onChange={changeLanguage} >
                {Languages.map(el => (<MenuItem value={el.lang} key={el.lang} onClick={() => changeLanguage(el.lang)}  className={classes.text}>
                    <img src={el.icon} alt="icon" width={20}/>
                    <Hidden smDown>{t(el.lang)}</Hidden>
                </MenuItem>))}
            </Select>
        </FormControl>
    )
};

LanguageSelector.propTypes = {
    Languages : PropTypes.arrayOf(PropTypes.exact({
        lang: PropTypes.string,
        icon: PropTypes.string
    })),
    t : PropTypes.any
};


export default withNamespaces()(LanguageSelector)
