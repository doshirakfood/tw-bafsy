import { rollup } from 'rollup';
import resolve 	  from '@rollup/plugin-node-resolve';
import babel 	  from '@rollup/plugin-babel';
import multi 	  from '@rollup/plugin-multi-entry';
import terser 	  from '@rollup/plugin-terser';


/**
 * Компиляция и минификация js-файлов
 */
const CompilationScript = ((cb) => {

    const main = (cb) => {

		return rollup({
				input: configuration.source.script.main,
				plugins: [
					multi(),
					resolve(),
					babel({
						"babelHelpers": "runtime",
						"exclude": [
							"**/node_modules/**",
							"./app/js/modules/libs/**"
						]
					}),
					terser()
				]
			})
			.then(bundle => {

				return bundle.write({
					file: `${configuration.build}/js/main.js`,
					format: 'iife',
					sourcemap: (argvEnv === 'development')
				});

			});

        cb();

    };


    const min = (cb) => {

        deleteSync(`${configuration.build}/js/all.min.js`);

        return gulp.src([
				`${configuration.build}/js/**/*.js`,
				`${configuration.source.script.libs}`,
				`!${configuration.build}/js/static/**/*.js`
			], { sourcemaps: (argvEnv === 'development') })
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest(`${configuration.build}/js/`, { sourcemaps: '.' }))
            .pipe(browserSync.reload({stream:true}))
			.on('end', function() {
				deleteSync([
					`${configuration.build}/js/*`,
					`!${configuration.build}/js/static/`,
					`!${configuration.build}/js/**/*.json`,
					`!${configuration.build}/js/all.min.js`,
					`!${configuration.build}/js/all.min.js.map`
				]);
			});

        cb();

    }


    return { main, min };

})();


export default CompilationScript;
