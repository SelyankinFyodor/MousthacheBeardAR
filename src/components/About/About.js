import React from "react";
import {withNamespaces} from "react-i18next";
import PropTypes from 'prop-types';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() => ({
    about:{
        height: "100%",
        lineHeightStep: "32px",
        border: "1px solid #000"
    }
}));
/**
 * @ignore
 * @param t
 * @returns {*}
 * @constructor
 */
const About = ({t}) =>(
    <div className={useStyles().footer}>{t("About Content")}</div>);

About.propTypes = {
    t : PropTypes.any
}

export default withNamespaces()(About);
