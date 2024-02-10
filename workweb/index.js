// Get the modal
const modal = document.getElementById('modal');

// Get the button that opens the modal
const btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
const inputText = document.querySelector("input[name='username']");
let text= document.createElement("p");
btn.onclick = function() {
  modal.style.display = "block";
  text.innerHTML=`Hey  <strong>${inputText.value}</strong>, buckle up!  You're officially logged in for Team Vibhav's epic Cloud Computing Workshop.

  `
  // Add a class to the paragraph element
  text.classList.add("modal-text");
  document.querySelector('.modal-content').appendChild(text);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to handle explore button click
btn.addEventListener("click", function() {
    // Check if the input text box has any value
    if (inputText.value.trim() !== "") {
        // If the input box is not empty, display the modal
        modal.style.display = "block";
    } else {
        // If the input box is empty, show an alert message
        alert("Please enter your name before exploring!");
        modal.style.display = "none";
        return;
    }
});


document.addEventListener("DOMContentLoaded", function () {
  const numStars = 100;
  const starsContainer = document.getElementById("stars");

  // Create stars
  for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      starsContainer.appendChild(star);

      // Randomize position
      const xy = Math.random() * 100;
      const duration = Math.random() * 5 + 2;
      const delay = Math.random() * 2;

      // Apply styles
      star.style.width = star.style.height = `${Math.random() * 3}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
  }
});
