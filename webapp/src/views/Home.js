import Component from './generic/Component';
import template from './tpls/home.html';
import http from '../utils/http';
import Item from './items/Item';

class HomeView extends Component {

    constructor() {
        super({
            className:  'home-view',
            events: {

            }
        });
        this.name = 'Single Page Applcation With Backbone';
    }

//    initialize() {
//        super.initialize();
//        this.constructor.__super__.initialize.apply(this);
//    }

    render() {
        super.render();
        // load data
        this.loadData();
        // render html
        this.$el.html(template({ name: this.name }));
        return this;
    }

    loadData() {
        http.get('/static/assets/list.json')
                .then((result) => {
                    this.setup(result.data);
                });
    }

    setup(data) {
        const $items = this.$el.find('.items');
        data.forEach((obj) => {
            const item = new Item(obj);
            $items.append(item.render().el);
        });
    }
}

export default HomeView;