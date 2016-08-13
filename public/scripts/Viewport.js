import consts from './commons/consts';
import transition from './commons/transition';

const cache = [];

const viewport = {
	/**
	 * view transition
     */
	fly: function(defination, args) {
		$('.modal').remove();

		let len = cache.length;
		let currentView = len === 0 ? null: cache[len-1].value;
		const targetView = new defination(args);

		let direction = 'push';
		if(len > 0) {
			let instance = this.getInstanceByDefination(defination);
			if(instance) {
				if (targetView !== instance) {
					direction = 'pop';
				}
			}
		}

		const trfactory = transition.get(currentView, targetView, args.__animation__);
		trfactory[direction](() => {
			cache.forEach((item) => {
				item.__active__ = false;
			});
			targetView.__active__ = true;

			if(direction === 'push') {
				cache.push({ key: defination, value: targetView });
			}

			const targetPriority = consts.PRIORITYS[targetView.className] || 0;
			cache.forEach((item) => {
				const view = item.value;
				if(!view.__active__) {
					const priority = consts.PRIORITYS[view.className] || 0;
					if(priority >= targetPriority) {
						// remove view
						view.remove();
						cache.splice(cache.indexOf(item), 1);
					}
				}
			});
		});
	},

	getInstanceByDefination(defination) {
		var instance;
		for(var i=0; i<cache.length; i++) {
			var view = cache[i];
			if(view.key === defination) {
				instance = view.value;
				break;
			}
		}
		return instance;
	}
};

export default viewport;