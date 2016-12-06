import Component from './generic/Component';
import template from './tpls/cart.html';
import cartStore from '../commons/cart-store';
import CartItem from './items/CartItem';
import Handler from '../libs/handler';
// import Alert from './widgets/Alert';
import Confirm from './widgets/Confirm';
import viewport from '../libs/viewport';
import config from '../libs/config';

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
            viewport.pop();
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
