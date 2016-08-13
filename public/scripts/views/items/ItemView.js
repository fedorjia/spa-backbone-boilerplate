import template from '../../../tpls/items/item.html';

const ItemView = Backbone.View.extend({
    events: {},
    tagName: 'li',

    initialize(data) {
        this.data = data;
    },

    render() {
        // append to html
        this.$el.addClass('item');
        this.$el.html(template(this.data));
        return this;
    }
});

export default ItemView;