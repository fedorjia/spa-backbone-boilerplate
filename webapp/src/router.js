import router from './framework/router';
import Home from './container/home/home';
import Cart from './container/cart/cart';

const routers = {

	routes: {
		'':                 'toHome',
		'cart':             'toCart',
		// 'detail/:id':       'toDetail'
	},

	/*********************************************
	 * router handler
	 * ********************************************/
	toHome() {
		router.fly(Home);
	},
	toCart() {
		router.fly(Cart);
	}
};

export default routers;
