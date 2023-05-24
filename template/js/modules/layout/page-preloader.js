// --- Page preloader ---
const LayoutPagePreloader = (() => {

	class Core {

	    constructor(item) {
	        
	        this.item = item;
	        this.build();

	    }


	    build() {

	    	let preloaderStorage = localStorage.getItem('page-preloader');


	    	setTimeout(() => {
	    		
	    		this.item.classList.remove('page-preloader');	    		
	    		if (preloaderStorage !== 'on') localStorage.setItem('page-preloader', 'on');

	    	}, 1500);

	    }	

	}


	let active = null;


	// init
	const init = () => active = new Core(document.documentElement);


	return { init };

})()


window.LayoutPagePreloader = LayoutPagePreloader;


export  { LayoutPagePreloader };
// --- /Page preloader ---