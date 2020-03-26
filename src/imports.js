import rusFlagIcon from './static/images/icons/russia-flag.png'
import ukFlagIcon from './static/images/icons/united-kingdom-flag.png'

import face001 from './static/images/faces/face001.jpg'
import face002 from './static/images/faces/face002.jpg'
import face003 from './static/images/faces/face003.jpg'
import face004 from './static/images/faces/face004.jpg'
import face005 from './static/images/faces/face005.jpg'

import moustachePng001 from './static/images/moustaches/moustache001.png'
import moustachePng002 from './static/images/moustaches/moustache002.png'
import moustachePng003 from './static/images/moustaches/moustache003.png'
import moustachePng004 from './static/images/moustaches/moustache004.png'

import * as moustacheConfig001 from './static/images/configs/moustache001.json'
import * as moustacheConfig002 from './static/images/configs/moustache002.json'
import * as moustacheConfig003 from './static/images/configs/moustache003.json'
import * as moustacheConfig004 from './static/images/configs/moustache004.json'

import logo from "./static/images/moustahceTree.png"

export const Coordinates = [
    moustacheConfig001,
    moustacheConfig002,
    moustacheConfig003,
    moustacheConfig004
];

export const Icons = {
    ru: rusFlagIcon,
    uk: ukFlagIcon
};

export const Faces = [
    face001,
    face002,
    face003,
    face004,
    face005
];

export const MoustachePngs =[
    moustachePng001,
    moustachePng002,
    moustachePng003,
    moustachePng004
];

export const Common ={
    logo: logo
};

var moustache001 = {png: moustachePng001, config: moustacheConfig001}
var moustache002 = {png: moustachePng002, config: moustacheConfig002}
var moustache003 = {png: moustachePng003, config: moustacheConfig003}
var moustache004 = {png: moustachePng004, config: moustacheConfig004}

export const Moustaches = [
    moustache001,
    moustache002,
    moustache003,
    moustache004
];

