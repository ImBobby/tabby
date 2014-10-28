/*! Tabby v0.6.0 | (c) 2014 @_bobbylie | https://github.com/ImBobby/tabby */

;(function ( $, window, document, undefined ) {

  var pluginName = 'Tabby';

  var defaults = {
    hashChange: false,
    speed: 500,
    complete: null
  };

  var RIGHT_ARROW = 39,
      LEFT_ARROW  = 37;

  // Store class name
  var _class = {
    tabActive     : 'active',
    tabReady      : 'tabby-tab--ready',
    triggerActive : 'active'
  };

  function Plugin ( element, options ) {
    this.element    = $(element);
    this._settings  = $.extend( {}, defaults, options);
    this._defaults  = this._settings;
    this._name      = pluginName;

    this.triggers = this.element.find('.tabby-trigger');
    this.tabs     = this.element.find('.tabby-tab');

    this.activeTrigger  = this.element.find('.tabby-trigger.active');
    this.activeTab      = this.element.find('.tabby-tab.active');

    this.init();
  }

  $.extend( Plugin.prototype, {

    init: function () {
      this.setGroup();
      this.showActiveTab( this.activeTab, this._defaults );
      this.toggleTab( this._defaults );
      this.setAccessibility();
      this.hasHash( this._defaults );
    },

    setGroup: function () {
      var UID = new Date().getTime();

      this.element.attr('data-tabby-group', UID);
    },

    showActiveTab: function ( activeTab, settings ) {
      var $container = activeTab.parent(),
          $tabs       = $container.find('.tabby-tab'),
          height = activeTab.innerHeight(),
          speed   = settings.speed;

      if ( supportTransition() ) {
        Plugin.prototype.setTabbySpeed( $container, $tabs, speed );
        $container.css('height', height);
      } else {
        $container.animate({
          'height': height + 'px'
        }, speed);
      }

      activeTab.siblings()
        .removeClass( _class.tabActive + ' ' + _class.tabReady )
        .attr('aria-hidden', 'true');

      activeTab
        .addClass( _class.tabActive + ' ' + _class.tabReady )
        .removeAttr('aria-hidden');

      if ( $.isFunction( settings.complete ) ) {
        var transitionComplete = setTimeout( settings.complete, settings.speed );
      }
    },

    toggleTab: function ( settings ) {
      this.triggers.click( function ( event ) {
        var $this   = $(this);

        if ( $this.hasClass( _class.triggerActive ) ) return;

        var target  = $this.attr('href'),
            $target = $(target);

        $this.siblings()
          .removeClass( _class.triggerActive )
          .attr('tabindex', '-1')
          .removeAttr('aria-selected');
        $this
          .addClass( _class.triggerActive )
          .attr({
            'tabindex': '0',
            'aria-selected': 'true'
          });

        Plugin.prototype.showActiveTab( $target, settings );

        if ( !settings.hashChange ) return event.preventDefault();
      });
    },

    setAccessibility: function () {
      var $triggersWrapper  = this.element.find('.tabby-triggers'),
          $triggers         = this.element.find('.tabby-trigger'),
          $tabs             = this.element.find('.tabby-tab');

      $triggersWrapper.attr('role', 'tablist');
      
      $triggers.each(function(index, el) {
        var $this     = $(el),
            href      = $this.attr('href'),
            controls  = href.substring(1, href.length);

        $this.attr({
          'role': 'tab',
          'aria-controls': controls,
          'tabindex': '-1'
        });

        if ( $this.hasClass( _class.triggerActive ) ) {
          $this.attr({
            'aria-selected': 'true',
            'tabindex': '0'
          });
        }
      });

      $tabs.each(function(index, el) {
        var $this = $(el);

        $this.attr('role', 'tabpanel');

        if ( !$this.hasClass( _class.tabActive ) ) {
          $this.attr('aria-hidden', 'true');
        }
      });
    },

    setTabbySpeed: function ( container, tabs, duration ) {
      var speed = duration + 'ms';

      container.css('transition-duration', speed);
      tabs.css('transition-delay', speed);
    },

    hasHash: function ( settings ) {

      var _hash = window.location.hash;

      if ( !settings.hashChange || _hash === '' ) return;

      var $target = $(_hash),
          $trigger = $('.tabby-trigger[href="' + _hash + '"]');

      $trigger.siblings().removeClass( _class.triggerActive );
      $trigger.siblings().removeAttr('aria-selected');
      $trigger
        .addClass( _class.triggerActive )
        .attr('aria-selected', 'true');

      Plugin.prototype.showActiveTab( $target, settings );
    }

  });

  function supportTransition() {
    return (
      'WebkitTransition' in document.body.style ||
      'MozTransition' in document.body.style ||
      'OTransition' in document.body.style ||
      'transition' in document.body.style
    );
  }

  // Check whether URL contain hash
  function hasHash() {
    
    if ( !options.hashChange ) return;

    var _hash = window.location.hash;

    if ( !_hash ) return;

    var $target     = $(_hash),
        $trigger    = $('.tabby-trigger[href="' + _hash + '"]');

    $trigger.siblings().removeClass( _class.triggerActive );
    $trigger.siblings().removeAttr('aria-selected');
    $trigger
      .addClass( _class.triggerActive )
      .attr('aria-selected', 'true');

    $target.siblings().removeClass( _class.tabActive + ' ' + _class.tabReady );
    $target.siblings().attr('aria-hidden', 'true');
    $target
      .addClass( _class.tabActive + ' ' + _class.tabReady )
      .removeAttr('aria-hidden');
  }

  function keyboardNav( elem ) {
    var cycleTabbyNav = function (e) {

      // Get active element.
      var activeElem = $( document.activeElement );

      // If not tabby trigger, ignore.
      if ( !activeElem.hasClass( _class.triggerActive ) ) return;

      var prev    = activeElem.prev(),
          next    = activeElem.next(),

          hasPrev = prev.length,
          hasNext = next.length;

      var gotoNav = function ( position ) {
        activeElem
          .removeClass( _class.triggerActive )
          .removeAttr('aria-selected')
          .attr('tabindex', '-1');

        position
          .addClass( _class.triggerActive )
          .attr({
            'aria-selected': 'true',
            'tabindex': '0'
          })
          .focus();

        position.trigger('click');
      };

      if ( e.keyCode === RIGHT_ARROW && hasNext ) {
        gotoNav( next );
      } else if ( e.keyCode === LEFT_ARROW && hasPrev ) {
        gotoNav( prev );
      }
    };

    $(document).keydown( cycleTabbyNav );
  }

  $.fn.tabby = function ( options ) {

    if ( !this.length ) return;

    return this.each(function () {
      new Plugin( this, options );
    });
  };

})( jQuery, window, document );