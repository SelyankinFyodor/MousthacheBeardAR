import React from 'react'
import DropdownButton from "react-bootstrap/DropdownButton";
import LanguageComponent from "./LanguageComponent";
import i18n from '../../../i18n'
import { withNamespaces } from 'react-i18next';

const LanguageSelector = ({Languages , t}) => {
        const changeLanguage = (lng) => {
                i18n.changeLanguage(lng);
        };
        return (
            <DropdownButton id="dropdown-basic-button" title={t("select Language")}>
                    {Languages.map(el => (<LanguageComponent key={el} onClick={() => changeLanguage(el)} text={t(el)}/>))}
            </DropdownButton>)
}

export default withNamespaces()(LanguageSelector)

