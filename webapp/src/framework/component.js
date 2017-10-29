/***
 * Generic Component
 */
class Component extends Backbone.View {

	/***** lifecycle ****/

	render() {
		this.$el.addClass('layout');
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
