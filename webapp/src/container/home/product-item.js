// import template from './product-item.html';
import cartStore from 'generic/cart-store';

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

        this.template = _.template(
            `<div class="item-inner">
                <div class="thumbnail cover" style="background-image:url(<%=thumbnail%>)"></div>
                <div class="name"><%=title%></div>
            
                <div class="footer-box">
                    <div class="price">
                        <span class="unit">$</span>
                        <span class="text"><%=price%></span>
                    </div>
                    <div class="options">
                        <div class="option iconfont icon-reduce"></div>
                        <div class="option iconfont icon-add" style="margin-top: 4px;"></div>
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
