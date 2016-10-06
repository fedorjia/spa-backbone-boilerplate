import Component from './generic/Component';
import template from '../../tpls/end.html';

class EndView extends Component {
    constructor(data) {
        super({
            className:  'end-view',
            events: {
                'click .btn-back' : 'onBack',
                'click .btn-home' : 'onHome'
            }
        });

        this.data = data;
    }

    render() {
        super.render();

        this.data.datetime = this.data.datetime || 'xx/xx/xx';
        this.$el.html(template(this.data));
        return this;
    }

    /**************************** events ***************************/
    onBack() {
        history.go(-1);
    }

    onHome() {
        APP.router.nav('/');
    }
}

export default EndView;