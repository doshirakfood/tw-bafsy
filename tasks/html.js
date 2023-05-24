import slim from 'slim-core';


/**
 * Компиляция html-файлов
 */
const CompilationHTML = (cb) => {
    
    return gulp.src(configuration.source.html.main, { since: gulp.lastRun(slim) })
        .pipe(cache('html'))	
        .pipe(slim({
            pretty:  true
        }).on( 'error', notify.onError({
            message: "<%= error.message %>",
            title  : "SLIM Error!",
            onLast: true
        })))
        .pipe(beautify.html({ indent_size: configuration.indent_size }))
        .pipe(gulp.dest(configuration.build))
        .pipe(browserSync.reload({stream:true})) 
    
    cb();

};


export default CompilationHTML;