/**
 * Общие таски:
 * * Браузер синк;
 * * Удаления продакшен-папки;
 * * Удаления кэша файлов;
 * * Копирование и перенос всех файлов(fonts, img, video, json и т.д.).
 */
const Common = ((cb) => {

	// Браузер синк
	const Sync = (cb) => {
	
		browserSync({
			server: {
				baseDir: configuration.build,
				index: configuration.start
			},
		
			notify: false
		});	
	
		cb();
	
	};


	// Удаления продакшен-папки
	const CleanBuild = (cb) => {

		deleteSync(configuration.build); 

		cb();

	};


	// Удаления кэша файлов
	const CleanCache = (cb) => {

		delete cache.caches['html']
		delete cache.caches['css']
		
		cb();

	};


	// Копирование и перенос всех файлов
	const CopyFile = (cb) => {
		
		return gulp.src(configuration.source.others, {base: `./${configuration.src}`})
			.pipe(gulp.dest(configuration.build))

		cb();
			
	};


	return { Sync, CleanBuild, CleanCache, CopyFile };

})();


export default Common;