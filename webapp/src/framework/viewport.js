import transition from './transition';
import router from './router';
import config from './config';

const viewCache = [];
let activeModal;

/***
 * get currentView
 */
function getCurrentView() {
	const len = viewCache.length;
	if(len === 0) {
		return null;
	} else {
		return viewCache[len-1].value;
	}
}

function getKey(defination) {
	if(config.isActiveRouter) {
		return location.pathname;
	} else {
		return defination;
	}
}

/**
 * get cache item by class defination
 */
function getCacheItemByDefination(defination) {
	let result;
	for(let i=0; i < viewCache.length; i++) {
		let item = viewCache[i];
		if(item.key === getKey(defination)) {
			result = item;
			break;
		}
	}
	return result;
}

/***************************************************
 * view transition manager
 ***************************************************/
const manager = {
	/**
	 * view transition
	 */
	fly: function(defination, args) {
		args = args || {};
		if(!args.__animation__) {
			args.__animation__ = transition.defaultAnimation;
		}

		// remove actived modal
		if(activeModal) {
			activeModal.dismiss();
		}

		let len = viewCache.length;
		if(len === 0) {
			// push
			this.push(defination, args);
		} else {
			const cacheItem = getCacheItemByDefination(defination);
			if(!cacheItem) {
				// push
				this.push(defination, args);
			} else {
				const currentCacheItem = viewCache[len-1];
				if(currentCacheItem.key === getKey(defination)) {
					// replace
					this.replace(defination, args);
				} else {
					if(len === 1) {
						throw new Error('cache size incorrect');
					}
					const prevCacheItem = viewCache[len-2];
					if(prevCacheItem.key === getKey(defination)) {
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
			if(config.isActiveRouter) {
				// bind router
				targetView.router = router.appRouter;
			}

			viewCache.push({key: getKey(defination), value: targetView});
			targetView.viewDidAppear();
		});
	},

	/***
	 * view replace
	 */
	replace(defination, args) {
		const len = viewCache.length;
		const targetView = new defination(args);
		const currentView = getCurrentView();
		const tran = transition.get(currentView, targetView);

		currentView.viewWillDisappear();

		// transiton push
		tran['push'](() => {
			targetView.__animation__ = args.__animation__;
			if(config.isActiveRouter) {
				// bind router
				targetView.router = router.appRouter;
			}
			// remove and pop current view
			currentView.remove();
			viewCache.splice(len-1, 1);
			// push target view
			viewCache.push({key: getKey(defination), value: targetView});
			targetView.viewDidAppear();
		});
	},

	/**
	 * view pop
	 */
	pop() {
		const len = viewCache.length;
		const currentView = getCurrentView();
		if(!currentView) {
			throw new Error('no view to pop');
		}
		if(len <= 1) {
			throw new Error('cache size incorrect');
		}

		const cacheItem = viewCache[len-2];
		const targetView = cacheItem.value;
		const animation = currentView.__animation__;

		currentView.viewWillDisappear();
		// get transition
		const tran = transition.get(currentView, targetView, animation);
		// transiton pop
		tran['pop'](() => {
			currentView.remove();
			viewCache.splice(len-1, 1);
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
		const len = viewCache.length;
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
			const index = viewCache.indexOf(cacheItem);
			for(let i=index+1; i<len; i++) {
				viewCache[i].value.remove();
			}
			viewCache.splice(index+1, len-1);
			targetView.viewDidAppear();
		});
	},

	index() {
		const len = viewCache.length;
        if(len > 1) {
			viewCache.splice(0, len-1);
        }
	},

	setActiveModal(modal) {
		activeModal = modal;
	}
};

export default manager;
