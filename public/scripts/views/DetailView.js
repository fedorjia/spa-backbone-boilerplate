import Component from './generic/Component';
import template from '../../tpls/detail.html';
import http from '../utils/http';

const DetailView = Component.extend({
    className: 'detail-view',
    events: {},

    initialize() {
        this.constructor.__super__.initialize.apply(this);
    },

    render() {
        this.constructor.__super__.render.apply(this);
        this.loadData();
        return this;
    },

    loadData() {
        http.get('/assets/detail.json')
            .then((result) => {
                this.setup(result);
            });
    },

    setup(data) {
        this.$el.html(template(data));
    }
});

export default DetailView;