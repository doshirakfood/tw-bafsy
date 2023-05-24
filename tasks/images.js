import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';


/**
 * Сжатия изображения
 */
const CompilationImages = (cb) => {
    
    return gulp.src(configuration.source.images)
        .pipe(gulpif(argvEnv === 'production', imagemin([
            mozjpeg({quality: 75, progressive: true}),
            optipng({optimizationLevel: 5}),
            svgo()
        ])))
        .pipe(gulp.dest(`${configuration.build}/img/`))
        .pipe(browserSync.reload({stream:true})) 
    
    cb();

};


export default CompilationImages;