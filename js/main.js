(function($) {
"use strict";
	
	// Portfolio subpage filters
	function portfolio_init() {
		var portfolio_grid = $('#portfolio_grid'),
			portfolio_filter = $('#portfolio_filters');
			
		if (portfolio_grid) {

			portfolio_grid.shuffle({
				speed: 450,
				itemSelector: 'figure'
			});

			$('.site-main-menu').on("click", "a", function (e) {
				portfolio_grid.shuffle('update');
			});


			portfolio_filter.on("click", ".filter", function (e) {
				portfolio_grid.shuffle('update');
				e.preventDefault();
				$('#portfolio_filters .filter').parent().removeClass('active');
				$(this).parent().addClass('active');
				portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
			});

		}
	}
	// /Portfolio subpage filters

	// Contact form validator
	$(function () {

		$('#contact-form').validator();

		$('#contact-form').on('submit', function (e) {
			if (!e.isDefaultPrevented()) {
				var url = "https://xeno.com.my/elmyrockers.github.io/contact_form.php";
                // var url = "http://localhost/resume_form/contact_form.php";

				console.log( $(this).serialize() );

				$.ajax({
					type: "POST",
					url: url,
					data: $(this).serialize(),
					dataType: 'json',
					success: function (data)
					{
						console.log( 'Response:' );
						console.log( data );
						// console.log( data )
						var messageAlert = 'alert-' + data.type;
						var messageText = data.message;

						var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
						if (messageAlert && messageText) {
							$('#contact-form').find('.messages').html(alertBox);
							$('#contact-form')[0].reset();
						}
					}
				});
				return false;
			}
		});
	});
	// /Contact form validator

	// Hide Mobile menu
	function mobileMenuHide() {
		var windowWidth = $(window).width();
		if (windowWidth < 1024) {
			$('#site_header').addClass('mobile-menu-hide');
		}
	}
	// /Hide Mobile menu
	
	// Custom scroll
	function customScroll() {
		var windowWidth = $(window).width();
		if (windowWidth > 991) {
			// Custom Subpage Scroll
			$(".pt-page").mCustomScrollbar({
				scrollInertia: 8
			});

			// Custom Header Scroll
			$("#site_header").mCustomScrollbar({
				scrollInertia: 8
			});
		} else {
			$(".pt-page").mCustomScrollbar('destroy');

			$("#site_header").mCustomScrollbar('destroy');
		}
	}
	// /Custom scroll

	//On Window load & Resize
	$(window)
		.on('load', function() { //Load
			// Animation on Page Loading
			$(".preloader").fadeOut("slow");

			// initializing page transition.
			var ptPage = $('.subpages');
			if (ptPage[0]) {
				PageTransitions.init({
					menu: 'ul.site-main-menu',
				});
			}

			customScroll();
		})
		.on('resize', function() { //Resize
			mobileMenuHide();
			 
			customScroll();
		});


	// On Document Load
	$(document).on('ready', function() {
		// Initialize Portfolio grid
		var $portfolio_container = $("#portfolio_grid");

		$portfolio_container.imagesLoaded(function () {
			setTimeout(function(){
				portfolio_init(this);
			}, 500);
		});

		// Portfolio hover effect init
		$(' #portfolio_grid > figure > a ').each( function() { $(this).hoverdir(); } );

		// Mobile menu
		$('.menu-toggle').on("click", function (event) {
			$('#site_header').toggleClass('mobile-menu-hide');
		});

		// Mobile menu hide on main menu item click
		$('.site-main-menu').on("click", "a", function (e) {
			mobileMenuHide();
		});

		// Testimonials Slider
		$(".testimonials.owl-carousel").owlCarousel({
			nav: true, // Show next/prev buttons.
			items: 3, // The number of items you want to see on the screen.
			loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
			navText: false,
			margin: 10,
			responsive : {
				// breakpoint from 0 up
				0 : {
					items: 1,
				},
				// breakpoint from 480 up
				480 : {
					items: 1,
				},
				// breakpoint from 768 up
				768 : {
					items: 2,
				},
				1200 : {
					items: 3,
				}
			}
		});

		// Text rotation
		$('.text-rotation').owlCarousel({
			loop: true,
			dots: false,
			nav: false,
			margin: 10,
			items: 1,
			autoplay: true,
			autoplayHoverPause: false,
			autoplayTimeout: 3800,
			animateOut: 'zoomOut',
			animateIn: 'zoomIn'
		});

		// Lightbox init
		$('.lightbox').magnificPopup({
			type: 'image',
			removalDelay: 300,

			// Class that is added to popup wrapper and background
			// make it unique to apply your CSS animations just to this exact popup
			mainClass: 'mfp-fade',
			image: {
				// options for image content type
				titleSrc: 'title',
				gallery: {
					enabled: true
				},
			},

			iframe: {
				markup: '<div class="mfp-iframe-scaler">'+
						'<div class="mfp-close"></div>'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						'<div class="mfp-title mfp-bottom-iframe-title"></div>'+
					  '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

				patterns: {
					youtube: {
					  index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

					  id: 'v=', // String that splits URL in a two parts, second part should be %id%
					  // Or null - full URL will be returned
					  // Or a function that should return %id%, for example:
					  // id: function(url) { return 'parsed id'; }

					  src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
					},
					vimeo: {
					  index: 'vimeo.com/',
					  id: '/',
					  src: '//player.vimeo.com/video/%id%?autoplay=1'
					},
					gmaps: {
					  index: '//maps.google.',
					  src: '%id%&output=embed'
					}
				},

				srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
			},

			callbacks: {
				markupParse: function(template, values, item) {
				 values.title = item.el.attr('title');
				},
				close:function(){
					// console.log( 'lightbox close' );
				}
			},
		});

		$('.ajax-page-load-link').magnificPopup({
			type: 'ajax',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true
			}
		});

		$('.tilt-effect').tilt({

		});

		// $(function(){
			// $(document).ready(function() {
				// var backgroundAudio = new Audio( 'media/8-bit-battle.mp3' );

				// var backgroundAudio = new Audio( 'media/RWC6QZU-game-loop.mp3' );
				// var slideAudio = new Audio( 'media/ENFVGH9-jump-effect-sound-1.mp3' );
				// var slideAudio = new Audio( 'media/U5SLXCT-digital-sting-glitch.mp3' );
				// var slideAudio = new Audio( 'media/SAELU8Y-quick-glitch-button.mp3' );
				var slideAudio = new Audio( 'media/WWVLEYR-robotic-lifeforms-2-computer-tiny-glitch-data-erro.mp3' );
				// var closeSlideAudio = new Audio( 'media/GPU8Q8F-robotic-lifeforms-2-computer-tiny-glitch-data-erro.mp3' );
				
				// var mouseenterAudio = new Audio( 'media/95DQGMX-kids-game-menu-ui-slide-02.mp3' );
				// var clickAudio = new Audio( 'media/2VJDQSW-ambient-game-menu-resonator-synth-confirm-1.mp3' );
				var portfolioAudio = new Audio( 'media/QYPSD9X-cartoon-hi-tech-device-notification.mp3' );
				// var photoAudio = new Audio( 'media/QXZ24FL-cartoon-characters-saying-hi-hello.mp3' );
				var photoAudio = new Audio( 'media/cartoon_girl_hi.mp3' );
				// var takeYourSeatAudio = new Audio( 'media/MLXK5PU-please-take-your-seats.mp3' );
				var yourAttentionAudio = new Audio( 'media/announcer_saying_your_attention_please_2.mp3' );
				var yourCallAudio = new Audio( 'media/XHEAYT6-voice-clip-50242.mp3' );
				// var pleaseAudio = new Audio( 'media/2S7TZPV-terrifying-please-no-scream.mp3' );
				var pleaseAudio = new Audio( 'media/terrifying_please_no_scream_2.mp3' );
				function replay( audio ) {
					audio.pause();
					audio.currentTime = '';
					audio.play();
				}

				var currentMidiURL = '';
				var currentMidiDuration = 0;
				var n = 0;
				function play_midi_in_loop() {
					MIDIjs.play( currentMidiURL );
					setTimeout( play_midi_in_loop, (currentMidiDuration+1)*1000 );
					n++;
					console.log( 'test:'+n );
				}
				// $( 'body' ).click(function(){
				// 	backgroundAudio.loop = true;
				// 	backgroundAudio.volume = 0.9;
				// 	// backgroundAudio.play();
				// });

				$( 'body' ).one('click',(function(){
					replay( yourAttentionAudio );

					// currentMidiURL = 'media/midi/billie_jean.mid';
					currentMidiURL = 'media/midi/ninja_gaiden_I-4-2.mid';
					// currentMidiDuration = 283;
					currentMidiDuration = 135;
					// play_midi_in_loop();
				}));
				$( 'section[data-id=contact]' ).one('mouseenter',(function(){
					replay( yourCallAudio );
				}));
				$( 'ul#nav a' ).click(function(){
					// replay( clickAudio );
					replay( portfolioAudio );
				});
				$( 'ul#nav li,ul.social-links li,a.button' ).mouseenter(function(){
					// replay( mouseenterAudio );
					replay( slideAudio );
				});
				$( 'a.repo' ).click(function(){
					replay( pleaseAudio );
					// play( clickAudio );
					// console.log( this );
				});
				$( 'div#portfolio_grid figure' ).click(function(){
					replay( portfolioAudio );
				});
				$( 'div#portfolio_grid figure' ).mouseenter(function(){
					// slideAudio.volume = 1.0;
					replay( slideAudio );
				});
				// $( 'button.mfp-close' ).click(function(){
				// 	console.log( closeSlideAudio );
				// 	replay( closeSlideAudio );
				// });
				
				$( '.my-photo-block' ).mouseenter(function(){
					replay( photoAudio );
				});
			// });
		// });

	});

})(jQuery);
