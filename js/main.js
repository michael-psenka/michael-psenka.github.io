(function ($) {
	"use strict";

	$(window).on('load', function () {
		$(".preloader").fadeOut("slow", function () {
			$(".preloader-left").addClass("slide-left");
		});

		$('#lionhero').owlCarousel({
			animateOut: 'fadeOut',
			nav: true,
			navText: [
				'<i class="ion-ios-arrow-thin-left"></i>',
				'<i class="ion-ios-arrow-thin-right"></i>'
			],
			items: 1,
			navSpeed: 400,
			loop: true,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
		});

		$('#liontextslider').owlCarousel({
			nav: false,
			items: 1,
			navSpeed: 400,
			loop: true,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
		});

		$('#liontestimonial').owlCarousel({
			nav: true,
			navText: [
				'<i class="ion-ios-arrow-thin-left"></i>',
				'<i class="ion-ios-arrow-thin-right"></i>'
			],
			items: 1,
			navSpeed: 400,
			loop: true,
			autoplay: true,
			autoplayTimeout: 4000,
			autoplayHoverPause: true,
		});
	});

	$('.portfolio-block, .menu-item').on('click', function () {

		//Portfolio masonry
		var $container = $('#portfolio-container');
		$container.isotope({
			masonry: {
				columnWidth: '.portfolio-item'
			},
			itemSelector: '.portfolio-item'
		});
		$('#filters').on('click', 'li', function () {
			$('#filters li').removeClass('active');
			$(this).addClass('active');
			var filterValue = $(this).attr('data-filter');
			$container.isotope({ filter: filterValue });
		});

	});

	// Typing Animation (Typed.js)
	$('#element').typed({
		strings: ["UX, UI Designer", "Web App Developer", "Social Animal!"],
		typeSpeed: -50,
		loop: true,
		startDelay: 500,
		backDelay: 3000,
		contentType: 'html',
	});

	//Video background
	$(".player").mb_YTPlayer({
		containment: '#video-wrapper',
		mute: true,
		showControls: false,
		quality: 'default',
		startAt: 5
	});

	//Portfolio Modal
	$(document).on('click', '.open-project', function () {
		var projectUrl = $(this).attr("href");
		$('.inline-menu-container').removeClass('showx');
		$('.sidebar-menu').addClass('hidex');
		$('.content-blocks.pop').addClass('showx');
		$('.content-blocks.pop section').load(projectUrl + ' .load-data > *');
		return false;
	});

	//Blog post Modal
	$('.open-post').on('click', function () {
		var postUrl = $(this).attr("href");
		$('.inline-menu-container').removeClass('showx');
		$('.sidebar-menu').addClass('hidex');
		$('.content-blocks.pop').addClass('showx');
		$('.content-blocks.pop section').load(postUrl);
		return false;
	});

	//On Click Open Menu Items
	$('.menu-block, .menu-item').on('click', function () {
		$('.name-block').addClass('reverse');
		$('.name-block-container').addClass('reverse');
		$('.menu-blocks').addClass('hidex');
		$('.inline-menu-container').addClass('showx');
		$('.inline-menu-container.style2').addClass('dark');
	});
	//On Click Open About/Resume Block
	$('.about-block, .menu-item.about').on('click', function () {
		$('.content-blocks').removeClass('showx');
		$('.content-blocks.about').addClass('showx');
		$('.menu-item').removeClass('active');
		$('.menu-item.about').addClass('active');
	});
	//On Click Open Portfolio Block
	$('.portfolio-block, .menu-item.portfolio').on('click', function () {
		$('.content-blocks').removeClass('showx');
		$('.content-blocks.portfolio').addClass('showx');
		$('.menu-item').removeClass('active');
		$('.menu-item.portfolio').addClass('active');
	});
	//On Click Open Blog Block
	$('.blog-block, .menu-item.blog').on('click', function () {
		$('.content-blocks').removeClass('showx');
		$('.content-blocks.blog').addClass('showx');
		$('.menu-item').removeClass('active');
		$('.menu-item.blog').addClass('active');
	});
	//On Click Open Contact Block
	$('.contact-block, .menu-item.contact').on('click', function () {
		$('.content-blocks').removeClass('showx');
		$('.content-blocks.contact').addClass('showx');
		$('.menu-item').removeClass('active');
		$('.menu-item.contact').addClass('active');
	});

	//On Click Close Blocks
	$('#close').on('click', function () {
		$('.name-block').removeClass('reverse');
		$('.name-block-container').removeClass('reverse');
		$('.content-blocks').removeClass('showx');
		$('.menu-blocks').removeClass('hidex');
		$('.inline-menu-container').removeClass('showx');
		$('.menu-item').removeClass('active');
	});
	//On Click Close Blog Post And Project Details
	$('#close-pop').on('click', function () {
		$('.content-blocks.pop').removeClass('showx');
		$('.sidebar-menu').removeClass('hidex');
		$('.inline-menu-container').addClass('showx');
		$('.content-blocks.pop section').empty();
	});

	$('.menu-block, .menu-item, #close').on('click', function () {
		$('.content-blocks').animate({ scrollTop: 0 }, 800);
	});

	//Function for 'Index-Menu2.html'
	$('#home').on('click', function () {
		$('.content-blocks').removeClass('showx');
		$('.menu-item').removeClass('active');
		$(this).addClass('active');
		$('.inline-menu-container.style2').removeClass('dark');
	});

	// hidden menu code
	$('.exp-toggle').click(function (e) {
		e.preventDefault();
		var $icon = $(this).find('i');
		$icon.toggleClass('ion-chevron-down ion-chevron-up');
		$(this).closest('.hgroup').find('.edu-hidden-content').slideToggle();
	});

	// Intialize Map
	// google.maps.event.addDomListener(window, 'load', init);

	// function init() {
	// 	// Basic options for a simple Google Map
	// 	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	// 	var mapOptions = {
	// 		// How zoomed in you want the map to start at (always required)
	// 		zoom: 11,

	// 		// The latitude and longitude to center the map (always required)
	// 		center: new google.maps.LatLng(40.6700, -73.9400),

	// 		scrollwheel: false,


	// 		// How you would like to style the map.
	// 		// This is where you would paste any style found on Snazzy Maps.
	// 		styles: [{
	// 			featureType: 'all',
	// 			stylers: [{
	// 				saturation: -65
	// 			}]
	// 		}, {
	// 			featureType: 'road.arterial',
	// 			elementType: 'geometry',
	// 			stylers: [{
	// 				hue: '#00ffee'
	// 			}, {
	// 				saturation: 80
	// 			}]
	// 		}, {
	// 			featureType: 'poi.business',
	// 			elementType: 'labels',
	// 			stylers: [{
	// 				visibility: 'off'
	// 			}]
	// 		}]
	// 	};

	// 	// Get the HTML DOM element that will contain your map
	// 	// We are using a div with id="map" seen below in the <body>
	// 	var mapElement = document.getElementById('map');

	// 	// Create the Google Map using our element and options defined above
	// 	var map = new google.maps.Map(mapElement, mapOptions);

	// 	var image = 'images/map-marker.png';
	// 	// Let's also add a marker while we're at it
	// 	var marker = new google.maps.Marker({
	// 		position: new google.maps.LatLng(40.6700, -73.9400),
	// 		map: map,
	// 		icon: image,
	// 		draggable: true,
	// 		animation: google.maps.Animation.DROP
	// 	});
	// 	marker.addListener('click', toggleBounce);

	// 	function toggleBounce() {
	// 		if (marker.getAnimation() !== null) {
	// 			marker.setAnimation(null);
	// 		} else {
	// 			marker.setAnimation(google.maps.Animation.BOUNCE);
	// 		}
	// 	}
	// }
})(jQuery);

// Startup code to change names to links
window.addEventListener('load', function () {
	// Get all .publication-authors elements
	const authors = document.querySelectorAll('.publication-authors');

	// Loop through each .publication-authors element
	authors.forEach(author => {

		// Get the author names. first, convert sequences of spaces to a single space
		var names = author.innerHTML.replace(/\s\s+/g, ' ');
		// we then remove all periods and asterisks
		names = names.replace(/\.|\*/g, '');
		// finally, we then split by the comma, space
		names = names.split(', ');

		// Loop through each author name
		names.forEach(name => {

			// names with hard-coded exceptions
			if (name === 'Michael Psenka') {
				return;
			}
			else if (name == 'Mingyang Li') {
				const link = `<a href="https://thulimy.github.io/" target="_blank">${name}</a>`;
				author.innerHTML = author.innerHTML.replace(name, link);
				return;
			}
			else if (name == 'Druv Pai') {
				const link = `<a href="https://druvpai.github.io/" target="_blank">${name}</a>`;
				author.innerHTML = author.innerHTML.replace(name, link);
				return;
			}
			else if (name == 'Chih-Yuan Chiu') {
				const link = `<a href="https://people.eecs.berkeley.edu/~chihyuan_chiu/" target="_blank">${name}</a>`;
				author.innerHTML = author.innerHTML.replace(name, link);
				return;
			}
			else if (name == 'Ziyang Wu') {
				const link = `<a href="https://robinwu218.github.io/" target="_blank">${name}</a>`;
				author.innerHTML = author.innerHTML.replace(name, link);
				return;
			}
			else if (name == 'Pengyuan Zhai') {
				const link = `<a href="https://billyzz.github.io/" target="_blank">${name}</a>`;
				author.innerHTML = author.innerHTML.replace(name, link);
				return;
			}
			else if (name == 'Ryan Arbon') {
				const link = `<a href="https://www.linkedin.com/in/ryan-arbon-9b35b5150" target="_blank">${name}</a>`;
				author.innerHTML = author.innerHTML.replace(name, link);
				return;
			}
			else if (name == 'Mohammed Mannan') {
				const link = `<a href="https://www.google.com/search?q=mohammed+mannan+nyu&btnI" target="_blank">${name}</a>`;
				author.innerHTML = author.innerHTML.replace(name, link);
				return;
			}

			// format link name to lowercase, and replace space with +
			nameLink = name.toLowerCase().replace(' ', '+');
			// Create a new link element
			const link = `<a href="https://www.google.com/search?q=${nameLink}&btnI" target="_blank">${name}</a>`;

			// Replace the author name with the link
			author.innerHTML = author.innerHTML.replace(name, link);
		});
	});
});

/* * 
 * audio visualizer with html5 audio element
 *
 * v0.1.0
 * 
 * licenced under the MIT license
 * 
 * see my related repos:
 * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
 * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
 * - selected https://github.com/wayou/selected
 * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
 * 
 * reference: http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
 */

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var start = function (song_name) {
	var audio = document.getElementById(song_name);
	var ctx = new AudioContext();
	var analyser = ctx.createAnalyser();
	var audioSrc = ctx.createMediaElementSource(audio);
	// we have to connect the MediaElementSource with the analyser 
	audioSrc.connect(analyser);
	analyser.connect(ctx.destination);
	// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
	// analyser.fftSize = 64;
	// frequencyBinCount tells you how many values you'll receive from the analyser
	var frequencyData = new Uint8Array(analyser.frequencyBinCount);

	// we're ready to receive some data!
	var canvas = document.getElementById('canvas_' + song_name),
		cwidth = canvas.width,
		cheight = canvas.height - 2,
		meterWidth = 10, //width of the meters in the spectrum
		gap = 2, //gap between meters
		capHeight = 2,
		capStyle = '#fff',
		meterNum = 800 / (10 + 2), //count of the meters
		capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
	ctx = canvas.getContext('2d'),
		gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * (6 / 7));
	gradient.addColorStop(1, '#1e356e'); // bottom
	gradient.addColorStop(0.5, '#6519e6');
	gradient.addColorStop(0.1, '#5b14eb'); // top
	// loop
	function renderFrame() {
		var array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);
		var step = Math.round(array.length / meterNum); //sample limited data from the total array
		ctx.clearRect(0, 0, cwidth, cheight);
		for (var i = 0; i < meterNum; i++) {
			var value = array[i * step];
			if (capYPositionArray.length < Math.round(meterNum)) {
				capYPositionArray.push(value);
			};
			ctx.fillStyle = capStyle;
			//draw the cap, with transition effect
			if (value < capYPositionArray[i]) {
				ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
			} else {
				ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
				capYPositionArray[i] = value;
			};
			ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
			ctx.fillRect(i * 12 /*meterWidth+gap*/, cheight - value + capHeight, meterWidth, cheight); //the meter
		}
		requestAnimationFrame(renderFrame);
	}
	renderFrame();
	// audio.play();
};

var audio_players = document.getElementsByClassName('audio');

for (i = 0; i < audio_players.length; i++) {
	audio_players[i].onplay = function (event) {
		// event.target.id is name of audio element that played
		start(event.target.id);
	}
}