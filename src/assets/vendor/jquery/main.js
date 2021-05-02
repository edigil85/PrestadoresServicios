/**

	FILE NAME: 	MAIN.JS

	APARTADOS:
		- 1°: COACH MARK SCRIPT
		- 2°: INCREASING FONT SCRIPT
		- 3°: SPEECH SCRIPT

**/
jQuery(document).ready(function($){

	/** ==== 1° COACH MARK SCRIPT ==== **/
	//check if a .cd-tour-wrapper exists in the DOM - if yes, initialize it
	$('.cd-tour-wrapper').exists() && initTour();

	function initTour() {
		var tourWrapper = $('.cd-tour-wrapper'),
			tourSteps = tourWrapper.children('li'),
			stepsNumber = tourSteps.length,
			coverLayer = $('.cd-cover-layer'),
			tourStepInfo = $('.cd-more-info'),
			tourTrigger = $(window);
			tourStep = $('#cd-tour-trigger');

		//create the navigation for each step of the tour
		createNavigation(tourSteps, stepsNumber);

		tourStep.on('click', function() {
      if (!tourWrapper.hasClass('active')) {
        tourWrapper.addClass('active');
        showStep(tourSteps.eq(0), coverLayer);
      }
    });

		tourTrigger.on('load', function(){
			//start tour
			if(!tourWrapper.hasClass('active')) {
				//in that case, the tour has not been started yet
				tourWrapper.addClass('active');
				showStep(tourSteps.eq(0), coverLayer);
			}
		});

		//change visible step
		tourStepInfo.on('click', '.cd-prev', function(event){
			//go to prev step - if available
			( !$(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'prev');
		});
		tourStepInfo.on('click', '.cd-next', function(event){
			//go to next step - if available
			( !$(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'next');
		});

		//close tour
		tourStepInfo.on('click', '.cd-close', function(event){
			closeTour(tourSteps, tourWrapper, coverLayer);
		});

		//detect swipe event on mobile - change visible step
		tourStepInfo.on('swiperight', function(event){
			//go to prev step - if available
			if( !$(this).find('.cd-prev').hasClass('inactive') && viewportSize() == 'mobile' ) changeStep(tourSteps, coverLayer, 'prev');
		});
		tourStepInfo.on('swipeleft', function(event){
			//go to next step - if available
			if( !$(this).find('.cd-next').hasClass('inactive') && viewportSize() == 'mobile' ) changeStep(tourSteps, coverLayer, 'next');
		});

		//keyboard navigation
		$(document).keyup(function(event){
			if( event.which=='37' && !tourSteps.filter('.is-selected').find('.cd-prev').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'prev');
			} else if( event.which=='39' && !tourSteps.filter('.is-selected').find('.cd-next').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'next');
			} else if( event.which=='27' ) {
				closeTour(tourSteps, tourWrapper, coverLayer);
			}
		});
	}

	function createNavigation(steps, n) {
		var tourNavigationHtml = '<div class="cd-nav"><span><b class="cd-actual-step">1</b> of '+n+'</span><ul class="cd-tour-nav"><li><a role="button" class="btn btn-danger btn-sm cd-close">Ver más tarde</button></li><li><a role="button" class="btn btn-secondary btn-sm cd-prev">&#171; Anterior</a></li><li><a role="button" class="btn btn-secondary btn-sm cd-next">Siguiente &#187;</button></li></ul></div><a href="#0" class="cd-close">Close</a>';

		steps.each(function(index){
			var step = $(this),
				stepNumber = index + 1,
				nextClass = ( stepNumber < n ) ? '' : 'inactive',
				prevClass = ( stepNumber == 1 ) ? 'inactive' : '';
			var nav = $(tourNavigationHtml).find('.cd-next').addClass(nextClass).end().find('.cd-prev').addClass(prevClass).end().find('.cd-actual-step').html(stepNumber).end().appendTo(step.children('.cd-more-info'));
		});
	}

	function showStep(step, layer) {
		step.addClass('is-selected').removeClass('move-left');
		smoothScroll(step.children('.cd-more-info'));
		showLayer(layer);

		if ($('.cd-single-step:first-child').hasClass('is-selected')) {
			$("#cd-tour-trigger i").css({
				'position': 'relative',
				'color': '#ffffff',
				'z-index': '11'
			});
			$('#header nav.top-menu').css('z-index', '0');
			$('ul.cd-tour-nav li:last-child a').removeClass('d-none');
		} else if ($('.cd-single-step:nth-of-type(2)').hasClass('is-selected')) {
			$("#cd-tour-trigger img").attr("src", "images/nav-step.svg").css({
				'position': 'relative',
				'z-index': '0'
			});
			$("#cd-tour-trigger i").css({
				'position': 'relative',
				'color': 'inherit',
				'z-index': '0'
			});
			$('#header nav.top-menu').css('z-index', '11');
			$('#main-banner').css({
				'position': 'relative',
				'z-index': '0'
			});
		} else if ($('.cd-single-step:nth-of-type(3)').hasClass('is-selected')) {
			$('#header nav.top-menu').css('z-index', '0');
			$('#main-banner').css({
				'position': 'relative',
				'z-index': '11'
			});
			$('.service-section').css({
				'position': 'relative',
				'z-index': '0'
			});
			$("html").animate({
        scrollTop: $("#header .top-menu").offset().top
    	}, 'slow');
		} else if ($('.cd-single-step:nth-of-type(4)').hasClass('is-selected')) {
			$('#main-banner').css({
				'position': 'relative',
				'z-index': '0'
			});
			$('.service-section').css({
				'position': 'relative',
				'z-index': '11'
			});
			$('.info-section').css({
				'position': 'relative',
				'z-index': '0'
			});

			$('ul.cd-tour-nav li:first-child a').text('Ver más tarde').addClass('toTop');
			$('ul.cd-tour-nav li:last-child a').removeClass('d-none');

			$("html").animate({
        scrollTop: $(".service-section").offset().top
    	}, 'slow');
		} else if ($('.cd-single-step:nth-of-type(5)').hasClass('is-selected')) {
			$('.service-section').css({
				'position': 'relative',
				'z-index': '0'
			});
			$('.info-section').css({
				'position': 'relative',
				'z-index': '11'
			});
			$('ul.cd-tour-nav li:first-child a').text('Finalizar').addClass('toTop');
			$('ul.cd-tour-nav li:last-child a').addClass('d-none');

			$("a.toTop").on("click", function() {
    		$("html").animate({ scrollTop: 0 }, "slow");
			});
		} /** else if ($('.cd-single-step:last-child').hasClass('is-selected')) {
			+$('.document-section').css({
				'position': 'relative',
				'z-index': '0'
			});
			$('.info-section').css({
				'position': 'relative',
				'z-index': '11'
			});

			$('ul.cd-tour-nav li:first-child a').text('Finalizar').addClass('toTop');
			$('ul.cd-tour-nav li:last-child a').addClass('d-none');

			$("a.toTop").on("click", function() {
    		$("html").animate({ scrollTop: 0 }, "slow");
			});
		} **/
	}

	function smoothScroll(element) {
		(element.offset().top < $(window).scrollTop()) && $('body,html').animate({'scrollTop': element.offset().top}, 100);
		(element.offset().top + element.height() > $(window).scrollTop() + $(window).height() ) && $('body,html').animate({'scrollTop': element.offset().top + element.height() - $(window).height()}, 100);
	}

	function showLayer(layer) {
		layer.addClass('is-visible').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			layer.removeClass('is-visible');
		});
	}

	function changeStep(steps, layer, bool) {
		var visibleStep = steps.filter('.is-selected'),
			delay = (viewportSize() == 'desktop') ? 300: 0;
		visibleStep.removeClass('is-selected');

		(bool == 'next') && visibleStep.addClass('move-left');

		setTimeout(function(){
			( bool == 'next' )
				? showStep(visibleStep.next(), layer)
				: showStep(visibleStep.prev(), layer);
		}, delay);
	}

	function closeTour(steps, wrapper, layer) {
		steps.removeClass('is-selected move-left');
		wrapper.removeClass('active');
		layer.removeClass('is-visible');
	}

	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.cd-tour-wrapper'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}
	/** ==== END COAH MARK SCRIPT ==== **/

	/** ==== 2° INCREASING FONT SCRIPT ==== **/
	var $affectedElements = $("p, a, span, small, h6, h5"); // Can be extended, ex. $("div, p, span.someClass")

	$affectedElements.each( function(){
	  var $this = $(this);
	  $this.data("orig-size", $this.css("font-size") );
	});

	$("#btn-increase").click(function(){
	  changeFontSize(1);
	})

	$("#btn-decrease").click(function(){
	  changeFontSize(-1);
	})

	$("#btn-orig").click(function(){
	  $affectedElements.each( function(){
	        var $this = $(this);
	        $this.css( "font-size" , $this.data("orig-size") );
	   });
	})

	function changeFontSize(direction){
	    $affectedElements.each( function(){
	        var $this = $(this);
	        $this.css( "font-size" , parseInt($this.css("font-size"))+direction );
	    });
	}
	/** ==== END INCREASING SCRIPT ==== **/

	/** ==== 3° SPEECH SCRIPT ==== **/
	function activeSpeech() {
		$(".speech a").attr("href", "#");
		$(".speech a").attr("class", "nav-link enable py-0");
		$(".speech a i").attr("class", "fas fa-volume-up ml-2");

		var imported = document.createElement('script');
		imported.src = 'vendor/jquery/getting-speech.js';
		document.head.appendChild(imported);

		$.getScript('vendor/jquery/getting-speech.js', function () {
			/*Para los contenidos de los links*/
			$('a').mouseover(function () {
				responsiveVoice.speak($(this).text(), "Spanish Latin American Female");
			});


			$('p, span, small, h1, h2, h3, h4, h5, h6').mouseover(function () {
				responsiveVoice.speak($(this).text(), "Spanish Latin American Female");
			});

			/*Para los alt de las imagenes*/
			$('img').mouseover(function () {
				responsiveVoice.speak($(this).attr("alt"), "Spanish Latin American Female");
			});

			/*Para texto contenido dentro de las etiquetas*/
			$('#footer-menu h3, #footer-contact h3').mouseover(function () {
				responsiveVoice.speak($(this).html(), "Spanish Latin American Female");
			});
		});
	}

	function desactiveSpeech() {
		responsiveVoice.cancel();
		location.reload();

		$(".speech a").attr("href", "#");
		$(".speech a").attr("class", "nav-link disable py-0");
		$(".speech a i").attr("class", "fas fa-volume-mute ml-2");
	}

	$('.speech a').click(function(){
	  if ($(this).hasClass('disable')) {
	    activeSpeech();
	    return false;
	  } else {
	    desactiveSpeech();
	    return false;
	  }
	});

	$('#sound-mov').click(function(){
	  if ($(this).hasClass('disable')) {
	    activeSpeech();
	    return false;
	  } else {
	    desactiveSpeech();
	    return false;
	  }
	});
	/** ==== END SPEECH SCRIPT ==== **/

	$('#show-sublist').click(function() {
		$('.banner-menu div.list-group-item').toggle();
	})

	/** -- TIBOT FORM -- **/
	'use strict';
	window.addEventListener('load', function() {
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.getElementsByClassName('needs-validation');
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('submit', function(event) {
					if (form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
						console.log('No funcionaaaaa');
					} else {
						$('form.needs-validation').addClass('d-none');
						$('.bottom-bar').addClass('d-block');
						$('.outgoing_full').removeClass('d-none');
						$('.incoming_full').removeClass('d-none');
						console.log('Funcionaaaaa');
					}
					form.classList.add('was-validated');
				}, false);
			});
	}, false);

	/** -- TIBOT SCROLLBAR -- **/
	let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	let isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	let scrollbarDiv = document.querySelector('.scrollbar');
	if (!isChrome && !isSafari) {
		scrollbarDiv.innerHTML = 'You need Webkit browser to run this code';
	}

	$('#exit').click(function() {
		$('.middle-modal').removeClass('d-none');
		$('.middle-box').css('overflow', 'hidden');
	});

	$('.btn-exit').click(function() {
		$('.middle-modal').addClass('d-none');
		$('.tibot-chat').addClass('d-none');
		$('.tibot-button').removeClass('d-none');
		$('.middle-box').css('overflow', 'auto');
	});

	$('.btn-back').click(function() {
		$('.middle-modal').addClass('d-none');
		$('.middle-box').css({
			'height': '77%',
			'overflow': 'auto'
		});
	});

	$('.tibot-button').click(function() {
		$('.tibot-chat').removeClass('d-none');
		$(this).addClass('d-none');
	});

	$('#minus').click(function() {
		$('.tibot-chat').addClass('d-none');
		$('.tibot-button').removeClass('d-none');
	});

});

//check if an element exists in the DOM
jQuery.fn.exists = function(){ return this.length > 0; }
