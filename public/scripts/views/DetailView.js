import Component from './generic/Component';
import template from '../../tpls/detail.html';
import http from '../utils/http';
// import EndView from './EndView';

class DetailView extends Component {

    constructor() {
        super({
            className:  'detail-view',
            events: {
                'click .btn-back' : 'onBack',
                'click .btn-replace' : 'onReplace',
                'click .btn-next' : 'onNext'
            }
        });
    }

    viewWillDisappear() {
        console.log('DetailView viewWillDisappear');
    }

    viewDidAppear() {
        console.log('DetailView viewDidAppear');
    }

    render() {
        super.render();
        this.loadData();
        return this;
    }

    loadData() {
        http.get('/assets/detail.json')
            .then((result) => {
                this.setup(result.data);
            });
    }

    setup(data) {
        this.$el.html(template(data));
    }

    /**************************** events ***************************/
    onBack() {
        // APP.router.nav('');
        history.go(-1);
    }

    onReplace() {
        APP.router.nav('detail/xxx-replace');
    }

    onNext() {
        APP.router.nav('end', { datetime: Date.now() }, 'slide-v');
    }
}

export default DetailView;