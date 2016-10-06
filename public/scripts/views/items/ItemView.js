import template from '../../../tpls/items/item.html';

class ItemView extends Backbone.View {
    constructor(data) {
        super({
            tagName:  'li',
            events: {

            }
        });
        this.data = data;
    }

    render() {
        // append to html
        this.$el.addClass('item');
        this.$el.html(template(this.data));

        this.$el.on('click', this.onClick.bind(this));

        return this;
    }

    onClick() {
        APP.router.nav(`detail/${this.data.id}`);
    }
}

export default ItemView;