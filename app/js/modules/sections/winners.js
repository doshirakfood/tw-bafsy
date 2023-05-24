const SectionWinners = (() => {

    class Core {

        constructor(element) {

            this.$el     = element;
            this.$body   = this.$el.querySelector('.winners-body');
            this.$search = this.$el.querySelector('.winners__search'); 
            this.$urlGET = 'https://jsonplaceholder.typicode.com/posts'; 

        }

        init() {

            this.build();
            this.events();

        }

        build() {

            let trigger = this.$el.querySelector('.winners-tab__trigger'),
                content = this.$el.querySelector('.winners-tab__content');


            this.$body.classList.add('preloader');
            this.method_get(trigger, content, 1);

        }

        events() {

            this.$search.addEventListener('input',       this.listener_search.bind(this), false);
            this.$body.addEventListener('tabs selected', this.listener_tab.bind(this),    false);

        }


        listener_tab(event) {

            let detail  = event.detail,
                trigger = detail.trigger,
                content = detail.content,
                index   = detail.index + 1;

            
            this.method_reset_search();

            if (trigger.classList.contains('loaded') == false) {

                this.$body.classList.add('preloader');                
                this.method_get(trigger, content, index);

            }

        }


        listener_search() {
            
            let filter = this.$search.value.toLowerCase(),
                table = this.$el.querySelector('.winners-tab__content.tab-content--selected .winners-table'),
                children = Array.from(table.querySelectorAll('.winners-table__row:not(.tr-ignore)')),
                notFoundElement = table.querySelector('.winners-table__row.tr-notfound') || document.createElement('div');

            
            children.forEach((variable) => {

                let emailName = variable.getAttribute('data-user-email').toLowerCase();

                
                if (emailName.indexOf(filter) > -1) {

                    variable.classList.remove('none');
                    
                } else {
                    
                    variable.classList.add('none');
                
                }

            })


            let result = children.find((element) => element.classList.contains('none') == false) || false;

            
            if (result == false) {

                notFoundElement.classList.add('winners-table__row');
                notFoundElement.classList.add('row');
                notFoundElement.classList.add('mx-0');
                notFoundElement.classList.add('tr-ignore');
                notFoundElement.classList.add('tr-notfound');
                notFoundElement.innerHTML=`<div class="winners-table__col col">Увы, ничего не найдено...</div>`;

                table.appendChild(notFoundElement);

            } else {

                notFoundElement.remove();

            }

        }


        method_get(trigger, content, indexPage) {


            let httpRequest = new XMLHttpRequest(),
                table       = content.querySelector('.winners-table');


            httpRequest.open('GET', `${this.$urlGET}?_limit=10&_page=${indexPage}`, true);
            httpRequest.send(null);

            httpRequest.addEventListener("load", () => {

                if (httpRequest.status == 200) {

                    let data = JSON.parse(httpRequest.response),
                        rowElement = null;


                    data.forEach(variable => {

                        rowElement = document.createElement('div');

                        rowElement.classList.add('winners-table__row');
                        rowElement.classList.add('row');
                        rowElement.classList.add('mx-0');
                        rowElement.setAttribute('data-id',         variable.id);
                        rowElement.setAttribute('data-user-id',    variable.userId);
                        rowElement.setAttribute('data-user-email', variable.title);
                        rowElement.innerHTML = `
                            <div class="winners-table__col col tc-name"><span>Иван Иванов Иванович</span></div>
                            <div class="winners-table__col col tc-email"><span>${variable.title}</span></div>
                            <div class="winners-table__col col"><span>${variable.body}</span></div>
                        `;
                        
                        table.appendChild(rowElement);

                    });


                    trigger.classList.add('loaded');                                        

                } else {

                    alert(`Произошла ошибка ${httpRequest.status}: ${httpRequest.statusText}. Давайте попробуем ещё раз`);

                }
                
                
                BasicToggleVisibleContent.show(this.$el);
                setTimeout(() => this.$body.classList.remove('preloader'), 625);

            }, false);

        
            httpRequest.addEventListener("error", () => {
                
                alert("Произошла ошибка, давайте попробуем ещё раз.");
                BasicToggleVisibleContent.show(this.$el);
                setTimeout(() => this.$body.classList.remove('preloader'), 625);
            
            }, false);

        }


        method_reset_search() {
            
            let noneElements = Array.from(this.$body.querySelectorAll('.winners-table__row.none')),
                notFound = this.$body.querySelector('.winners-table__row.tr-notfound') || false;


            this.$search.value = null;

            noneElements.forEach((variable) => variable.classList.remove('none'));

            if (notFound !== false) {

                notFound.remove();

            }

        }

    }


    let active = null;


	/**
	 * SectionWinners initialization
	 */
	const init = () => {
		
		let element = document.querySelector('.winners') || false;

			
		try {
            
            active = new Core(element)
            active.init();
            
            return active;
		
		} catch(error) {

			console.error(`SectionWinners init. \nMessage: ${error.message} \nElement: `, element);

		}

	}   


	return { init };

})();


window.SectionWinners = SectionWinners;


export { SectionWinners };