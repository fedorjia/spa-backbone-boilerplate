import manager from './manager';
import transition from './transition';
import routers from '../routers';

const router = {
    /**
     * start router
     */
	start: function() {
        const AppRouter = Backbone.Router.extend({

            ...routers,

            nav(path, params, animation, trigger) {
                if (trigger === undefined) {
                    trigger = true;
                }

				params = params || {};
				params.__animation__ = animation || transition.defaultAnimation;
				this.params = params;

                this.navigate(path, {trigger: trigger});
            }
        });

        this.appRouter = new AppRouter();
        // HTML5 push state
        Backbone.history.start({pushState:true, root: '/'});
        // Backbone.history.start();
    },

    /**
     * transmit view
     */
    fly(view, params) {
        // merge params
        params = params || {};
		params.__animation__ = transition.defaultAnimation;
        Object.assign(params, this.appRouter.params || {});

        manager.fly(view, params);
        this.appRouter.params = null;
    }
};

export default router;
