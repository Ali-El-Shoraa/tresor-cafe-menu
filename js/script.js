document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popup-file-img");
  const popupFile = document.getElementById("popup-file");
  const closePopup = document.getElementById("close-popup");
  const popupTitle = document.getElementById("popup-title");
  const loadingSpinner = document.querySelector(".loading-spinner");
  const popupImageContainer = document.getElementById("popup-image-container");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");
  const resetZoomBtn = document.getElementById("reset-zoom");

  let currentScale = 1;
  const SCALE_FACTOR = 0.2;
  const MAX_SCALE = 3;
  const MIN_SCALE = 0.5;

  // Show Popup
  document.querySelectorAll(".btn-popup").forEach((button) => {
    button.addEventListener("click", () => {
      const file = button.getAttribute("data-file");
      const title = button.getAttribute("data-title");
      console.log("file: ", file);
      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
      const isPDF = /\.pdf$/i.test(file);

      // Reset zoom
      resetImageZoom();

      // Set title
      popupTitle.textContent = title;

      // Show loading
      showLoading();

      if (isImage) {
        // Preload image for better UX
        popupFile.classList.add("hidden");
        const img = new Image();
        img.onload = () => {
          popupImage.src = file;
          hideLoading();
          popupImageContainer.classList.remove("hidden");
        };

        img.onerror = () => {
          hideLoading();
          alert("The file could not be downloaded.");
        };
        img.src = file;
      } else if (isPDF) {
        popupImageContainer.classList.add("hidden");
        popupFile.src = file;
        popupFile.onload = () => {
          hideLoading();
          popupFile.classList.remove("hidden");
        };
        popupFile.onerror = () => {
          hideLoading();
          alert("The file could not be downloaded.");
        };
      } else {
        hideLoading();
        alert("File type not supported");
        return;
      }

      popup.classList.add("active");
      popup.classList.remove("hidden");

      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  // Image zoom functionality
  zoomInBtn.addEventListener("click", () => {
    if (currentScale < MAX_SCALE) {
      currentScale += SCALE_FACTOR;
      applyImageZoom();
    }
  });

  zoomOutBtn.addEventListener("click", () => {
    if (currentScale > MIN_SCALE) {
      currentScale -= SCALE_FACTOR;
      applyImageZoom();
    }
  });

  resetZoomBtn.addEventListener("click", resetImageZoom);

  function applyImageZoom() {
    popupImage.style.transform = `scale(${currentScale})`;
  }

  function resetImageZoom() {
    currentScale = 1;
    popupImage.style.transform = "scale(1)";
  }

  // Hide Popup
  function hidePopup() {
    popup.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scrolling

    // Clear content after animation
    setTimeout(() => {
      popupFile.src = ""; // Clear PDF
      popupImage.src = ""; // Clear image
      popupFile.classList.add("hidden");
      popupImageContainer.classList.add("hidden");
    }, 300);
  }

  closePopup.addEventListener("click", hidePopup);

  // Close Popup on clicking outside
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      hidePopup();
    }
  });

  // Close Popup on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("active")) {
      hidePopup();
    }
  });

  // Loading functions
  function showLoading() {
    loadingSpinner.classList.remove("hidden");
  }

  function hideLoading() {
    loadingSpinner.classList.add("hidden");
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   const popup = document.getElementById("popup");
//   const popupImage = document.getElementById("popup-file-img");
//   const popupFile = document.getElementById("popup-file");
//   const closePopup = document.getElementById("close-popup");

//   // Show Popup
//   document.querySelectorAll(".btn-popup").forEach((button) => {
//     button.addEventListener("click", () => {
//       const file = button.getAttribute("data-file");
//       const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
//       const isPDF = /\.pdf$/i.test(file);

//       if (isImage) {
//         popupImage.src = file;
//         popupImage.classList.remove("hidden");
//         popupFile.classList.add("hidden");
//       } else if (isPDF) {
//         popupFile.src = file;
//         popupFile.classList.remove("hidden");
//         popupImage.classList.add("hidden");
//       }

//       popup.classList.remove("hidden");
//     });
//   });

//   // Hide Popup
//   closePopup.addEventListener("click", () => {
//     popup.classList.add("hidden");
//     popupFile.src = ""; // Clear PDF
//     popupImage.src = ""; // Clear image
//   });

//   // Close Popup on clicking outside
//   popup.addEventListener("click", (e) => {
//     if (e.target === popup) {
//       popup.classList.add("hidden");
//       popupFile.src = "";
//       popupImage.src = "";
//     }
//   });
// });
