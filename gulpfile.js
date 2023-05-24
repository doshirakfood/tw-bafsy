// Node
import fs 	from "fs";
import fse 	from 'fs-extra';
import path from 'path';

// packages
import gulp 		  from 'gulp';
import gulpif 		  from 'gulp-if';
import { deleteSync } from 'del';
import concat 		  from 'gulp-concat';
import cache  		  from 'gulp-cached';
import notify 		  from  'gulp-notify';
import sourcemaps     from 'gulp-sourcemaps';
import beautify 	  from 'gulp-beautify'; 
import browserSync    from 'browser-sync';
import log 			  from 'fancy-log';
import yargs 		  from 'yargs';
import { hideBin } 	  from 'yargs/helpers';


// common globals
global.fs   = fs;
global.fse  = fse;
global.path = path;

global.gulp     	= gulp;
global.gulpif     	= gulpif;
global.deleteSync	= deleteSync;      
global.concat		= concat; 		   
global.cache		= cache;  		   
global.notify		= notify; 		   
global.sourcemaps   = sourcemaps;      
global.beautify		= beautify; 	    
global.browserSync  = browserSync;     
global.log			= log; 			   
global.yargs		= yargs;
global.argv			= yargs(hideBin(process.argv)).argv;
global.argvEnv		= argv.nodeEnv || 'development';		   

global.configuration = JSON.parse(fs.readFileSync('./config.json'));


// tasks
import CreateTemplate 	 from './tasks/template.js'
import Common  		  	 from './tasks/common.js'

import CompilationHTML 	 from './tasks/html.js'
import CompilationCSS  	 from './tasks/css.js'
import CompilationScript from './tasks/script.js'
import CompilationImages from './tasks/images.js'
import CompilationSVG    from './tasks/svg.js'
import DeployGhPages     from './tasks/gh-pages.js'


// watcher
const Watcher = (cb) => {
	
	// html
	gulp.watch(configuration.source.html.main, gulp.series(CompilationHTML));
	gulp.watch(configuration.source.html.core, gulp.parallel(Common.CleanCache, CompilationHTML));
		
	// css	
	gulp.watch([`${configuration.source.css.main}`, `${configuration.source.css.libs}`], gulp.series(CompilationCSS.main, CompilationCSS.min));
	gulp.watch(configuration.source.css.import, gulp.series(Common.CleanCache, CompilationCSS.main, CompilationCSS.min));
		
	// js
	gulp.watch([`${configuration.source.script.main}`,`${configuration.source.script.modules}`, `${configuration.source.script.libs}`], gulp.series(CompilationScript.main, CompilationScript.min));

	// img and svg sprite
	gulp.watch(configuration.source.images, gulp.series(CompilationImages, CompilationHTML));
	gulp.watch(configuration.source.svg.sprite.path, gulp.series(CompilationSVG, CompilationHTML));

	// остальные файлы(fonts, video)	
	gulp.watch(configuration.source.others).on('all', (eventName, filePath) => {
		
		let pathArray = filePath.split(path.sep),
			pathObject = {
				basename: path.win32.basename(filePath),
				source: pathArray.join('/'),
				path: pathArray.filter((variable) => (variable !== configuration.src)).join('/'),
				dirname: pathArray.filter((variable, index, array) => (variable !== configuration.src && variable !== array[array.length - 1])).join('/'),
			};


		// add and change	
		if (eventName == 'add' || eventName == 'change') {

			if (eventName == 'add')    log(`Добавили файл: ${pathObject.basename}`)
			if (eventName == 'change') log(`Изменили файл: ${pathObject.basename}`)
			
			return gulp.src(pathObject.source)
				.pipe(gulp.dest(`${configuration.build}/${pathObject.dirname}`))
				.pipe(browserSync.reload({stream:true})) 

		}


		// unlink
		if (eventName == 'unlink') {

			log(`Удалили файл: ${pathObject.basename}`)	
			deleteSync(`${configuration.build}/${pathObject.path}`)
				
		}
						
	});

	
	cb();

};
// /watcher


// start dev-env
export const tmp    = gulp.series(CreateTemplate);
export const deploy = gulp.series(DeployGhPages); 
export const watch  = gulp.series(Watcher, Common.Sync);
export const start  = gulp.series(
	Watcher,

	Common.CleanBuild,
	Common.CleanCache,
	Common.CopyFile,
	
	CompilationHTML,
	CompilationCSS.main, 
	CompilationCSS.min, 
	CompilationScript.main, 
	CompilationScript.min,
	CompilationImages, 
	CompilationSVG,
	Common.Sync	
);