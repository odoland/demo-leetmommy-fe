import moment from 'moment';
const logo1 = require('../logos/lm-1.png');
const logo2 = require('../logos/lm-2.png')
const logo3 = require('../logos/lm-3.png');
const logo4 = require('../logos/lm-4.png');
const logo5 = require('../logos/lm-5.png');
const logo6 = require('../logos/lm-6.png');
const logo7 = require('../logos/lm-7.png');
const logo8 = require('../logos/lm-large.png');

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

/**
 * Returns a random logo source
 * Use as <img src={getRandomLogo()}/>
 */
export const getRandomLogo = () => {
  const randomIdx = Math.floor(Math.random() * logos.length);
  return logos[randomIdx];
}

export const getLogoForToday = () => {
  const now = moment();
  const idx = now.isoWeekday();
  return logos[idx];  
};