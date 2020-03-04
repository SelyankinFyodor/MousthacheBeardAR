import React from "react";
import {withNamespaces} from "react-i18next";

const Footer = ({t}) =>(<div>{t("footer")}</div>);

export default withNamespaces()(Footer);
