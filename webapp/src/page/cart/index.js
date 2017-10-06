import config from '../../framework/config';
import Component from 'component';
import Handler from 'handler';
import template from './index.html';
import cartStore from '../../script/cart-store';
import CartItem from './cart-item';
// import Alert from 'alert';
import Confirm from 'confirm';

class Cart extends Component {

    constructor() {
        super({
            className:  'cart-view',
            events: {
                'click .icon-back' : 'onBack',
                'click .btn-buy' : 'onBuy'
            }
        });
        this.freight = 5;
        // message handler
        this.hander = new Handler(this.onMsgReceived.bind(this));
    }

    viewWillDisappear() {

    }

    viewDidAppear() {

    }

    render() {
        super.render();
        this.loadData();
        return this;
    }

    loadData() {
        this.setup(cartStore.get());
    }

    setup(items) {
        let productAmount = 0;
        for(let item of items) {
            productAmount += item.count * item.price;
        }

        this.$el.html(template({
            productAmount,
            freight: this.freight,
            amount: productAmount + this.freight
        }));

        const $items = this.$el.find('.items');
        for(let item of items) {
            const itemView = new CartItem(item, this.hander);
            $items.append(itemView.render().el);
        }
    }

    refreshAmounts() {
        const items = cartStore.get();
        let productAmount = 0;
        for(let item of items) {
            productAmount += item.count * item.price;
        }

        const $productAmount = this.$el.find('.amount-box .product-amount');
        const $amount = this.$el.find('.footer-box .total-amount span');
        $productAmount.text(productAmount);
        $amount.text(productAmount + this.freight);
    }

    /**************************** events ***************************/
    /**
     * on message received
     */
    onMsgReceived(which, args) {
        switch (which) {
            // refresh amounts
            case 1000: {
                this.refreshAmounts();
                break;
            }
        }
    }

    onBack() {
        if(config.isActiveRouter) {
            history.go(-1);
        } else {
            APP.viewport.pop();
        }
    }

    onBuy() {
        const items = cartStore.get();
        if(items.length > 0) {
            // Alert.show('this is alert');
            Confirm.show('Pay', {
                content: 'Pay for this shopping, Are you sure?',
                onSelect: (index) => {

                }
            });
        }
    }
}

export default Cart;
