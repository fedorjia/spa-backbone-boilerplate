import template from '../../../tpls/items/item.html';

const ItemView = Backbone.View.extend({
    events: {

    },
    tagName: 'li',

    initialize(data) {
        this.data = data;
    },

    render() {
        // append to html
        this.$el.addClass('item');
        this.$el.html(template(this.data));

        this.$el.on('click', this.onClick.bind(this));

        return this;
    },

    onClick() {
        APP.router.nav(`detail/${this.data.id}`);
    }
});

export default ItemView;