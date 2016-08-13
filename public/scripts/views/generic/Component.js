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
     if(options.animationType) {
        this.$el.velocity(options.animationType, {
          duration: options.duration,
          display: 'none',
          complete: function() {
            this.$el.css({ 'opacity': 0 });
            if(callback) {
                callback();
            }
          }.bind(this)
        });
     } else {
        this.$el.css({ 'opacity': 0, 'display': 'none' });
     }
  },

  didAppear: function(options, callback) {
     if(options.animationType) {
        this.$el.velocity(options.animationType, {
          duration: options.duration,
          display: 'block',
          complete: function() {
            this.$el.css({ 'opacity': 1 });
            if(callback) {
                callback();
            }
          }.bind(this)
        });
     } else {
        this.$el.css({ 'opacity': 1, 'display': 'block' });
     }
  }
});

module.exports = Component;