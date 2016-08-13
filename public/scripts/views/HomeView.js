import Component from './generic/Component';
import template from '../../tpls/home.html';
import http from '../utils/http';
import ItemView from './items/ItemView';

const HomeView = Component.extend({
    className: 'home-view',
    events: {},

    initialize() {
        this.constructor.__super__.initialize.apply(this);
        this.name = 'Single Page Applcation With Backbone';
    },

    render() {
        this.constructor.__super__.render.apply(this);
        // load data
        this.loadData();
        // render html
        this.$el.html(template({ name: this.name }));
        return this;
    },

    loadData() {
        http.get('/assets/list.json')
            .then((result) => {
                this.setup(result);
            });
    },

    setup(data) {
        const $items = this.$el.find('.items');
        data.forEach((obj) => {
            const item = new ItemView(obj);
            $items.append(item.render().el);
        })
    }
});

export default HomeView;