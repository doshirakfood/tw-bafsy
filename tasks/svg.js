import svgSprite from 'gulp-svg-sprite';


/**
 * Сборка svg-спрайта
 */
const CompilationSVG = (cb) => {

    let config = {
        mode: {
            example: false,
            symbol: {
                dest: '.',
                sprite: `${configuration.source.svg.sprite.file}`
            }
        }
    };
    
    
    return gulp.src(configuration.source.svg.sprite.path)
        .pipe(svgSprite(config))
        .pipe(gulp.dest(configuration.source.svg.sprite.dest))

    
    cb();

};


export default CompilationSVG;