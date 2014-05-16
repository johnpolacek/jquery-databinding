// Example of extending an empty jQuery object and using it to pass data around
var dataObj = $.extend($({}),(function(o) {

	// Private Things
	var coolFactor = 0;

	function isCoolStuff(stuff) {
		return stuff.indexOf('cool') != -1;
	}

	// Public Things
	o.doStuff = function(stuff) {
		if (isCoolStuff(stuff)) {
			coolFactor++;
			o.trigger('did.it',[{done:stuff, status:coolFactor}]);
		} else {
			--coolFactor; // we only do cool stuff!
			o.trigger('did.nothing',[{status:coolFactor}]);
		}
	};

	return o;

})($({})));

// DOM event handlers
$('#button').on('click',function() {
	dataObj.doStuff(Math.random() > 0.4 ? 'cool stuff' : 'boring stuff');
});

// Data event handlers with chaining and namespaces (thanks jQuery)
dataObj
	.on('did.it',function(e, data) {
		$('#output').prepend('<p>We did '+data.done+'. <small>(+1)</small></p>');
	})
	.on('did.nothing',function() {
		$('#output').prepend('<p>We did nothing. <small>(-1)</small></p>');
	})
	.on('did.it did.nothing',function(e, data){
		$('#status').text(data.status);
	});