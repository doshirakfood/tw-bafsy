import dartSass     from 'sass';
import gulpSass     from 'gulp-sass';			 
import cleanCSS 	from 'gulp-clean-css'; 		 
import autoprefixer from 'gulp-autoprefixer';
import base64 		from 'gulp-base64-inline';

const sass = gulpSass(dartSass);


/**
 * Компиляция и минификация css-файлов
 */
const CompilationCSS = ((cb) => {

    const main = (cb) => {

        return gulp.src(configuration.source.css.main)
            .pipe(cache('css'))
            .pipe(gulpif(argvEnv === 'development', sourcemaps.init()))
            .pipe(sass().on( 'error', notify.onError({
                message: "<%= error.message %>",
                title  : "SASS Error!",
                onLast: true
            })))		
            .pipe(base64(configuration.source.base64))
            .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 9'], { cascade: false })) // Автоматическая вставка префиксов
            .pipe(gulpif(argvEnv === 'development', sourcemaps.write('.')))
            .pipe(gulp.dest(`${configuration.build}/css/`))				
            .pipe(browserSync.reload({stream:true})) 

        cb();

    };


    const min = (cb) => {

        deleteSync(`${configuration.build}/css/all.min.css`)

        return gulp.src([`${configuration.build}/css/**/*.css`, `${configuration.source.css.libs}`], { sourcemaps: (argvEnv === 'development') })
            .pipe(concat('all.min.css'))
            .pipe(gulpif(argvEnv === 'production', cleanCSS()))
            .pipe(gulp.dest(`${configuration.build}/css/`, { sourcemaps: '.' }))
            .pipe(browserSync.reload({stream:true}))
            .on('end', function() {
                deleteSync([
                    `${configuration.build}/css/**/*`,
                    `!${configuration.build}/css/all.min.css`,
                    `!${configuration.build}/css/all.min.css.map`
                ])
			});

        cb();
    
    };
    

    return { main, min };

})();


export default CompilationCSS;