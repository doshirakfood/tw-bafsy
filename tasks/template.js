/**
 * Создание шаблона проекта
 */
const CreateTemplate = (cb) => {

	let files = fs.readdirSync(`${process.env.INIT_CWD}/`);

	
	if (files.indexOf(configuration.src) == -1) {

		fse.copySync(`${process.env.INIT_CWD}/${configuration.template}`, `${process.env.INIT_CWD}/${configuration.src}`, err => {
			
			if (err) return log.error(err)		
		
		})

		log(`${configuration.notifications.create_tmp.succes}`)	

	} else {

		log.warn(`${configuration.notifications.create_tmp.warning}`, configuration.src)	

	}


	cb();

};


export default CreateTemplate;