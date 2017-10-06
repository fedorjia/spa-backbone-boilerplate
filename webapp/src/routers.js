import router from './framework/router';
import Home from './view/home/home';
import Cart from './view/cart/cart';

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
