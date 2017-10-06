import Component from 'component';
import Handler from 'handler';
import Infinite from 'infinite';

import template from './home.html';
import ProductItem from './product-item';
import CartOverlay from '../../script/component/cart-overlay';

class HomeView extends Component {
    // initialize() {
    //     super.initialize();
    //     this.constructor.__super__.initialize.apply(this);
    // }
    constructor() {
        super({
            className: 'home-view',
            events: {

            }
        });

        // message handler
        this.hander = new Handler(this.onMsgReceived.bind(this));

        // infinite
        this.infinite = new Infinite({
            url: '/api/list',
            limit: 10,
            onDataReceived: this.setup.bind(this)
        });

        // cart overaly
        this.cartOverlay = new CartOverlay();
    }

    /**
     * view did appear lifecycle
     */
    viewDidAppear() {
        // when home view did appear, remove all views from cahce except home view
        APP.viewport.index();
        this.cartOverlay.refresh();
    }

    /**
     * mount ui
     */
    render() {
        super.render();
        // render view
        this.$el.html(template());
        // render infinite
        this.infinite.render(this.$el.find('.wrapper'));
        // render cartOverlay
        this.$el.append(this.cartOverlay.render().el);
        return this;
    }

    /**
     * setup ui
     */
    setup(items) {
        const $items = this.$el.find('.items');
        for(let item of items) {
            const itemView = new ProductItem(item, this.hander);
            $items.append(itemView.render().el);
        }
    }

    /**
     * on message received
     */
    onMsgReceived(which, args) {
        switch (which) {
            // refresh count
            case 1000: {
                this.cartOverlay.refresh();
                break;
            }
        }
    }
}

export default HomeView;
