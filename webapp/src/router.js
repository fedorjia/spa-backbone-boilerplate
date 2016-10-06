import manager from './manager';
import transition from './commons/transition';
import HomeView from './views/HomeView';
import DetailView from './views/DetailView';
import EndView from './views/EndView';

const router = {

    /**
     * start router
     */
	start: function() {
        const AppRouter = Backbone.Router.extend({

            /*********************************************
             * router defination
             * ********************************************/
            routes: {
                '':                 'toHome',
                'detail/:id':       'toDetail',
                'end':              'toEnd'
            },

            /*********************************************
             * router handler
             * ********************************************/
            toHome() {
                router.fly(HomeView);
            },
            toDetail(id) {
                router.fly(DetailView, { id: id });
            },
            toEnd() {
                router.fly(EndView);
            },


            /**navigate**/
            nav(path, params, animation, trigger) {
                if (trigger === undefined) {
                    trigger = true;
                }
                this.params = { __animation__ : animation || transition.defaultAnimation };
                Object.assign(this.params, params || {});

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
        const mParams = this.appRouter.params || { __animation__ : transition.defaultAnimation };
        Object.assign(mParams, params || {});
        manager.fly(view, mParams);
        this.appRouter.params = null;
    }
};

export default router;