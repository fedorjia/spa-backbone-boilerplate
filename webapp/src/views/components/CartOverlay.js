import template from '../tpls/components/cart-overlay.html';
import cartStore from '../../commons/cart-store';

/***
 * Cart overlay view
 */
class CartOverlay extends Backbone.View {
    constructor(options) {
        super({
            className: 'cart-overlay',
            events: {
                'click .inner': 'onClick'
            }
        });
        this.handler = options.handler;
    }

    render($target) {
        super.render();
        // render view
        this.$el.html(template({ count: cartStore.count() }));
        $target.append(this.$el);
        return this;
    }

    refresh(item) {
        this.updateCount();
    }

    updateCount() {
        const count = cartStore.count();
        const $count = this.$el.find('.badge');
        if(count > 9) {
            $count.text('9+');
        } else {
            $count.text(count);
        }
    }

    onClick() {
        this.handler.send(2000);
        // APP.router.nav('cart');
    }
}

export default CartOverlay;
