import React    from "react";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import Image from 'react-bootstrap/Image'
import logo from "../../static/images/mustache.png"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container} from "react-bootstrap";

const Header =()=> (
    <div className="header">
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <Image src={logo} width={200} height={100}/>
                </Col>
                <Col xs={4} md={3}>
                    <div position = "relative">Mustache Beard AR</div>
                </Col>
                <Col>
                    <LanguageSelector Languages={["ru", "eng"]}/>
                </Col>
            </Row>
        </Container>
    </div>);

export default Header;
