import transition from './transition';
import Home from '../views/Home';

const cache = [];

/***
 * get currentView
 */
function getCurrentView() {
	const len = cache.length;
	if(len === 0) {
		return null;
	} else {
		return cache[len-1].value;
	}
}

/**
 * get cache item by class defination
 */
function getCacheItemByDefination(defination) {
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

/**
 * remove all modals
 */
function removeModals() {
	$('.modal').remove();
}

/***************************************************
 * view transition manager
 ***************************************************/
const manager = {
	/**
	 * view transition
	 */
	fly: function(defination, args) {
		// remove all modals
		removeModals();

		let len = cache.length;
		if(len === 0) {
			// push
			this.push(defination, args);
		} else {
			const cacheItem = getCacheItemByDefination(defination);
			if(!cacheItem) {
				// push
				this.push(defination, args);
			} else {
				const currentCacheItem = cache[len-1];
				if(currentCacheItem.key === defination) {
					// replace
					this.replace(defination, args);
				} else {
					if(len === 1) {
						throw new Error('cache size incorrect');
					}
					const prevCacheItem = cache[len-2];
					if(prevCacheItem.key === defination) {
						// pop
						this.pop(args);
					} else {
						// pop to
						this.popTo(cacheItem.key, args);
					}
				}
			}
		}
	},

	/***
	 * view push
	 */
	push(defination, args) {
		const targetView = new defination(args);
		const currentView = getCurrentView();
		const animation = args.__animation__;
		// get transition
		const tran = transition.get(currentView, targetView, animation);
		if(currentView) {
			currentView.viewWillDisappear();
		}
		// transiton push
		tran['push'](() => {
			targetView.__animation__ = args.__animation__;
			cache.push({key: defination, value: targetView});
			targetView.viewDidAppear();
		});
	},

	/***
	 * view replace
	 */
	replace(defination, args) {
		const len = cache.length;
		const targetView = new defination(args);
		const currentView = getCurrentView();
		const tran = transition.get(currentView, targetView);

		currentView.viewWillDisappear();

		// transiton push
		tran['push'](() => {
			targetView.__animation__ = args.__animation__;
			// remove and pop current view
			currentView.remove();
			cache.splice(len-1, 1);
			// push target view
			cache.push({key: defination, value: targetView});
			targetView.viewDidAppear();
		});
	},

	/**
	 * view pop
	 */
	pop() {
		const len = cache.length;
		const currentView = getCurrentView();
		if(!currentView) {
			throw new Error('no view to pop');
		}
		if(len <= 1) {
			throw new Error('cache size incorrect');
		}

		const cacheItem = cache[len-2];
		const targetView = cacheItem.value;
		const animation = currentView.__animation__;

		currentView.viewWillDisappear();
		// get transition
		const tran = transition.get(currentView, targetView, animation);
		// transiton pop
		tran['pop'](() => {
			currentView.remove();
			cache.splice(len-1, 1);
			targetView.viewDidAppear();
		});
	},

	/***
	 * pop to view
	 */
	popTo(defination) {
		let cacheItem = getCacheItemByDefination(defination);
		if(!cacheItem) {
			throw new Error('target view not found');
		}
		const len = cache.length;
		const currentView = getCurrentView();
		if(!currentView) {
			throw new Error('no view to pop');
		}
		if(len <= 1) {
			throw new Error('cache size incorrect');
		}

		const targetView = cacheItem.value;
		const animation = currentView.__animation__;

		currentView.viewWillDisappear();

		// get transition
		const tran = transition.get(currentView, targetView, animation);
		// transiton pop
		tran['pop'](() => {
			// remove views
			const index = cache.indexOf(cacheItem);
			for(let i=index+1; i<len; i++) {
				cache[i].value.remove();
			}
			cache.splice(index+1, len-1);
			targetView.viewDidAppear();
		});
	},

	toIndex() {
		const len = cache.length;
        if(len> 1) {
            cache.splice(0, len-1);
        }
	}
};

export default manager;
