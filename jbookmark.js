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
			var img = jQuery('meta[property="og:image"]').attr('content');
			return typeof(img) === 'undefined' ? 'https://pbs.twimg.com/profile_images/433002200827039744/FVMo01fi.png' : img
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


	/********** GUI Interface **********/
	function OverLay() {

		this.html('body','<div id="jbookmark"></div>');
		this.css('#jbookmark',{
			'bottom': '0px',
			'height': '1837px', 
			'left': '0px',
			'position': 'fixed', 
			'right': '0px',
			'top': '0px',
			'width': '100%',
			'zIndex': '999999999',
			'display': 'none'
		});
			
		this.html('#jbookmark','<div id="jbookmark-overlay"></div>');
		this.css('#jbookmark-overlay',{
			'background-color': 'rgb(255, 255, 255)',
			'height': '1000px',
			'opacity': '0.5',
			'width': '100%',
			'zIndex': '200'
		});

		jQuery('#jbookmark-overlay').on('click',function(){
			jQuery(this).hide();
			jQuery('#jbookmark').hide();
		})

	}
	OverLay.prototype = new HTMLBuilder();
	OverLay.prototype.constructor = OverLay;


	function Container() {
		this.html('#jbookmark','<div id="jbookmark-container"></div>');
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
	NavigationItem.prototype.constructor = NavigationItem;

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


	/********** GUI Button **********/
	function Button() {
		
		this.widthOffScreen = 0;
		this.slideInTime 	= 1000;
		this.slideOutTime 	= 1000;

		this.load = function() {
			this.create();
			this.style();
			this.slideInAfter(this.slideInTime);

		};

		this.create = function() {
			var html = '<div id="survey" style="display:none">' +
							'<div id="survey-button-overlay"></div>' + 
							'<span id="survey-close">x</span>' +
							'<p>' +
								'<a id="bookmark-page" href="#">' +
									'Bookmark this page' +
								'</a><br/>' +
								'<a id="bookmark-center" href="#">' +
									'Bookmark Center' +
								'</a>'
							'</p>' +
						'</div>';
			jQuery('body').append(html);
		};

		this.style = function() {

			jQuery('#survey').css({
				'display' 	: 'none',
				'position'	: 'fixed', 
				'zIndex'	: '999999', 
				'right'		: '0px',
				'bottom'	: '15%', 
				'height'	: 'auto', 
				'width'		: '150px',
				'padding'	: '0px 10px', 
				'background-color': 'rgb(46, 47, 47)',
				'opacity'	: '0.75',
				'border-left': '6px solid rgb(0, 0, 0)'
			});

			jQuery('#survey-button-overlay').css({
			    'cursor': 'pointer',
			    'height': jQuery('#survey').height(),
			    'position': 'fixed',
			    'right': '6px',
			    'width': '20px'
			});

			jQuery('#survey-close').css({
				'background-color': '#000',
			    'border-radius': '10px',
			    'color'		: '#fffffff',
			    'font-size'	: '12px',
			    'left'		: '-12px',
			    'padding'	: '0 6px',
			    'position'	: 'absolute',
			    'top' 		: '-8px',
			    'display' 	: 'none',
			    'cursor' 	: 'pointer'
			});

			jQuery('#survey p').css({
				'font'   : '12px/19px RalewayBold',
				'color'  : 'rgb(255, 255, 255)',
				//'cursor' : 'pointer'
			});

			jQuery('#survey span').css({
				'font' : '13px/19px RalewayBold',
				'color': 'rgb(204, 102, 0)'
			});

			this.widthOffScreen = '-' + (parseInt(jQuery('#survey').width()) + 20) + 'px';

			var right = this.widthOffScreen;
			jQuery('#survey').css('right',right);
			jQuery('#survey').show();
		};

		this.slideInAfter = function(second) {
			var that = this;
			setTimeout(function(){
				jQuery('#survey').stop().animate({right: '0px'}, 300);
				that.addClickEvent();
				that.slideOutAfter(that.slideOutTime);
			},second)
		};

		this.slideOutAfter = function(second) {
			var that = this;
			setTimeout(function(){
				jQuery('#survey').stop().animate({right: that.widthOffScreen}, 300);
				that.addMouseEvent();
			},second)
		};


		this.addMouseEvent = function() {
			var that = this;
			mouseover();
			jQuery('#survey-close').off().on('click', function(){
				jQuery(this).parent().stop().animate({ right: that.widthOffScreen }, 300, 'linear',function(){
					mouseover();
				}); 
				jQuery('#survey-close').hide();
			});

			function mouseover() {
				jQuery("#survey").mouseover(function() { 
					jQuery(this).stop().animate({ right: "0px" }, 300, 'linear', function(){
						jQuery("#survey").off();
						jQuery('#survey-close').show();
					}); 
				}).mouseout(function() { 
					//jQuery(this).stop().animate({ right: right }, 500); 
				}) 
			}
		};

		this.addClickEvent = function() {
			var that = this;
			/*jQuery('#survey p').on('click',function(){
				jQuery('#jbookmark').show();
				jQuery('#survey-close').click();
			})*/
		};

	}
	Button.prototype = new HTMLBuilder();
	Button.prototype.constructor = Button;


	jQuery('#jbookmark').remove();

	var survey = new Button();
	survey.load();


	var storage = new Storage();
	var overlay = new OverLay();
	var container = new Container();
	var navigation = new Navigation();

	

	jQuery('#bookmark-page').on('click', function(){
		storage.save();
	})

	jQuery('#bookmark-center').on('click', function(){
		jQuery('#jbookmark').show();
		jQuery('#jbookmark-overlay').show();
		scrollingEffect();
	})

	navigation.loadItems(storage.retrieve());



	/*var items = [];

	for(var i =0; i < 20; i++) {
		items.push({
			url: "http://www.healthcentral.com/adhd/cf/slideshows/10-signs-adhd-school?ic=help",
		    image: "http://www.healthcentral.com/sites/www.healthcentral.com/files/ADDorADHD_0.jpg",
		    title: "10 Signs of ADHD in School - ADHD",
		    content: "Even though ADHD is not a learning disability, it might greatly impact your child’s learning and..."
		})
	}
	navigation.loadItems(items);*/

})(jQuery)


function scrollingEffect() {

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
var number_item_fit_container = Math.floor(container_height/(item_height + margin));
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

jQuery('.jbookmark-nav').append('<li style="height:120px"></li>');

// scroll effect
jQuery('.jbookmark-nav').on('scroll',function() {
	var scrolltop = jQuery(this).scrollTop();
	for(var i = 0; i < item_objects.length; i++) {
		if(i < number_item_fit_container) {
			var scrollvalue = i === 0 ? 0 : 1;			
			scrollvalue = scrollvalue * scrolltop;
			var newtop =  (scrolltop - scrollvalue) + 'px';
		}
		else {
			var newtop = item_objects[i].top - scrolltop;
			if(newtop < 0) {
				var last_id = i - (number_item_fit_container - 1);
				if(parseInt(jQuery('#jbookmark-' + item_objects[last_id].id).offset().top) <= parseInt(jQuery('#jbookmark-' + item_objects[0].id).offset().top)) {
					newtop = '0px';
				}
				else {
					newtop = ((newtop * -1)) + 'px';
				}
			}
			else {
				var last_id =  i - (number_item_fit_container - 1);
				if(parseInt(jQuery('#jbookmark-' + item_objects[last_id].id).offset().top) <= parseInt(jQuery('#jbookmark-' + item_objects[0].id).offset().top)) {
					newtop =  '0px';
				}
				else {
					newtop =  '-' + (newtop) + 'px';
				}
			}
		}
		jQuery('#jbookmark-' + item_objects[i].id).css('top',newtop);
	}
})

}
