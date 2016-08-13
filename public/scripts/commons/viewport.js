import consts from './consts';

const appViews = [];

const viewport = {

	options: {
		animation: 'fade',
		duration: '280' // animation duration
	},

	/**
	 * 进入页面
     */
	push(defination, options, arg1, arg2, arg3) {
		const instance = new defination(arg1, arg2, arg3);
		instance.render();

		// push array
		appViews.push({ key: defination, value: instance });

		// place options
		options = options || {};
		for(var option in this.options) {
			if(this.options.hasOwnProperty(option)) {
				if(options[option] === undefined) {
					options[option] = this.options[option];
				}
			}
		}

		const len = appViews.length;
		if(len > 1) { // current View disappear
			const currentView = appViews[len-2].value;
			options.animationType = this.getAnimationType(options.animation, 'out');
			currentView.didDisappear(options);
		}

		const cloneOptions = _.clone(options);
		// target view appare
		cloneOptions.animationType = this.getAnimationType(options.animation, 'in');
		instance.didAppear(cloneOptions);
	},

	/**
	 * 离开页面
     */
	pop(options) {
		const len = appViews.length;
		if(len > 1) {
			// place options
			options = options || {};
			for(var option in this.options) {
				if(this.options.hasOwnProperty(option)) {
					if(options[option] === undefined) {
						options[option] = this.options[option];
					}
				}
			}

			// current view disappear
			const currentView = appViews[len-1].value;
			options.animationType = this.getAnimationType(options.animation, 'out');
			currentView.didDisappear(options);

			const cloneOptions = _.clone(options);
			// prev view appear
			const prevView = appViews[len-2].value;
			cloneOptions.animationType = this.getAnimationType(options.animation, 'in');
			prevView.didAppear(cloneOptions, () => {
				currentView.remove();
			});
		}
	},

	/**
	 * 切换页面
     */
	transform(defination, arg1, arg2, arg3) {
		let len = appViews.length;
		if(len > 0) {
			const currentView = appViews[len-1].value;
			currentView.didDisappear();
		}

		let instance = this.getInstanceByDefination(defination);
		if(!instance) {
			// push
			instance = new defination(arg1, arg2, arg3);
			instance.render();
			instance.didAppear();
			appViews.push({ key: defination, value: instance });
		} else {
			instance.didAppear();
		}

		const viewPriority = consts.PRIORITYS[instance.className];
		len = appViews.length;

		if (len > 1) {
			console.log(viewPriority);
			for(let prop in consts.PRIORITYS) {
				if(consts.PRIORITYS.hasOwnProperty(prop)) {
					const priority = consts.PRIORITYS[prop];

					// find high priority and destroy them
					if(priority >= viewPriority) {
						const view = this.getViewByClassName(prop);
						if(view) {
							if(view.key !== defination) {
								// destroy viewObject
								const viewObj = view.value;
								viewObj.didDisappear();
								viewObj.remove();

								// splice array
								appViews.splice(appViews.indexOf(view), 1);
							}
						}
					}
				}
			}
		}
	},

	/**
	 * get animation type
     */
	getAnimationType(animation, which) {
		let result = '';
		switch(animation) {
			case 'fade':
				if(which === 'in') {
					result = 'fadeIn';
				} else {
					result = 'fadeOut';
				}
				break;
		}
		return result;
	},

	/**
	 * get instance of defination
     */
	getInstanceByDefination(defination) {
		let viewObject;
		for(let i=0; i<appViews.length; i++) {
			const view = appViews[i];
			if(view.key === defination) {
				viewObject = view.value;
				break;
			}
		}
		return viewObject;
	},

	/**
	 * get view by className
     */
	getViewByClassName(className) {
		let result;
		for(let i=0; i<appViews.length; i++) {
			const view = appViews[i];
			const object = view.value;
			if(object.className === className) {
				result = view;
				break;
			}
		}
		return result;
	}
};

export default viewport;