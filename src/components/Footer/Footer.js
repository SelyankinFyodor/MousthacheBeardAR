import React from "react";
import {withNamespaces} from "react-i18next";
import PropTypes from 'prop-types';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() => ({
  footer:{
    height: "100px",
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
const Footer = ({t}) =>(<div className={useStyles().footer}>{t("St. Petersburg Polytechnic University of Peter the Great")},   2020</div>);

Footer.propTypes = {
  t : PropTypes.any
}

export default withNamespaces()(Footer);
