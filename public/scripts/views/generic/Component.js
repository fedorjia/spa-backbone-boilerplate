/***
 * Generic Component
 */
const Component = Backbone.View.extend({
  
  initialize() {

  },

  render() {
      this.$el.addClass('page');
      $('body').append(this.$el);
      return this;
  },

  remove() {
      this.$el.remove();
  },

  /***** life cycle  ****/

  didDisappear() {

  },

  didAppear() {
     
  }
});

module.exports = Component;