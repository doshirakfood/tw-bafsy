import ghPages from 'gulp-gh-pages';


const DeployGhPages = (cb) => {

    return gulp.src('./dist/**/*').pipe(ghPages())
    
    cb();

};


export default DeployGhPages;