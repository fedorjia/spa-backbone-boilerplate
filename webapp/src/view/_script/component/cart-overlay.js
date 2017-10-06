// import template from '../tpl/component/cart-overlay.html';
import config from '../../../framework/config';
import Cart from '../../cart/cart';

import cartStore from '..//cart-store';

/***
 * Cart overlay view
 */
class CartOverlay extends Backbone.View {
    constructor() {
        super({
            className: 'cart-overlay',
            events: {
                'click .inner': 'onClick'
            }
        });

		this.template = _.template(
			`<div class="inner">
				<i class="iconfont icon-cart"/>
				<div class="badge"><%=count%></div>
			</div>`
		);
    }

    render() {
        super.render();
        // render view
        this.$el.html(this.template({ count: cartStore.count() }));
        return this;
    }

    refresh() {
        const count = cartStore.count();
        const $count = this.$el.find('.badge');
        if(count > 9) {
            $count.text('9+');
        } else {
            $count.text(count);
        }
    }

    onClick() {
        if(config.isActiveRouter) {
            APP.router.nav('cart');
        } else {
            APP.viewport.fly(Cart);
        }
    }
}

export default CartOverlay;
