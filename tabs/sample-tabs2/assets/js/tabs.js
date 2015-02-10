(function($) {
	$.fn.tabs = function () {
        return this.each(function () {
			var tabsDiv = $(this);
			//for each individual tab DIV, set class and aria role attributes, and hide it
			$(tabsDiv).find(">div").attr({"class": "tabPanel", "role": "tabpanel", "aria-hidden": "true"}).hide();
			$(".tabPanel").attr("tabindex", "0");
			//get the list of tab links
			var tabsList = $(this).find("ul:first").attr({"class": "tabsList", "role": "tablist"}); 

			$(tabsList).find("li>a").each(
				function(a){
					//create a unique id using the tab link's href
					var tabId="tab-"+$(this).attr("href").slice(1);
					//assign tabId, aria and tabindex attributes to the tab control, but do not remove the href
					$(this).attr({"id": tabId, "role": "tab", "aria-selected": "false", "tabindex": "-1"}).parent().attr("role", "presentation");
					//assign aria attribute to the relevant tab panel
					$(tabsDiv).find(".tabPanel").eq(a).attr("aria-labelledby", tabId);
					//set the click event for each tab link
					$(this).on('click',	function(e){
							e.preventDefault();
							//change state of previously selected tabList item
							$(tabsList).find(">li.current").removeClass("current").find(">a").attr({"aria-selected": "false", "tabindex": "-1"});
							//hide previously selected tabPanel
							$(tabsDiv).find(".tabPanel:visible").attr("aria-hidden", "true").hide();
							//show newly selected tabPanel
							$(tabsDiv).find(".tabPanel").eq($(this).parent().index()).attr("aria-hidden", "false").show();
							//set state of newly selected tab list item
							$(this).attr({"aria-selected": "true", "tabindex": "0"}).parent().addClass("current");
							$(this).focus();
						}
					);
				}
			);
			
			//set keydown events on tabList item for navigating tabs
			$(tabsList).delegate("a", "keydown",
				function (e) {
					switch (e.which) {
						case 37: case 38:
							if ($(this).parent().prev().length!=0) {
								$(this).parent().prev().find(">a").trigger('click');
							} else {
								$(tabsList).find("li:last>a").trigger('click');
							}
							break;
						case 39: case 40:
							if ($(this).parent().next().length!=0) {
								$(this).parent().next().find(">a").trigger('click');
							} else {
								$(tabsList).find("li:first>a").trigger('click');
							}
							break;
					}
				}
			);
			$(tabsDiv).find(".tabPanel:first").attr("aria-hidden", "false").show();
			$(tabsList).find("li:first").addClass("current").find(">a").attr({"aria-selected": "true", "tabindex": "0"});
		
        });
    };
}(jQuery));

$(document).ready(function () {
    $('#tabs').tabs();
});