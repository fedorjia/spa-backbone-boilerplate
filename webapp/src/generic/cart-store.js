const LKEY = 'local-cart';

/**
 * cart store
 */
const cartStore = {
    /**
     * cart count
     */
    count() {
        let cart = localStorage.getItem(LKEY);
        if(cart) {
            cart = JSON.parse(cart);
            const keys = Object.keys(cart);
            let count = 0;
            for(let key of keys) {
                count += cart[key].count*1;
            }
            return count;
        }
        return 0;
    },

    get() {
        let cart = localStorage.getItem(LKEY);
        if(!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        const keys = Object.keys(cart);
        const items = [];
        for(let key of keys) {
            items.push(cart[key]);
        }
        return items;
    },

    increase(item) {
        let cart = localStorage.getItem(LKEY);
        if(!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }

        if(cart[item.id]) {
            item.count = cart[item.id].count*1+1;
        } else {
            item.count = 1;
        }
        cart[item.id] = item;
        localStorage.setItem(LKEY, JSON.stringify(cart));
        return true;
    },

    decrease(item) {
        let cart = localStorage.getItem(LKEY);
        if(!cart) {
            cart = {};
        } else {
            cart = JSON.parse(cart);
        }
        if(cart[item.id]) {
            const t = cart[item.id].count*1-1;
            if(t <= 0) {
                item.count = 0;
                delete cart[item.id];
            } else {
                item.count = t;
                cart[item.id] = item;
            }
            localStorage.setItem(LKEY, JSON.stringify(cart));
            return true;
        }
        return false;
    }
};

export default cartStore;
