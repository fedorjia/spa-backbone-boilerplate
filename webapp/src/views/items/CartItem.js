import template from '../tpls/items/cart-item.html';
import cartStore from '../../commons/cart-store';

class CartItem extends Backbone.View {
    constructor(data, handler) {
        super({
            tagName:  'li',
            className: 'cart-item',
            events: {
                'click .icon-reduce': 'onReduce',
                'click .icon-add': 'onAdd'
            }
        });
        this.data = data;
        this.handler = handler;
    }

    render() {
        this.$el.html(template(this.data));
        return this;
    }

    /**
     * on reduce event
     */
    onReduce() {
        const count = this.data.count;
        if(count-1 < 0) {
            return;
        }

        const result = cartStore.decrease(this.data);
        if(result) {
            this.$el.find('.action .options .total span').text(this.data.count);
        }
        this.handler.send(1000);
    }

    /**
     * on add event
     */
    onAdd() {
        const result = cartStore.increase(this.data);
        if(result) {
            this.$el.find('.action .options .total span').text(this.data.count);
        }
        this.handler.send(1000);
    }
}

export default CartItem;
