
(function($) {
	
	function isInt(num) {
		
		var res = false;
		try {
			if(String(num).indexOf(".") == -1 && String(num).indexOf(",") == -1) {
				res = parseInt(num) % 1 === 0 ? true : false;
			}
		} catch(e) {
			res = false;
		}
		return res;
	}

	function isFloat(num) {
		
		var res = -1;
		try {
			if(String(num).indexOf(".") != -1) {
				var index = String(num).indexOf(".") + 1; 
				var count = String(num).length - index; 
				if(index > 0) {
					res = count;
				}
			}
		} catch(e) {
			res = -1;
		}
		return res;
	}

	$.fn.numScroll = function(options) {
		
		var settings = $.extend({
			'time': 1500,
			'delay': 0
		}, options);
		
		return this.each(function() {
			var $this = $(this);
			var $settings = settings;
			
			var num = $this.attr("data-num") || $this.text(); 
			var temp = 0; 
			$this.text(temp);
			var numIsInt = isInt(num);
			var numIsFloat = isFloat(num);
			var step = (num / $settings.time) * 10; 
			
			setTimeout(function() {
				var numScroll = setInterval(function() {
					if(numIsInt) {
						$this.text(Math.floor(temp));
					} else if(numIsFloat != -1) {
						$this.text(temp.toFixed(numIsFloat));
					} else {
						$this.text(num);
						clearInterval(numScroll);
						return;
					}
					temp += step;
					if(temp > num) {
						$this.text(num);
						clearInterval(numScroll);
					}
				}, 1);
			}, $settings.delay);
			
		});
	};

})(jQuery);