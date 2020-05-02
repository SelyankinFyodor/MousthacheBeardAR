import React from "react";
import {withNamespaces} from "react-i18next";
import PropTypes from 'prop-types';

const Footer = ({t}) =>(<div>{t("footer")}</div>);

Footer.propTypes = {
  t : PropTypes.any
}

export default withNamespaces()(Footer);
