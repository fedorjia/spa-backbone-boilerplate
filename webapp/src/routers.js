import router from './libs/router';
import Home from './views/Home';
import Cart from './views/Cart';

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
