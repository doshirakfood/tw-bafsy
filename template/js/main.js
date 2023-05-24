console.info('main js →');


// libs
import './modules/libs/basic-ui.min.js'

// layouts
import { LayoutPagePreloader } from './modules/layout/page-preloader.js';


// init
document.addEventListener('DOMContentLoaded', () => {

	// layouts
	LayoutPagePreloader.init();

});
