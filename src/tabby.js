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
    triggerActive : 'active',
    exclude       : 'tabby-exclude'
  };

  function Plugin ( element, userOptions ) {
    this._element   = $(element);
    this._settings  = $.extend( {}, defaults, userOptions);
    this._defaults  = this._settings;
    this._name      = pluginName;

    this._triggers  = this._element.find('.tabby-trigger');

    this._activeTab = this._element.find('.tabby-tab.active');

    this.init();
  }

  $.extend( Plugin.prototype, {

    init: function () {
      this.setGroup();
      this.showActiveTab( this._activeTab, this._defaults );
      this.toggleTab( this._defaults );
      this.setAccessibility();
      this.hasHash( this._defaults );
      this.keyboardNav( this._element );
    },

    // Set UID to each instance
    setGroup: function () {
      var UID = new Date().getTime();

      this._element.attr('data-tabby-group', UID);
    },

    showActiveTab: function ( activeTab, settings ) {
      var $container  = activeTab.parent(),

          // Find all tabs
          $tabs       = $container.find('.tabby-tab'),

          // Get the height of selected tab
          height      = activeTab.innerHeight(),

          // Get speed value
          speed       = settings.speed;

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
      this._triggers.click( function ( event ) {
        var $this   = $(this);

        if ( $this.hasClass( _class.triggerActive ) ) {
          return event.preventDefault();
        }

        var target  = $this.attr('href'),
            $target = $(target);

        if ( !$target.length ) return;

        $this.siblings(':not(.' + _class.exclude + ')')
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
      var $triggersWrapper  = this._element.find('.tabby-triggers'),
          $triggers         = this._element.find('.tabby-trigger:not(.' + _class.exclude + ')'),
          $tabs             = this._element.find('.tabby-tab');

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

      var showTabByHash = function () {
        var id        = window.location.hash,
            $target   = $(id),
            $trigger  = $('.tabby-trigger[href="' + id + '"]');

        $trigger.trigger('click').focus();
      };

      showTabByHash();

      window.onhashchange = showTabByHash;
    },

    keyboardNav: function ( element ) {
      var cycleTabbyNav = function ( event ) {
        var $activeElem = element.find('.tabby-trigger:focus:not(.' + _class.exclude + ')');

        if ( !$activeElem.length ) return;

        var prev    = $activeElem.prev(),
            next    = $activeElem.next(),

            hasPrev = prev.length,
            hasNext = next.length;

        var gotoNav = function ( position ) {

          if ( position.hasClass( _class.exclude ) ) return;

          position.trigger('click').focus();

          window.location.hash = position.attr('href');
          
        };

        if ( event.keyCode === RIGHT_ARROW && hasNext ) {
          gotoNav( next );
        } else if ( event.keyCode === LEFT_ARROW && hasPrev ) {
          gotoNav( prev );
        }
      };

      $(document).keydown( cycleTabbyNav );
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

  $.fn.tabby = function ( userOptions ) {

    if ( !this.length ) return;

    return this.each(function () {
      new Plugin( this, userOptions );
    });
  };

})( jQuery, window, document );