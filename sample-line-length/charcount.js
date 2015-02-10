/**
	 * Plugin function to insert spans into p tags
	 * @author pp
	 */
	(function($) {
		$.fn.charSpanCount = function(options) {

			var settings = $.extend({
				//how many character before inserting span
				'charcount' : 10
			}, options);

			var insert_span = function(data) {
				var p_text = $(data).text();
				var p_length = p_text.length;
				var c = 0;
				var charc, newstr = '';
				var first = true;
				while (c <= p_length) {
					charc = p_text.charAt(c);
					newstr = newstr + charc;
					if (c % settings.charcount == 0 && !first) {
						newstr = newstr + '<span>' + c + '</span>';
						$(data).html(newstr);
					}
					first = false;
					c++;
				}
			};
			return this.each(function(index, el) {
				insert_span($(this));
			});
		};
	})(jQuery);