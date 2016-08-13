import Component from './generic/Component';
import template from '../../tpls/end.html';

const EndView = Component.extend({
    className: 'end-view',
    events: {
        'click .btn-back' : 'onBack'
    },

    initialize(data) {
        this.constructor.__super__.initialize.apply(this);
        this.data = data;
    },

    render() {
        this.constructor.__super__.render.apply(this);

        this.data.datetime = this.data.datetime || 'xx/xx/xx';
        this.$el.html(template(this.data));
        return this;
    },

    /**************************** events ***************************/
    onBack() {
        history.go(-1);
    }
});

export default EndView;