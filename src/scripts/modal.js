// Handles the image modal functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get modal elements
  const modal = document.getElementById('imageModal');
  const closeModalBtn = document.getElementById('closeModal');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');
  const imageCards = document.querySelectorAll('.image-card');
  const modalImages = document.querySelectorAll('.modal-image');
  
  let currentImageId = null;
  const totalImages = modalImages.length;
  
  // Open modal when clicking on an image card
  imageCards.forEach(card => {
    card.addEventListener('click', () => {
      const imageId = card.dataset.id;
      openModal(imageId);
    });
  });
  
  // Close modal when clicking the close button
  closeModalBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside the modal content
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Navigate to previous image
  prevBtn.addEventListener('click', showPrevImage);
  
  // Navigate to next image
  nextBtn.addEventListener('click', showNextImage);
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('hidden')) {
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'ArrowLeft') {
        showPrevImage();
      } else if (event.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
  
  // Functions
  function openModal(imageId) {
    currentImageId = parseInt(imageId);
    
    // Hide all images and show the selected one
    modalImages.forEach(img => img.classList.add('hidden'));
    document.getElementById(`modal-image-${currentImageId}`).classList.remove('hidden');
    
    // Show the modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }
  
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function showPrevImage() {
    if (currentImageId > 1) {
      openModal(currentImageId - 1);
    } else {
      // Wrap around to the last image
      openModal(totalImages);
    }
  }
  
  function showNextImage() {
    if (currentImageId < totalImages) {
      openModal(currentImageId + 1);
    } else {
      // Wrap around to the first image
      openModal(1);
    }
  }
});