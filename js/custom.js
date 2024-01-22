
console.log("Custom.js file is loaded and running");


(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
	});
	
	/* ..............................................
    Fixed Menu
    ................................................. */
    
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});
	
	/* ..............................................
    Gallery
    ................................................. */
	
	$('#slides').superslides({
		inherit_width_from: '.cover-slides',
		inherit_height_from: '.cover-slides',
		play: 5000,
		animation: 'fade',
	});
	
	$( ".cover-slides ul li" ).append( "<div class='overlay-background'></div>" );
	
	/* ..............................................
    Map Full
    ................................................. */
	
	// $(document).ready(function(){ 
	// 	$(window).on('scroll', function () {
	// 		if ($(this).scrollTop() > 100) { 
	// 			$('#back-to-top').fadeIn(); 
	// 		} else { 
	// 			$('#back-to-top').fadeOut(); 
	// 		} 
	// 	}); 
	// 	$('#back-to-top').click(function(){ 
	// 		$("html, body").animate({ scrollTop: 0 }, 600); 
	// 		return false; 
	// 	}); 


		
	// });
	
	/* ..............................................
    Special Menu
    ................................................. */
	
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.special-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.special-list').isotope({
			itemSelector: '.special-grid'
		});
	});
	
	/* ..............................................
    BaguetteBox
    ................................................. */
	
	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});
	
	
	
	/* ..............................................
    Datepicker
    ................................................. */
	
	// $('.datepicker').pickadate();
	
	// $('.time').pickatime();

	

		
// // smooth scroll
// $(document).ready(function(){
//     var headerHeight = 70; // Height of your fixed header
//     $(".navbar .nav-link").on('click', function(event) {
//         if (this.hash !== "") {
//             event.preventDefault();
//             var hash = this.hash;

//             $('html, body').animate({
//                 scrollTop: $(hash).offset().top - headerHeight
//             }, 700, function(){
//                 // Add the hash (#) to the page url after the scroll
//                 history.pushState(null, null, hash);
//             });
//         } 
//     });
// });

	
}(jQuery));

let cart = [];

function addToCart(button) {
    console.log("Add to Cart button clicked");

    // Get the closest .gallery-single ancestor to find the .quantity-select within it
    const galleryItem = button.closest('.gallery-single');
    const quantitySelect = galleryItem.querySelector('.quantity-select');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const quantity = parseInt(quantitySelect.value, 10);
    const item = cart.find(item => item.name === name);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    console.log("Adding to cart:", name, price, quantity);
    console.log("Current cart:", cart);

    updateCartDisplay();
    saveCart();
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById('cart-display');
    cartDisplay.innerHTML = ''; // Clear the cart display
    cart.forEach(item => {
        console.log("Updating display for item:", item);
        cartDisplay.innerHTML += `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    cart = [];
    updateCartDisplay();
    console.log("Cart cleared");
}

// DOMContentLoaded event to ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadCart();

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            addToCart(this);
        });
    });

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const orderDetailsInput = document.getElementById('order-details');
            orderDetailsInput.value = JSON.stringify(cart);
            console.log("Submitting order:", cart);

            // Uncomment the line below when ready to submit to Formspree
            this.submit();
            clearCart();
        });
    }
});