// ********************************************************
// Import app logo
// ********************************************************
import logo from './static/images/moustahceTree.png';

// ********************************************************
// Imports of language icons
// ********************************************************
import rusFlagIcon from './static/images/icons/russia-flag.png';
import ukFlagIcon from './static/images/icons/united-kingdom-flag.png';

// ********************************************************
// Imports of preload face images
// ********************************************************
import face001 from './static/images/faces/face001.jpg';
import face002 from './static/images/faces/face002.jpg';
import face003 from './static/images/faces/face003.jpg';
import face004 from './static/images/faces/face004.jpg';
import face005 from './static/images/faces/face005.jpg';
import face006 from './static/images/faces/face006.jpg';

// ********************************************************
// Imports of moustache images
// ********************************************************
import moustache001 from './static/images/moustaches/moustache001.png';
import moustache002 from './static/images/moustaches/moustache002.png';
import moustache003 from './static/images/moustaches/moustache003.png';
import moustache004 from './static/images/moustaches/moustache004.png';
import moustache005 from './static/images/moustaches/moustache005.png';
import moustache006 from './static/images/moustaches/moustache006.png';

// ********************************************************
// Imports of beards with moustache images
// ********************************************************
import facehair001 from './static/images/scaled_face_hair/beard001.png';
import facehair002 from './static/images/scaled_face_hair/beard002.png';
import facehair003 from './static/images/scaled_face_hair/beard003.png';
import facehair004 from './static/images/scaled_face_hair/beard004.png';
import facehair005 from './static/images/scaled_face_hair/beard005.png';
import facehair006 from './static/images/scaled_face_hair/beard006.png';

// ********************************************************
// Imports of beards without moustache images
// ********************************************************
import beard002 from './static/images/bears2/beard002.png';
import beard004 from './static/images/bears2/beard004.png';
import beard007 from './static/images/bears2/beard007.png';

/**
 * dict of Icons and languages
 * @type {{ru, uk}}
 */
export const Icons = {
  ru: rusFlagIcon,
  uk: ukFlagIcon,
};

/**
 * array of downloaded face images
 * @type {[string]}
 */
export const Faces = [
  face001,
  face002,
  face003,
  face004,
  face005,
  face006,
];

/**
 * array of moustaches png images
 * @type {[string]}
 */
export const Moustaches = [
  moustache001,
  moustache002,
  moustache003,
  moustache004,
  moustache005,
  moustache006,
  // facehair001,
  // facehair002,
  // facehair003,
  // facehair004,
  // facehair005,
  // facehair006,
];

/**
 *
 * @type {[string]}
 */
export const Beards = [
  beard002,
  beard004,
  beard007,
]

/**
 * logo of the app
 * @type {{logo}}
 */
export const Common ={
  logo: logo,
};
