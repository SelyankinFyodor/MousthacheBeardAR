import React from 'react'
import {Dropdown} from "react-bootstrap";
import PropTypes from 'prop-types'

const LanguageComponent = ({ onClick, text}) => (
    <Dropdown.Item href="#/action-1" onClick={onClick}>{text}</Dropdown.Item>
);

LanguageComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default LanguageComponent
