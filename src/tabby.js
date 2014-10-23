/*! Tabby v0.5.0 | (c) 2014 @_bobbylie | https://github.com/ImBobby/tabby */

;(function ( $, window, document, undefined ) {

  // Default options
  var options = {
    hashChange: false,
    speed: 500,
    complete: null
  };

  // Store class name
  var _class = {
    tabActive     : 'active',
    tabReady      : 'tabby-tab--ready',
    triggerActive : 'active'
  };

  function supportTransition() {
    return (
      'WebkitTransition' in document.body.style ||
      'MozTransition' in document.body.style ||
      'OTransition' in document.body.style ||
      'transition' in document.body.style
    );
  }

  // Set Unique ID to each instance
  function setGroup( elem ) {
    var UID = new Date().getTime();

    elem.setAttribute('data-tabby-group', UID);
  }

  // Check whether URL contain hash
  function hasHash() {
    
    if ( !options.hashChange ) return;

    var _hash = window.location.hash;

    if ( !_hash ) return;

    var $target     = $(_hash),
        $trigger    = $('.tabby-trigger[href="' + _hash + '"]');

    $trigger.siblings().removeClass( _class.triggerActive );
    $trigger.addClass( _class.triggerActive );

    $target.siblings().removeClass( _class.tabActive );
    $target.addClass( _class.tabActive );
  }

  // Set animation speed
  function setTabbySpeed( elem, duration ) {
    elem.css('transition-duration', duration + 'ms');
    elem.find('.tabby-tab').css('transition-delay', duration + 'ms');
  }

  // Set container height equal to active tab
  function setTabbyHeight( elem ) {
    var $container    = elem.find('.tabby-tabs'),
        $tabs         = elem.find('.tabby-tab'),
        $activeTab    = elem.find('.tabby-tab.active'),
        activeHeight  = $activeTab.innerHeight();

    if ( supportTransition() ) {

      setTabbySpeed( $container, options.speed );

      // Use transition if available
      $container.css('height', activeHeight);

    } else {

      // Use jQuery animate if transition unvailable
      $container.animate({
        'height': activeHeight
      }, options.speed);

    }

    // Run callback
    if ( $.isFunction(options.complete) ) {
      var changeComplete = setTimeout( options.complete , options.speed );
    }

    $tabs.addClass( _class.tabReady );
  }

  function toggleTab( event ) {
    var $this   = $(this),
        target  = this.getAttribute('href'),
        $target = $(target);

    if ( $target.hasClass( _class.tabActive ) ) {
      return event.preventDefault();
    }

    var $parent   = $this.parents('[data-tabby-group]'),
        $triggers = $parent.find('.tabby-trigger'),
        $tabs     = $parent.find('.tabby-tab');

    $tabs.removeClass( _class.tabReady );

    $triggers.removeClass( _class.triggerActive );
    $this.addClass( _class.triggerActive );

    $tabs.removeClass( _class.tabActive );
    $target.addClass( _class.tabActive );

    setTabbyHeight($parent);

    // Set has to URL if hashChange is true
    if ( options.hashChange ) {
      window.location.hash = target;
    }

    event.preventDefault();
  }

  $.fn.tabby = function ( userOpts ) {

    if ( !this.length ) return;

    var opts = userOpts || options;

    $.extend(options, userOpts);

    return this.each(function () {
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