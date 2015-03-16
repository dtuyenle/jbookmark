



(function(jQuery) {

	/********** Storage **********/
	function Storage() {

		this.retrieve = function() {
			var value = localStorage.getItem('jBookmark') === null ? [] : JSON.parse(localStorage.getItem('jBookmark'));
			return value
		}

		this.save = function() {
			var current = this.retrieve();
			var value = this.getValue();
			if(!checkDuplicatedObjectInArray(value,current)) {
				current.push(value);
			}	
			localStorage.setItem('jBookmark',JSON.stringify(current));
		}

		this.getValue = function() {
			return {
				url 	: getUrl(),
				image 	: getImage(),
				title 	: getTitle(),
				content : getContent()
			}
		}

		function checkDuplicatedObjectInArray(object,array) {
			var check = false;
			for(var i = 0, length = array.length; i < length; i++) {
				if(object.url === array[i].url) {
					check = true
					break;
				}
			}
			return check
		}

		function getImage() {
			return jQuery('meta[property="og:image"]').attr('content')
		}

		function getTitle() {
			return jQuery('title').text()
		}

		function getUrl() {
			return window.location.href
		}

		function getContent() {
			return jQuery('p').text().split(' ').slice(0,15).join(' ') + '...'
		}
	}


	/********** GUI **********/
	function HTMLBuilder() {
		this.html = function(container,html) {
			jQuery(container).append(html);	
		}
		this.css = function(container,css) {
			jQuery(container).css(css);
		}
	}

	/********** GUI Button **********/
	function Button() {

	}
	Button.prototype = new HTMLBuilder();
	Button.prototype.constructor = Button;



	/********** GUI Interface **********/
	function Container() {
		this.html('body','<div id="jbookmark-container"></div>');
		this.css('#jbookmark-container',{
			'background-color' 	: '#eee',
		  	'border' 			: '1px solid #ccc',
		    'height' 			: '90%',
		    'position' 			: 'fixed',
		    'right' 			: '5%',
		    'top' 				: '3%',
		    'width' 			: '90%',
		    'zIndex' 			: '99999999'
		});
	}
	Container.prototype = new HTMLBuilder();
	Container.prototype.constructor = Container;

	function NavigationItem(option) {
		
		this.option = option;

		this.getHTML = function() {
			var html = '<li role="tab" class="nav-item">' +
							'<a class="nav-item-a" href="' + this.option.url + '">' +
								'<div class="jbookmark-image-container">' +
									'<img height="100" width="100" class="jbookmark-image" src="' + this.option.image + '" />' +
								'</div>' +
								'<div class="jbookmark-title-container">' +
									'<span class="jbookmark-title">' +
										this.option.title +
									'</span>' +
									'<span class="jbookmark-content">' +
										this.option.content
									'</span>' +
								'</div>' +
							'</a>' +
						'</li>';
			return html		
		}

		var html = this.getHTML();	
		this.html('.jbookmark-nav', html);
		this.css('.nav-item',{
			'margin-bottom' 	: '20px',
	    	'position' 			: 'relative',
	    	'width' 			: '100%',
	    	'background-color' 	: '#fff',
		    'box-shadow' 		: '1px 1px 2px rgba(0, 0, 0, 0.15), 1px 1px 0 rgba(0, 0, 0, 0.1)',
		    'height' 			: '100px'
		});
		this.css('.nav-item-a',{
			'display' 		 : 'table',
		    'height' 	 	 : '100px',
		    'overflow' 		 : 'hidden',
		    'text-decoration': 'none',
		    'width' 		 : '100%',
		    'color' 		 : '#006fa6'
		});
		this.css('.jbookmark-image-container',{
			'opacity' 		: '1',
	    	'transition' 	: 'opacity 0.1s ease 0s',
	    	'display' 		: 'table-cell',
		    'line-height' 	: '0',
		    'vertical-align': 'middle'
		});
		this.css('.jbookmark-image',{
			'background-color'  : '#ddd',
		    'display' 			: 'block',
		    'height' 			: '100px',
		    'margin-right' 		: '10px',
		    'width' 			: 'auto'
		});
		this.css('.jbookmark-title-container',{
			'display' 		: 'inline',
		    'max-width' 	: '190px',
		    'padding-right' : '20px',
		    'vertical-align': 'middle',
		    'width' 		: '100%',
		    'max-width' 	: '170px',
		    'opacity' 		: '1',
		    'transition' 	: 'opacity 0.1s ease 0s'
		});
		this.css('.jbookmark-title',{
			'color' 	 : '#333',
		    'display' 	 : 'block',
		    'font-size'  : '1.2em',
		    'font-weight': 'bold',
		    'line-height': '25px',
		    'margin' 	 : '10px 0px',
		    'max-height' : '100px',
		});
		this.css('.jbookmark-content',{
			'color' 	 : '#666',
		    'display' 	 : 'block',
		    'font-size'  : '1em',
		    'font-weight': 'normal',
		    'line-height': '25px',
		    'max-height' : '100px',
		    'overflow' 	 : 'hidden',
		    'margin-top' : '4px'
		});

		
	}
	NavigationItem.prototype = new HTMLBuilder();
	NavigationItem.prototype.constructor = Container;

	function Navigation(option) {
		var html = '<div id="jbookmark-slider">' +
						'<div class="jbookmark-nav-container">' +
							'<ul role="tablist" class="jbookmark-nav"></ul>' +
						'</div>' +
					'</div>';
		this.html('#jbookmark-container',html);
		this.css('#jbookmark-slider',{
			'height' 	: '100%',
	    	'position' 	: 'absolute',
	    	'width' 	: '100%',
	    	'zIndex' 	: '1'
		});
		this.css('.jbookmark-nav-container',{
			'height' 	: '100%',
		    'overflow' 	: 'hidden',
		    'position' 	: 'absolute',
		    'width' 	: '100%'
		});
		this.css('.jbookmark-nav',{
			'height' 	: '100%',
		    'overflow-x': 'hidden',
		    'overflow-y': 'auto',
		    'position' 	: 'absolute',
		    'width' 	: '100%',
		    'zIndex' 	: '0',
		    'padding' 	: '0 3%',
		    'list-style': 'outside none none'
		});

		this.navItems = [];

		this.loadItems = function(items) {
			for(var i = 0; i < items.length; i++) {
				this.navItems.push(new NavigationItem(items[i]));
			}
		}
		
	}
	Navigation.prototype = new HTMLBuilder();
	Navigation.prototype.constructor = Navigation;


	jQuery('#jbookmark-container').remove();
	var storage = new Storage();
	var container = new Container();
	var navigation = new Navigation();

	//jQuery('#HC-menu').on('click',function(){
		storage.save();
	//})

	//navigation.loadItems(storage.retrieve());



	var items = [];

	for(var i =0; i < 18; i++) {
		items.push({
			url: "http://www.healthcentral.com/adhd/cf/slideshows/10-signs-adhd-school?ic=help",
		    image: "http://www.healthcentral.com/sites/www.healthcentral.com/files/ADDorADHD_0.jpg",
		    title: "10 Signs of ADHD in School - ADHD",
		    content: "Even though ADHD is not a learning disability, it might greatly impact your child’s learning and..."
		})
	}
	navigation.loadItems(items);

})(jQuery)




// init varibales
var container_height = jQuery('#jbookmark-container').height();
var item_height 	 = jQuery('.nav-item').height();
var margin 			 = 20;
var item_objects 	 = [];


// build array of elements
var id = 1;
var zIndex_length = parseInt(jQuery('.nav-item').length);
jQuery('.nav-item').each(function(){
	jQuery(this).attr('id','jbookmark-' + id);
	jQuery(this).css('zIndex',zIndex_length);
	item_objects.push({
		id  : id,
		top : parseInt(jQuery(this).css('top')),
		zIndex: zIndex_length
	});
	id++;
	zIndex_length--;
})


// fit number of elements
var number_item_fit_container = Math.round(container_height/(item_height + 20));
for(var i = number_item_fit_container; i < item_objects.length; i++) {
	var currElement = jQuery('#jbookmark-' + item_objects[i].id);
	var top_align = currElement.offset().top - currElement.prev().offset().top - 0.5;
	top_align = '-' + top_align + 'px';
	jQuery('#jbookmark-' + item_objects[i].id).css({'top': top_align});
}


// add default top attribute to array of elements
for(var i = 0; i < item_objects.length; i++) {
	item_objects[i].top = parseInt(jQuery('#jbookmark-' + item_objects[i].id).css('top')) * -1;
}


// scroll effect
jQuery('.jbookmark-nav').on('scroll',function() {
	var scrolltop = jQuery(this).scrollTop();
	for(var i = 0; i < item_objects.length; i++) {
		if(i < number_item_fit_container) {
			var scrollvalue = i === 0 ? 0 : 1;
			if( jQuery('#jbookmark-' + item_objects[i].id).offset().top < jQuery('#jbookmark-1').offset().top ) {
				scrollvalue =  120 + i;
			}
			else {
			//	var last_id = i === 0 ? 0 : i - 1;
			//	if(jQuery('#jbookmark-' + item_objects[last_id].id).offset().top <= jQuery('#jbookmark-1').offset().top) {
					
					scrollvalue = scrollvalue * scrolltop/3;
			//	}
			//	else {
			//		scrollvalue = scrollvalue;
			//	}
			}
			newtop =  (scrolltop - scrollvalue) + 'px';
		}
		else {
			var newtop = item_objects[i].top - scrolltop;
			if(newtop < 0) {
				//var last_id = i === 0 ? 0 : i - 3;
				//if(jQuery('#jbookmark-' + item_objects[last_id].id).offset().top <= jQuery('#jbookmark-1').offset().top) {
					newtop = ((newtop * -1) - scrolltop/3) + 'px';
				//}
			}
			else {
				newtop =  '-' + (newtop + scrolltop/3) + 'px';
			}
		}
		jQuery('#jbookmark-' + item_objects[i].id).css('top',newtop);
	}
})

