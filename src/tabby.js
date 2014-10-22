/*! Tabby v0.2.1 | (c) 2014 @_bobbylie | https://github.com/ImBobby/tabby */

;(function ( $, window, document, undefined ) {

  var config = {
    tabActive: 'active',
    tabReady: 'tabby-tab--ready',
    triggerActive: 'active'
  };

  function supportTransition() {
    return (
      'WebkitTransition' in document.body.style ||
      'MozTransition' in document.body.style ||
      'OTransition' in document.body.style ||
      'transition' in document.body.style
    );
  }

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

  function setTabbyHeight( elem ) {
    var $container    = elem.find('.tabby-tabs'),
        $tabs         = elem.find('.tabby-tab'),
        $activeTab    = elem.find('.tabby-tab.active'),
        activeHeight  = $activeTab.innerHeight();

    if ( supportTransition() ) {

      // Use transition if available
      $container.css('height', activeHeight);

    } else {

      // Use jQuery animate if transition unvailable
      $container.animate({
        'height': activeHeight
      }, 500);

    }

    $tabs.addClass( config.tabReady );
  }

  function toggleTab( event ) {
    var $this   = $(this),
        target  = this.getAttribute('href'),
        $target = $(target);

    if ( $target.hasClass( config.tabActive ) ) return;

    var $parent   = $this.parents('[data-tabby-group]'),
        $triggers = $parent.find('.tabby-trigger'),
        $tabs     = $parent.find('.tabby-tab');

    $tabs.removeClass( config.tabReady );

    $triggers.removeClass( config.triggerActive );
    $this.addClass( config.triggerActive );

    $tabs.removeClass( config.tabActive );
    $target.addClass( config.tabActive );

    setTabbyHeight($parent);

    window.location.hash = target;
  }

  $.fn.tabby = function ( options ) {

    if ( !this.length ) return;

    this.each(function () {
      var $this     = $(this),
          $triggers = $this.find('.tabby-trigger');

      // Assign an ID for each tab group
      setGroup(this);

      // Show tab base on hash
      hasHash();

      // Calculate height
      setTabbyHeight($this);

      // Toggle tab on click
      $triggers.click( toggleTab );
    });
  };

})( jQuery, window, document );