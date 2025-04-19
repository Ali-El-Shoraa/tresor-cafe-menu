document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popup-file-img");
  const popupFile = document.getElementById("popup-file"); // اضف هذا السطر
  const closePopup = document.getElementById("close-popup");

  // Show Popup
  document.querySelectorAll(".btn-popup").forEach((button) => {
    button.addEventListener("click", () => {
      const file = button.getAttribute("data-file");
      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
      const isPDF = /\.pdf$/i.test(file); // تحقق إذا كان الملف PDF

      if (isImage) {
        popupImage.src = file;
        popupImage.classList.remove("hidden");
        popupFile.classList.add("hidden");
      } else if (isPDF) {
        popupFile.src = file;
        popupFile.classList.remove("hidden");
        popupImage.classList.add("hidden");
      }

      popup.classList.remove("hidden");
    });
  });

  // Hide Popup
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    popupFile.src = ""; // Clear PDF
    popupImage.src = ""; // Clear image
  });

  // Close Popup on clicking outside
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
      popupFile.src = "";
      popupImage.src = "";
    }
  });
});
