import Component from './generic/Component';
import template from '../../tpls/home.html';
// import DetailView from './DetailView';

const HomeView = Component.extend({
    className: 'home-view',
    events: {},

    initialize() {
        this.constructor.__super__.initialize.apply(this);
        this.name = 'backbone';
    },

    render() {
        this.constructor.__super__.render.apply(this);
        // append to html
        this.$el.html(template({ name: this.name }));
        return this;
    }
});

export default HomeView;