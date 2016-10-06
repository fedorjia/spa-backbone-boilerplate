/***
 * Generic Component
 */
class Component extends Backbone.View {

	/***** lifecycle ****/

	render() {
		this.$el.addClass('page');
		$('body').append(this.$el);
		return this;
	}

	viewWillDisappear() {
		
	}

	viewDidAppear() {

	}

	remove() {
		this.$el.remove();
	}
}

export default Component;