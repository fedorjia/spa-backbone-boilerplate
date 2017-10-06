// import template from './cart-item.html';
import cartStore from '../../script/cart-store';

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

        this.template = _.template(
            `<div class="inner">
                <div class="thumbnail" style="background-image: url(<%=thumbnail%>);"></div>
                <div class="info">
                    <div class="name"><%=title%></div>
            
                    <div class="action">
                        <div class="price">
                            <span class="unit">$</span>
                            <span class="text"><%=price%></span>
                        </div>
                        <div class="options">
                            <div class="option iconfont icon-reduce"></div>
                            <div class="total">x <span><%=count%></span></div>
                            <div class="option iconfont icon-add" style="margin-top: 6px;"></div>
                        </div>
                    </div>
                </div>
            </div>`
        );

        this.data = data;
        this.handler = handler;
    }

    render() {
        this.$el.html(this.template(this.data));
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
