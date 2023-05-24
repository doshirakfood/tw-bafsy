console.info('main js →');


// libs
import './modules/libs/basic-ui.min.js'

// sections
import { SectionWinners } from './modules/sections/winners.js'


// init
document.addEventListener('DOMContentLoaded', () => {

	SectionWinners.init()

});
