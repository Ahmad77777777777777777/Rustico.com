const toast = document.querySelector("#toast");
const galleryImage = document.querySelector("#gallery-image");
const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=65",
    alt: "Freshly prepared Rustico dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=65",
    alt: "A welcoming restaurant dining table",
  },
  {
    src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=65",
    alt: "Fresh pasta with herbs",
  },
];
let currentPhoto = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2500);
}

function showPhoto(offset) {
  currentPhoto = (currentPhoto + offset + galleryPhotos.length) % galleryPhotos.length;
  galleryImage.src = galleryPhotos[currentPhoto].src;
  galleryImage.alt = galleryPhotos[currentPhoto].alt;
}

document.querySelector("#previous").addEventListener("click", () => showPhoto(-1));
document.querySelector("#next").addEventListener("click", () => showPhoto(1));

document.querySelector("#share-button").addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    showToast("Page link copied.");
  } catch (error) {
    if (error.name !== "AbortError") showToast("Couldn't share the page. Please try again.");
  }
});
