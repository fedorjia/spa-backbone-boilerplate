import template from '../tpls/items/product-item.html';
import cartStore from '../../commons/cart-store';

class ProductItem extends Backbone.View {
    constructor(data, handler) {
        super({
            tagName:  'li',
            className: 'product-item',
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
        const result = cartStore.decrease(this.data);
        if(result) {
            this.handler.send(1000);
        }
    }

    /**
     * on add event
     */
    onAdd() {
        const result = cartStore.increase(this.data);
        if(result) {
            this.handler.send(1000);
        }
    }
}

export default ProductItem;
