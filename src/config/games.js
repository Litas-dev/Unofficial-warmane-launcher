// Remote logos to fix broken local files
const classicLogo = 'https://logos-world.net/wp-content/uploads/2021/02/World-of-Warcraft-Classic-Logo.png';
const tbcLogo = 'https://upload.wikimedia.org/wikipedia/en/8/82/WoW_Burning_Crusade_Logo.png';
const wotlkLogo = 'https://logos-world.net/wp-content/uploads/2021/02/World-of-Warcraft-Wrath-of-the-Lich-King-Logo.png';

import classicArt from '../assets/1.12.png';
import tbcArt from '../assets/2.4.3.png';
import wotlkArt from '../assets/3.3.5.png';
import classicIcon from '../assets/wow-classic-icon.png';
import tbcIcon from '../assets/wow-tbc-icon.png';
import wotlkIcon from '../assets/wow-wotlk-icon.png';

export const games = [
  { 
    id: 'classic', 
    name: 'Classic (1.12.1)', 
    shortName: 'Classic',
    menuLabel: '1.12',
    version: '1.12.1', 
    icon: classicLogo,
    clientIcon: classicIcon,
    cardArt: classicArt,
    bg: 'https://images.alphacoders.com/109/1097880.jpg', // Background for Classic
  },
  { 
    id: 'tbc', 
    name: 'Burning Crusade (2.4.3)', 
    shortName: 'TBC',
    menuLabel: '2.4.3',
    version: '2.4.3', 
    icon: tbcLogo,
    clientIcon: tbcIcon,
    cardArt: tbcArt,
    bg: 'https://images.alphacoders.com/603/603505.jpg', // Background for TBC
  },
  { 
    id: 'wotlk', 
    name: 'Lich King (3.3.5a)', 
    shortName: 'WotLK',
    menuLabel: '3.3.5',
    version: '3.3.5a', 
    icon: wotlkLogo,
    clientIcon: wotlkIcon,
    cardArt: wotlkArt,
    bg: 'https://images.alphacoders.com/694/69466.jpg', // Background for WotLK
  }
];
