'use strict';

(function($) {

	var $players = $('[data-vimeo]');

	var VimeoPlayer = function(el) {

		var _self = this;

		_self.loadCount = 0;
		_self.playing = false;
		_self.el = el;
		_self.$el = $(el).addClass('vimeojs--wrapper'),
		_self.id = _self._generateID();
		_self.iframe = document.createElement('iframe');
		_self.$img = _self.$el.find('img'),
		_self.$iframe = $( _self.iframe );

		_self.$iframe.attr('src', 'http://player.vimeo.com/video/' + _self.$el.attr('href').split('/').pop() + '?api=1&player_id=' + _self.id );

		_self.$el.css({
			'position' : 'relative'
		});

		_self.$iframe.css({
			border   : '0',
			position : 'absolute',
			top      : 0,
			left	 : 0,
			height   : '100%',
			width    : '100%',
			zIndex   : -1 
		});

		console.log(_self.el);

		_self.el.appendChild( _self.iframe );

		_self.getDimensions();

		// Event Handlers
		_self.$el.on('click', function(evt) {
			_self.$el.addClass('vimeojs__loading');
			_self._post( 'play' );
			_self.$img.fadeOut(function() {
				_self.$iframe.css('zIndex', 1);
			});
			_self.playing = true;

			evt.preventDefault();
		});

		$(window).on('message', function(e) {
			_self.onMessageReceived(e);
		});
	};

	VimeoPlayer.prototype._generateID = function() {
		var text = '';
	    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	    for( var i=0; i < 6; i++ ) {
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }

	    return text;
	};


	VimeoPlayer.prototype.getDimensions = function() {
		var _self = this;

		if ( _self.$img.width() < 10 && _self.loadCount < 10 ) {
			setTimeout(function() {
				_self.getDimensions();
				_self.loadCount++;
			}, 750);
		} else {
	
			_self.$el.css({
				width: _self.$img.width(),
				height: _self.$img.height(),
			});

		}
	};

	VimeoPlayer.prototype.ready = function() {
		var _self = this;
		_self._post('addEventListener', 'playProgress' );
	};

	VimeoPlayer.prototype.onMessageReceived = function (e) {
		var _self = this,
			data = JSON.parse(e.data);

		switch ( data.event ) { 
			case 'ready' :
				_self.ready();
				break;
		}
	};

	VimeoPlayer.prototype._post = function( action, value ) {
		var _self = this,
			data;

		data = {
			method: action
		};

		if (value) {
			data.value = value;
		}

		console.log('Messaging:', data, _self.iframe.src.split('?')[0], _self.iframe.src.split('?')[0] );
		_self.iframe.contentWindow.postMessage( JSON.stringify( data ), _self.iframe.src.split('?')[0] );
	};

	$players.each( function() {
		new VimeoPlayer(this);
	});

}(jQuery));