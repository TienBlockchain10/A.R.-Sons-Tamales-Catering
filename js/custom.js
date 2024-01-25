
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
	updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalCount;
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear the cart display
    cartItemsContainer.innerHTML = '';
    let total = 0;

     // Add items to the cart display with a delete button
	 cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="deleteItemFromCart(${index})" class="delete-item-btn">Delete</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update the total
    cartTotal.textContent = `$${total.toFixed(2)}`; // Converts to string with two decimal places
}





function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartCount();
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    cart = [];
    updateCartDisplay();
    updateCartCount();
    console.log("Cart cleared");
}

// document.addEventListener('DOMContentLoaded', function() {
//     loadCart();

//     document.querySelectorAll('.add-to-cart-btn').forEach(button => {
//         button.addEventListener('click', function() {
//             addToCart(this);
//         });
//     });

//     const checkoutForm = document.getElementById('checkout-form');
//     if (checkoutForm) {
//         checkoutForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const orderDetailsInput = document.getElementById('order-details');
//             orderDetailsInput.value = JSON.stringify(cart);
//             console.log("Submitting order:", cart);

//             // Here you would send the form data using Fetch or another AJAX method
//             fetch('https://formspree.io/f/mqkreeky', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     order: cart,
//                     name: document.getElementById('name').value,
//                     email: document.getElementById('email').value,
//                     phone: document.getElementById('phone').value
//                 }),
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Success:', data);
//                 clearCart(); // Clear the cart after successful form submission
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var modal = document.getElementById("menu-item-modal");
    var cartModal = document.getElementById("cartModal");
  
    // Get the button that opens the modal
    var btns = document.getElementsByClassName("add-to-cart-btn");
    var cartBtn = document.getElementById("cart-icon");
  
    // Get the <span> elements that close the modals
    var span = document.getElementsByClassName("close-modal")[0];
    var cartSpan = document.getElementsByClassName("close")[0]; // Make sure this class is correct
  
    // Get the button inside the modal that should also close the modal
    var addToCartButton = document.getElementById("add-to-cart-modal");
  
    // Logic for opening the item modal
    Array.from(btns).forEach(function(btn) {
      btn.onclick = function() {
        var itemName = this.getAttribute('data-name');
        document.getElementById("modal-item-name").textContent = itemName;
        modal.style.display = "block";
      }
    });
  
    // Logic for closing the item modal
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    addToCartButton.onclick = function() {
      modal.style.display = "none";
    }
  
    // Logic for opening the cart modal
    cartBtn.onclick = function() {
      cartModal.style.display = "block";
    }
  
    // Logic for closing the cart modal
    cartSpan.onclick = function() {
      cartModal.style.display = "none";
    }
  
    // General logic for closing modals when clicking outside
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
      if (event.target == cartModal) {
        cartModal.style.display = "none";
      }
    }
    loadCart();
	updateCartDisplay();

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            addToCart(this);
        });
    });

    const checkoutForm = document.getElementById('checkout-form');
    const statusMessage = document.getElementById('status-message'); // Ensure you have a status message element in your HTML

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Prepare the form data
            const formData = {
                order: cart,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                info: document.getElementById('info').value
            };

            // Send the form data
            fetch('https://formspree.io/f/mqkreeky', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // or 'response.text()' if the response is not JSON
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                console.log('Success:', data);
                // Update the UI to show a success message
                statusMessage.textContent = "Thank you for your order! Your Tamales will be ready for pickup soon!";
                statusMessage.className = "success"; // Add a 'success' class for styling if desired

                clearCart(); // Clear the cart after successful form submission
				updateCartDisplay(); // Update cart display to show empty cart
                updateCartCount(); // Update the cart count to zero
                // Optionally, redirect to a thank-you page
                // window.location.href = 'thank-you.html';
            })
            .catch((error) => {
                console.error('Error:', error);
                // Update the UI to show an error message
                statusMessage.textContent = "There was a problem with your submission. Please try again.";
                statusMessage.className = "error"; // Add an 'error' class for styling if desired
            });
        });
    }
});


// Function to delete an item from the cart
function deleteItemFromCart(itemIndex) {
    cart.splice(itemIndex, 1); // Remove the item from the cart array
    saveCart(); // Save the updated cart to local storage
    updateCartDisplay(); // Update the cart display
    updateCartCount(); // Update the cart count
}










