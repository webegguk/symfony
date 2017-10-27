// var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a variable, just require it
require('jquery');
require('holderjs');
//import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/carousel';

import './js/rainbows.js';
import './js/unicorns.js';
import './js/test.js';
import styles from '../scss/global.scss';

const  themeName = styles.themeName;
console.log(themeName)
