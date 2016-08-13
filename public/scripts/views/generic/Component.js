/***
 * Generic Component
 */
const Component = Backbone.View.extend({
  
  initialize: function() {

  },

  render: function() {
      this.$el.addClass('page');
      $('body').append(this.$el);
      return this;
  },

  remove: function() {
      this.$el.remove();
  },

  /***** life cycle  ****/

  didDisappear: function(options, callback) {

  },

  didAppear: function(options, callback) {
     
  }
});

module.exports = Component;