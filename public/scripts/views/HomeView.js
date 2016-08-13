import Component from './generic/Component';
import template from '../../tpls/home.html';
// import DetailView from './DetailView';

const HomeView = Component.extend({
    className: 'home-view',
    events: {},

    initialize() {
        this.constructor.__super__.initialize.apply(this);
    },

    render() {
        this.constructor.__super__.render.apply(this);
        // append to html
        this.$el.html(template({}));
        // add events, 阻止300ms延时
        this.addEvents();
        return this;
    },

    /********************** events ********************/
    onListen(event) {
        if(this.fetchFlag) {
            return;
        }
        this.fetchFlag = true;
        $(event.target).velocity('callout.pulse', 200);
        this.animate();
    }
});

export default HomeView;