/***
 * constants
 */
const consts = {
	DEBUG: 2
};

switch(consts.DEBUG) {
	case 1:
		//development
		consts.DOMAIN = 'http://192.168.1.100:3016';
		consts.WX_API_URL = 'http://wxapi.postio.me';
		consts.WX_APPID = 'wx50d746e9d0f0af1d';
		break;
	case 2:
		//test
		consts.DOMAIN = 'http://nana.postio.me';
		consts.WX_API_URL = 'http://wxapi.postio.me';
		consts.WX_APPID = 'wx50d746e9d0f0af1d';
		break;
	case 3:
		//production
		consts.DOMAIN = 'http://nana.postio.me';
		consts.WX_API_URL = 'http://wxapi.postio.me';
		consts.WX_APPID = 'wx50d746e9d0f0af1d';
		break;
}

consts.DOMAIN_SHORT = consts.DOMAIN.substr(7);

consts.WX_SHARE_TITLE_DEFAULT = 'Title';
consts.WX_SHARE_DESC_DEFAULT = 'Desc';
consts.WX_SHARE_ICON = consts.DOMAIN + '/icons/share_icon.png';
consts.WX_SHARED_PAGE = consts.DOMAIN + '/';


consts.PRIORITYS = {
	'home-view': 1000,
	'speak-view': 1000
};


export default consts;