
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





$(document).ready(function() {
    // Your existing code for the loader, fixed menu, gallery, etc.

    // Initialize an empty cart
    let cart = [];

    // Function to open the modal with item details
    function openItemModal(button) {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        // Set the item details in the modal elements
        $('#modal-item-name').text(name);
        $('#modal-item-price').text(price);
        // Open the modal
        $('#menu-item-modal').fadeIn();
    }

    // Function to add item to cart from the modal
    // Define the function in the global scope
window.addItemToCartFromModal = function() {
    // Function code here
        const name = $('#modal-item-name').text();
        const price = parseFloat($('#modal-item-price').text());
        const quantity = parseInt($('#modal-quantity-select').val(), 10);
        // Additional options can be added here, like cheese choice, spicy option, etc.

         // Create an item object
         const item = {
            name: name,
            price: price,
            quantity: quantity
        };

        // Check if the item already exists in the cart
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push(item);
        }

        // Update cart display and save to local storage
        updateCartDisplay();
        saveCart();

        // Close the modal
        $('#menu-item-modal').fadeOut();
    }

     // Bind the addItemToCartFromModal to the button inside the modal
    $('#add-to-cart-modal').on('click', addItemToCartFromModal);

    // Function to update the cart display
    function updateCartDisplay() {
        // Update the cart UI with the new cart contents
        // This will depend on how you want to display the items in the cart.
    }

    function showCartModal() {
        $('#cartModal').fadeIn();
    }

    // Function to hide the cart modal
    function hideCartModal() {
        $('#cartModal').fadeOut();
    }

    // Attach event handler to the cart icon for opening the cart modal
    $('#cart-icon').on('click', function() {
        showCartModal();
    });

    // Attach event handler to the close button of the cart modal
    $('#cartModal .close').on('click', function() {
        hideCartModal();
    });

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        }
    }

      // Update the cart display function to reflect new items
      function updateCartDisplay() {
        // Assuming you have some function to update the cart display
        // Clear existing items
        $('#cart-items').empty();

        // Add new items to cart
        cart.forEach(function(item, index) {
            const itemElement = `
                <div class="cart-item">
                    ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                    <button onclick="deleteItemFromCart(${index})" class="delete-item-btn">Delete</button>
                </div>
            `;
            $('#cart-items').append(itemElement);
        });

        // Update the total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        $('#cart-total').text(total.toFixed(2));
    }

    // Attach event handlers
    $('.add-to-cart-btn').on('click', function(event) {
        event.preventDefault();
        openItemModal(this);
    });

    $('#add-to-cart-modal').on('click', function() {
        addItemToCartFromModal();
    });

    $('.close-modal').on('click', function() {
        $('#menu-item-modal').fadeOut();
    });

    // Function to delete an item from the cart
    window.deleteItemFromCart = function(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartDisplay();
        // ... Other necessary updates after item deletion
    }

    // Call loadCart and updateCartDisplay when the page is ready
    loadCart();
    updateCartDisplay();
});



	
}(jQuery));






