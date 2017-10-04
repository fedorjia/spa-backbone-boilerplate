/***
 * Generic Component
 */
class Component extends Backbone.View {

	/***** lifecycle ****/

	render() {
		this.$el.addClass('view');
		$('body').append(this.$el);
		return this;
	}

	viewDidAppear() {

	}

	viewWillDisappear() {

	}

	remove() {
		this.$el.remove();
	}
}

export default Component;
