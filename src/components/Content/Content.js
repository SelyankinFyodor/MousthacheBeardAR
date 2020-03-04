import React from 'react'
import {withNamespaces} from "react-i18next";
import ResultArea from "./WorkSpace/ResultArea";

const Content = ({t})=> (<div>
    <ResultArea/>
    {t("content")}
</div>);
export default withNamespaces()(Content);
