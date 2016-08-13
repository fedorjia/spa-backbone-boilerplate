import consts from './commons/consts';
import transition from './commons/transition';

const cache = [];
let cid = 0;

function getCid() {
	return cid++;
}

const viewport = {
	/**
	 * view transition
     */
	fly: function(defination, args) {
		$('.modal').remove();

		let len = cache.length;
		const currentCacheItem = cache[len-1];
		let currentView = len === 0 ? null: currentCacheItem.value;
		let targetView;
		let direction = 'push';
		
		if(len === 0) {
			targetView = new defination(args)
		} else {
			let cacheItem = this.getCacheItemByDefination(defination);
			if(!cacheItem) {
				targetView = new defination(args)
			} else {
				if(currentCacheItem.key === defination) {
					// target key is the current key
					targetView = new defination(args)
				} else {
					if (cacheItem.key === defination) {
						direction = 'pop';
						targetView = cacheItem.value;
					} else {
						targetView = new defination(args)
					}
				}
			}
		}

		const trfactory = transition.get(currentView, targetView, args.__animation__);
		trfactory[direction](() => {
			if(direction === 'push') { // push
				targetView.__cid__ = `view${getCid()}`;
				cache.push({ key: defination, value: targetView });
			}

			const targetPriority = consts.PRIORITYS[targetView.className] || 0;

			cache.forEach((item) => {
				const view = item.value;
				if(view.__cid__ !== targetView.__cid__) {
					const priority = consts.PRIORITYS[view.className] || 0;
					// find high priority and remove it
					if(priority >= targetPriority) {
						view.remove();
						cache.splice(cache.indexOf(item), 1);
					}
				}
			});
		});
	},

	getCacheItemByDefination(defination) {
		let result;
		for(let i=0; i<cache.length; i++) {
			let item = cache[i];
			if(item.key === defination) {
				result = item;
				break;
			}
		}
		return result;
	}
};

export default viewport;