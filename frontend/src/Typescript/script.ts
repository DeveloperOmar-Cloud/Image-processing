const uploadForm = document.getElementById("uploadForm") as HTMLFormElement | null;
const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
const uploadWidthInput = document.getElementById("uploadWidthInput") as HTMLInputElement | null;
const uploadHeightInput = document.getElementById("uploadHeightInput") as HTMLInputElement | null;
const filenameInput = document.getElementById("filenameInput") as HTMLInputElement | null;
const galleryContainer = document.getElementById("gallery") as HTMLDivElement | null;
const resizeForm = document.getElementById("resizeForm") as HTMLFormElement | null;
const resizeWidthInput = document.getElementById("resizeWidthInput") as HTMLInputElement | null;
const resizeHeightInput = document.getElementById("resizeHeightInput") as HTMLInputElement | null;
const selectedImageNameSpan = document.getElementById("selectedImageName") as HTMLSpanElement | null;
const resizedImageUrlSpan = document.getElementById("resizedImageUrl") as HTMLSpanElement | null;

let selectedImage: string | null = null;

const loadGallery = async () => {
  try {
    const response = await fetch("http://localhost:3000/uploads");
    const files = await response.json();

    if (!galleryContainer) return;
    galleryContainer.innerHTML = "";

    files.forEach((file: string) => {
      const wrapper = document.createElement("div");
      wrapper.className = "thumbnail-wrapper";

      const img = document.createElement("img");
      img.src = `http://localhost:3000/uploads/${file}`;
      img.alt = file;
      img.className = "thumbnail";
      if (selectedImage === file) img.classList.add("selected");

      img.addEventListener("click", () => {
        selectedImage = file;

        document.querySelectorAll(".thumbnail").forEach(el =>
          el.classList.remove("selected")
        );
        img.classList.add("selected");

        if (selectedImageNameSpan) {
          selectedImageNameSpan.textContent = file;
        }
      });

      const caption = document.createElement("div");
      caption.textContent = file;
      caption.style.fontSize = "12px";

      wrapper.appendChild(img);
      wrapper.appendChild(caption);
      galleryContainer.appendChild(wrapper);
    });
  } catch (error) {
    console.error("Error loading gallery:", error);
  }
};

if (uploadForm) {
  uploadForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    if (!fileInput?.files?.length || !uploadWidthInput || !uploadHeightInput || !filenameInput) {
      alert("Please fill out all fields and select a file.");
      return;
    }

    const file = fileInput.files[0];
    const filename = filenameInput.value.trim();
    const width = parseInt(uploadWidthInput.value.trim(), 10);
    const height = parseInt(uploadHeightInput.value.trim(), 10);

    if (!filename || filename.length > 40) {
      alert("Invalid filename. Max 40 characters allowed.");
      return;
    }

    if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
      alert("Width and height must be positive integers.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);
    formData.append("width", width.toString());
    formData.append("height", height.toString());

    try {
      const response = await fetch("http://localhost:3000/multer", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      if (response.ok) {
        alert("✅ " + text);
        loadGallery();
      } else {
        alert("❌ Upload failed: " + text);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error uploading file.");
    }
  });
}

if (resizeForm) {
  resizeForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    if (!selectedImage || !resizeWidthInput || !resizeHeightInput) {
      alert("Please select an image and enter new dimensions.");
      return;
    }

    const width = parseInt(resizeWidthInput.value.trim(), 10);
    const height = parseInt(resizeHeightInput.value.trim(), 10);

    if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
      alert("Width and height must be positive integers.");
      return;
    }

    const url = `http://localhost:3000/api/sharp?filename=${encodeURIComponent(
      selectedImage
    )}&width=${width}&height=${height}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json(); // Expects: { url: "/uploads/filename.jpg" }

      if (resizedImageUrlSpan) {
        const fullUrl = `http://localhost:3000${data.url}`;
        resizedImageUrlSpan.innerHTML = `<a href="${fullUrl}" target="_blank">${fullUrl}</a>`;
      }
    } catch (err) {
      alert("❌ Failed to resize image.");
      console.error("Resize error:", err);
    }
  });
}

loadGallery();
