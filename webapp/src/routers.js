import router from './framework/router';
import Home from './page/home';
import Cart from './page/cart';

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
