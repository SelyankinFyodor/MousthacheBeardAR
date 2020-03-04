import React from 'react'
import {withNamespaces} from "react-i18next";
import ResultArea from "./WorkSpace/ResultArea";
// import MainContainer from "./Carusel/Container";

const Content = ({t})=> (<div>
    <ResultArea/>
</div>);
export default withNamespaces()(Content);
