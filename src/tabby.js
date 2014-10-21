/*! Tabby v0.1.0 | (c) 2014 @_bobbylie | https://github.com/ImBobby/tabby */

;(function ( $, window, document, undefined ) {

  var config = {
    tabActive: 'active',
    triggerActive: 'active'
  };

  function setGroup( elem ) {
    var UID = new Date().getTime();

    elem.setAttribute('data-tabby-group', UID);
  }

  function hasHash() {
    var _hash = window.location.hash;

    if ( !_hash ) return;

    var $target     = $(_hash),
        $trigger    = $('.tabby-trigger[href="' + _hash + '"]');

    $trigger.siblings().removeClass( config.triggerActive );
    $trigger.addClass( config.triggerActive );

    $target.siblings().removeClass( config.tabActive );
    $target.addClass( config.tabActive );
  }

  function toggleTab( event ) {
    var $this   = $(this),
        target  = this.getAttribute('href'),
        $target = $(target);

    if ( $target.hasClass( config.tabActive ) ) return;

    var $parent   = $this.parents('[data-tabby-group]'),
        $triggers = $parent.find('.tabby-trigger'),
        $tabs     = $parent.find('.tabby-tab');

    $triggers.removeClass( config.triggerActive );
    $this.addClass( config.triggerActive );

    $tabs.removeClass( config.tabActive );
    $target.addClass( config.tabActive );

    window.location.hash = target;
  }

  $.fn.tabby = function ( options ) {
    this.each(function () {
      var $this     = $(this),
          $triggers = $this.find('.tabby-trigger');

      // Assign an ID for each tab group
      setGroup(this);

      // Show tab base on hash
      hasHash();

      // Toggle tab on click
      $triggers.click( toggleTab );
    });
  };

})( jQuery, window, document );