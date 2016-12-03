import http from '../../libs/http';

class Infinite {
    constructor(options) {
        const defaults = {
            url: '',
            autoScroll: true,
            limit: 20,
            delay: 500, // delay 500ms
            params: {},
            footerLoadingText: 'Loading...',
            footerMoreText: 'Load More',
            footerClickText: 'Click To Load More'
        }
        options = Object.assign({}, defaults, options);

        if (!options.url) {
            throw new Error('must set url to infinite');
        }

        this.skip = 0;
        this.isBusy = false;
        this.isCompleted = false;
        this.options = options;
    }

    render(target) {
        target.addClass('infinite');

        // load more bar
        this.loadMoreBar = new LoadMoreBar({
            footerLoadingText: this.options.footerLoadingText,
            footerMoreText: this.options.footerMoreText,
            footerClickText: this.options.footerClickText,
            onClick: this.load.bind(this)
        });
        this.loadMoreBar.render(target);

        // bind scroll event
        if (this.options.autoScroll) {
            target.scroll(this.onScroll.bind(this));
        }

        // load data
        this.load();
    }

    /**
     * load data
     */
    load() {
        if(this.isBusy) {
            return;
        }
        const params = this.options.params || {};
        params.skip = this.skip;
        params.limit = this.options.limit;

        this.isBusy = true;
        this.loadMoreBar.loading();
        // http request api-data
        http.get(this.options.url, params)
            .then((resp) => {
                const items = resp.data;
                if (items.length < this.options.limit) {
                    // all data load completely
                    this.loadMoreBar.hide();
                    this.isCompleted = true;
                } else {
                    this.loadMoreBar.reset();
                    // set skip id for the next load
                    this.skip = items[items.length-1].id;
                }
                // data notify
                if (this.options.onDataReceived) {
                    this.options.onDataReceived(items);
                }

                this.isBusy = false;
            })
            .catch((err) => {
                this.loadMoreBar.tip();
                this.isBusy = false;
            });
    }

    /**
     * on scroll event handler
     */
    onScroll(e) {
        const $target = $(e.target);
        if ($target.scrollTop() + $target.height() >= $target.prop('scrollHeight')
            && !this.isBusy && !this.isCompleted) {

            // show loading bar
            this.loadMoreBar.loading();
            // load next page
            setTimeout(() => {
                this.load();
            }, this.delay);
        }
    }
}

/**********************************************
 * load more bar
 **********************************************/
class LoadMoreBar {
    constructor(options) {
        this.footerLoadingText = options.footerLoadingText;
        this.footerMoreText = options.footerMoreText;
        this.footerClickText = options.footerClickText;

        this.onClick = options.onClick;
    }

    render(parentEl) {
        this.$el = $(document.createElement('div'));
        this.$el.addClass('load-more-bar').html(`
            <i class="spinner iconfont icon-loading"/>&nbsp;
            <div class="text">&nbsp;</div>
        `);
        parentEl.append(this.$el);

        this.hide();

        // load more click event
        this.$el.click(this.onClick);
        return this;
    }

    loading() {
        this.$el.show();
        this.$el.find('.spinner').show();
        this.$el.find('.text').text(this.footerLoadingText);
    }

    hide() {
        this.$el.find('.text').text(this.footerMoreText);
        this.$el.hide();
    }

    reset() {
        this.$el.show();
        this.$el.find('.spinner').hide();
        this.$el.find('.text').text(this.footerMoreText);
    }

    tip() {
        this.$el.show();
        this.$el.find('.spinner').hide();
        this.$el.find('.text').text(this.footerClickText);
    }
}

export default Infinite;
