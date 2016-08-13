import Component from './generic/Component';
import template from '../../tpls/detail.html';
import http from '../utils/http';
// import EndView from './EndView';

const DetailView = Component.extend({
    className: 'detail-view',
    events: {
        'click .btn-back' : 'onBack',
        'click .btn-next' : 'onNext'
    },

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
    },

    /**************************** events ***************************/
    onBack() {
        // APP.router.nav('');
        history.go(-1);
    },

    onNext() {
        APP.router.nav('end', { datetime: Date.now() });
    }
});

export default DetailView;