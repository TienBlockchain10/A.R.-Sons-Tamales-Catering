

// Get the modal
var cartModal = document.getElementById("cartModal");

// Get the button that opens the modal
var cartBtn = document.getElementById("cart-icon");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
cartBtn.onclick = function() {
  cartModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  cartModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  }
}


// Get the modal
var modal = document.getElementById("menu-item-modal");

// Get the button that opens the modal
var btns = document.getElementsByClassName("add-to-cart-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];

// Get the button inside the modal that should also close the modal
var addToCartButton = document.getElementById("add-to-cart-modal");

// When the user clicks on the button, open the modal
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    var itemName = this.getAttribute('data-name');
    document.getElementById("modal-item-name").textContent = itemName;
    modal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on the button inside the modal, close the modal
addToCartButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

