import React from 'react'
import {withNamespaces} from "react-i18next";

const Content = ({t})=> (<div>
    {t("content")}
</div>);
export default withNamespaces()(Content);
